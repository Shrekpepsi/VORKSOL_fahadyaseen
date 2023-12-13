import React, { useCallback, useRef } from 'react';
import { StyleSheet, TouchableOpacity, View, Text, Dimensions } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet, { BottomSheetRefProps } from './components/Bottomsheet';
import LinearGradient from 'react-native-linear-gradient';
import Carousel from 'react-native-reanimated-carousel';

export default function App() {
  const ref = useRef<BottomSheetRefProps>(null);
  const windowWidth = Dimensions.get('window').width;

  const onPress = useCallback(() => {
    const isActive = ref?.current?.isActive();
    if (isActive) {
      ref?.current?.scrollTo(0);
    } else {
      ref?.current?.scrollTo(-250);
    }
  }, []);

  interface CarouselItem {
    backgroundColor: string;
    text:string;
  }
  
  // Data for the carousel
 const data: CarouselItem[] = [
    { backgroundColor: 'white' , text: 'First Slide' },
    { backgroundColor: 'white' , text: 'Second Slide'},
  
  ];

  // Render Item function for Carousel with type definition
  const renderItem = ({ item }: { item: CarouselItem }) => (
    <View style={{ width: windowWidth, height: 400, backgroundColor: item.backgroundColor }}>
      {/* Customize each carousel item here */}
      <Text style={{ color: 'black', fontSize: 24 }}>{item.text}</Text>
    </View>
  );

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
          <Carousel
            loop={false}
            data={data}
            renderItem={renderItem}
            width={windowWidth}
            height={400}
            
          />
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
