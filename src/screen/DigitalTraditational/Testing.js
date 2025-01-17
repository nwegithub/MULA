import React, { useState, useRef } from 'react';
import { View, Animated, PanResponder, StyleSheet,Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { colors } from '../../constant/theme';

const Testing = ({ navigation }) => {
  const [color, setColor] = useState('white')
  const pan = useRef(new Animated.ValueXY()).current;
  const [panResponder] = useState(

    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, { dy: pan.y }]),
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy > 50) {
          // Swipe down action
          Animated.timing(pan, {
            toValue: { x: 0, y: 1000 },
            duration: 300,
            useNativeDriver: false,
          }).start();

        } else {

          Animated.spring(pan, {
            toValue: { x: 0, y: 0 },
            friction: 5,
            useNativeDriver: false,
          }).start();
        }
      },
    })
  );


  const [panRespondergg] = useState(

    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, { dy: pan.y }]),
      onPanResponderRelease: (_, gestureState) => {

        if (gestureState.dy < 50) {
          // Swipe down action
          Animated.timing(pan, {
            toValue: { x: 0, y: -1000 },
            duration: 300,
            useNativeDriver: false,
          }).start();
            navigation.navigate('Home')
        } else {

          Animated.spring(pan, {
            toValue: { x: 0, y: 0 },
            friction: 5,
            useNativeDriver: false,
          }).start();
        }
      },
    })
  );



  const animatedStyle = {
    transform: pan.getTranslateTransform(),
  };

  return (
    <View style={[styles.container, {}]}>
      <Animated.View {...panResponder.panHandlers} style={[styles.box, animatedStyle, { backgroundColor: colors.primary }]}>
        {/* Your content goes here */}
      </Animated.View>
      <Animated.View {...panRespondergg.panHandlers} style={[styles.box, animatedStyle, { marginVertical: 5 }]}>
        <LinearGradient
          colors={['red', 'yellow',]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5, }}
          locations={[0, 0.9]}
          style={{ flex: 1, width: '100%', height: '100%' }}
        >

          <Image source={{uri:'https://img.freepik.com/premium-photo/image-cyborg-girl-pop-art-style_763713-376.jpg?w=2000'}}
          style={{width:'100%',height:'50%'}}/>

        </LinearGradient>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    width: 500,
    height: 2000,
    //backgroundColor: '',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Testing;
