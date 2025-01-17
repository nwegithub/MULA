import React, { useState, useRef, useContext, } from 'react';
import { View, Animated, PanResponder, StyleSheet, Image, Text, Dimensions,Platform,SafeAreaView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { colors, fonts } from '../constant/theme';
import { Context } from '../component/Context';
import { style } from '../constant/style';
import appStorage from '../utils/appStorage';
import { scaleWidth, scaleHeight } from '../utils/responsive';

const width = Dimensions.get('screen').width

const Switch = ({ navigation }) => {


  const { digital, setDigital } = useContext(Context)
  const pan = useRef(new Animated.ValueXY()).current;



  const [panResponder] = useState(

    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, { dy: pan.y }], { useNativeDriver: false }),
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy > 50) {
          // Swipe down action
          Animated.timing(pan, {
            toValue: { x: 0, y: 1000 },
            duration: 300,
            useNativeDriver: false,
          }).start(() => {
            saveArtworkType("false")
            setDigital(false)
          });
    
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
      onPanResponderMove: Animated.event([null, { dy: pan.y }], { useNativeDriver: false }),
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy < 50) {
          // Swipe up action
          Animated.timing(pan, {
            toValue: { x: 0, y: -1000 },
            duration: 300,
            useNativeDriver: false,
          }).start(() => {
            saveArtworkType("false")
            setDigital(true)
          });
    
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
    



  const saveArtworkType = async (artworkType) => {



    await appStorage.saveItem("ArtworkType", artworkType)
    navigation.navigate('Onboarding')

  }



  const animatedStyle = {
    transform: pan.getTranslateTransform(),
  };

  return (
    <SafeAreaView style={[styles.container, {}]}>
      <Animated.View {...panResponder.panHandlers} style={[styles.box1, animatedStyle, { backgroundColor: colors.lightWhite }]}>

        <View style={{ alignItems: 'center',}}>
          <Text style={[styles.text, { color: colors.primary, }]}>Swipe Down</Text>
          <Image source={require('../assets/images/switch.gif')} style={styles.gif} />
        </View>

        <Image source={require('../assets/images/Traditional.png')} style={styles.img} />
      </Animated.View>

      <Animated.View {...panRespondergg.panHandlers} style={[styles.box, animatedStyle]}>
        <LinearGradient
          colors={colors.linearBorder}
          start={{ x: 1, y: 0 }}
          end={{ x: 0, y: 0.4, }}
          locations={[0, 0.9]}
          style={{ flex: 1, width: '100%', height: '100%', alignItems: 'center' }}
        >

          <Image source={require('../assets/images/Digital.png')}  resizeMode="contain" style={[styles.img,{alignSelf:"flex-end"}]} />
          <View style={{ alignItems: 'center' }}>
            <Image source={require('../assets/images/switchUp.gif')} style={styles.gif} />
            <Text style={[styles.text, { color: colors.lightWhite }]}>Swipe Up</Text>
          </View>
        </LinearGradient>
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    width: width,
    height: 2000,
    justifyContent: 'center',
    alignItems:'flex-end'
  },
  box1: {
    width: width,
    height: 2000,
    justifyContent: 'flex-end',


  },
  img: {
    width: scaleWidth(300), height: scaleHeight(300)
  },
  gif: {
    width: scaleWidth(20), height: scaleHeight(50),
  },
  text: { ...fonts.LT_h1, },
  digitalSwipeContainer: { position: 'absolute', left: 0, right: 0, top: 150, alignItems: 'center' },
  tradiSwipeContainer: { position: 'absolute', left: 0, right: 0, bottom: 30, alignItems: "center" }
});

export default Switch;
