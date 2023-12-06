import { Dimensions, StyleSheet, View } from 'react-native';
import React, { useCallback, useImperativeHandle } from 'react';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const MAX_TRANSLATE_Y = -SCREEN_HEIGHT + 400;
const MIN_TRANSLATE_Y = -SCREEN_HEIGHT + 400; // Lower boundary (you can adjust this if needed)

type BottomSheetProps = {
  children?: React.ReactNode;
};

export type BottomSheetRefProps = {
  scrollTo: (destination: number) => void;
  isActive: () => boolean;
};

const Bottomsheet = React.forwardRef<BottomSheetRefProps, BottomSheetProps>(
  ({ children }, ref) => {
    const translateY = useSharedValue(0);
    const active = useSharedValue(false);

    const scrollTo = useCallback((destination: number) => {
      'worklet';
      active.value = destination !== 0;
      translateY.value = withSpring(destination, { damping: 50, stiffness: 100 });
    }, []);

    const isActive = useCallback(() => {
      return active.value;
    }, []);

    useImperativeHandle(ref, () => ({ scrollTo, isActive }), [
      scrollTo,
      isActive,
    ]);

    const context = useSharedValue({ y: 0 });
    const gesture = Gesture.Pan()
      .onStart(() => {
        context.value = { y: translateY.value };
      })
      .onUpdate((event) => {
        let newY = event.translationY + context.value.y;
        
        // If newY is less than MAX_TRANSLATE_Y, apply rubber band effect for upward drag
        if (newY < MAX_TRANSLATE_Y) {
          const rubberBandEffect = (MAX_TRANSLATE_Y - newY) * 0.9;
          translateY.value = newY + rubberBandEffect;
        } 
        // If newY is greater than MIN_TRANSLATE_Y, apply rubber band effect for downward drag
        else if (newY > MIN_TRANSLATE_Y) {
          const rubberBandEffect = (newY - MIN_TRANSLATE_Y) * 0.9;
          translateY.value = newY - rubberBandEffect;
        } 
        // If newY is within the boundaries, no rubber band effect is needed
        else {
          translateY.value = newY;
        }
      })
      .onEnd(() => {
        // If translateY is above the maximum upper limit, snap back to MAX_TRANSLATE_Y
        if (translateY.value < MAX_TRANSLATE_Y) {
          translateY.value = withSpring(MAX_TRANSLATE_Y, { damping: 15, stiffness: 150 });
        } 
        // If translateY is below the lower limit, snap back to MIN_TRANSLATE_Y
        else if (translateY.value > MIN_TRANSLATE_Y) {
          translateY.value = withSpring(MIN_TRANSLATE_Y, { damping: 15, stiffness: 150 });
        }
       
      });

    const rBottomSheetStyle = useAnimatedStyle(() => {
      return {
        transform: [{ translateY: translateY.value }],
      };
    });

    return (
      <GestureDetector gesture={gesture}>
        <Animated.View style={[styles.bottomSheetContainer, rBottomSheetStyle]}>
          <View style={styles.line} />
          {children}
        </Animated.View>
      </GestureDetector>
    );
  }
);

const styles = StyleSheet.create({
  bottomSheetContainer: {
    height: SCREEN_HEIGHT,
    width: '100%',
    backgroundColor: 'white',
    position: 'absolute',
    top: SCREEN_HEIGHT,
    borderRadius: 25,
  },
  line: {
    width: 75,
    height: 4,
    backgroundColor: 'grey',
    alignSelf: 'center',
    marginVertical: 15,
    borderRadius: 2,
  },
});

export default Bottomsheet;
