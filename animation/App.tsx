import React, { useCallback, useRef } from 'react';
import { StyleSheet, TouchableOpacity, View,Text } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet, { BottomSheetRefProps } from './components/Bottomsheet';
import LinearGradient from 'react-native-linear-gradient';


export default function App() {
  const ref = useRef<BottomSheetRefProps>(null);

  const onPress = useCallback(() => {
    const isActive = ref?.current?.isActive();
    if (isActive) {
      ref?.current?.scrollTo(0);
    } else {
      ref?.current?.scrollTo(-250);
    }
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        
          <TouchableOpacity style={styles.button} onPress={onPress}>
    <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} 
            colors={['rgb(102, 20, 30)', 'rgb(255, 165, 0)']}
            style={styles.gradient}
          >
          <Text style={styles.buttonText}>Show Sheet</Text>
          </LinearGradient>
        </TouchableOpacity>
        <BottomSheet ref={ref}>
          <View style={{ flex: 1, backgroundColor: 'white' }} />

        </BottomSheet>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'grey',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 50,  
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
  },
  gradient: {
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 50, 
    // Other styles as needed
  },
});
