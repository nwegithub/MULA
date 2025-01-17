import { StyleSheet, View, ScrollView, Image, Text, useWindowDimensions,TouchableOpacity } from 'react-native';
import React, { useContext, useLayoutEffect, useState, } from 'react';
import Animated, { useAnimatedStyle, useSharedValue, useAnimatedScrollHandler, interpolate, color } from 'react-native-reanimated';
import { colors, fonts } from '../../../../constant/theme';
import { Context } from '../../../../component/Context';
import { style } from '../../../../constant/style';
import { scaleHeight } from '../../../../utils/responsive';
import LinearGradient from 'react-native-linear-gradient';


const SeriesSlider = ({ data,navigation }) => {

  const { digital,langData,language } = useContext(Context)
  


  const [newData] = useState([
    { key: 'spacer-left' },
    ...data,
    { key: 'spacer-right' }])
  const { width } = useWindowDimensions()
  const SIZE = width * 0.7
  const SPACER = (width - SIZE) / 2
  const x = useSharedValue(0)
  const onScroll = useAnimatedScrollHandler({
    onScroll: event => {
      x.value = event.contentOffset.x
    }
  })

  return (
    <Animated.ScrollView
      horizontal
      scrollEventThrottle={16}
      snapToInterval={SIZE}
      decelerationRate="fast"
      onScroll={onScroll}
    >

      {newData.map((item, index) => {

        const style = useAnimatedStyle(() => {
          const scale = interpolate(
            x.value,
            [(index - 2) * SIZE, (index - 1) * SIZE, index * SIZE],
            [0.8, 1, 0.8],
          );
          return {
            transform: [{ scale }],
          };
        });
        if (digital ? !item.art_series_digital_artwork?.artwork_image_url
          : !item.art_series_traditional_art_work?.artwork_image_url) {
          return <View style={{ width: SPACER }} key={index} />;
        }
        return (
          <View style={{ width: SIZE }} key={index}>
            <Animated.View style={[styles.imageContainer, style]}>
              <Image source={{
                uri:
                  digital ? item.art_series_digital_artwork?.artwork_image_url :
                  item.art_series_traditional_art_work?.artwork_image_url
              }} style={styles.image} />
              <View style={styles.detailContainer}>
                 {
                      !digital?
                      <TouchableOpacity
                      onPress={() => navigation.navigate('Home Detail',{ArtworkId:item.art_series_traditional_art_work.id})}
                      style={styles.tradiContent}
                      >
                        <Text>{langData.detail}</Text>
                      </TouchableOpacity>
                      :
                      <LinearGradient
                      colors={colors.linearBorder}
                      start={{ x: 0, y: 1 }}
                      end={{ x: 1, y: 0 }}
                      style={styles.digitalContent}
                      >
                        <TouchableOpacity
                        onPress={() => navigation.navigate('Home Detail',{ArtworkId:item.art_series_digital_artwork.id})}
                        style={styles.digitalContent1}
                        >
                        <Text style={{color:colors.black}}>{langData.detail}</Text>
                        </TouchableOpacity>
                      </LinearGradient>
                    }
                    </View>
            </Animated.View>
            <Text style={[styles.text,{color:digital? colors.lightWhite :colors.primary}]}>
              {
              digital ? (language === 'mm'? item.art_series_digital_artwork?.artwork_name_mm : item.art_series_traditional_art_work?.artwork_name) :
                (language === 'mm'? item.art_series_traditional_art_work?.artwork_name : item.art_series_traditional_art_work?.artwork_name)
            }</Text>
          </View>
        );
      })}

    </Animated.ScrollView>
  );
};

export default SeriesSlider;

const styles = StyleSheet.create({
  imageContainer: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height:scaleHeight(420),
  },
  text: {
    textAlign: 'center', marginTop: 30, ...fonts.PT_h2
  },
  detailContainer:{position:'absolute',left:0,right:0,top:0,bottom:0,...style.center},
  tradiContent:{borderWidth:1,borderColor:colors.lightWhite,borderRadius:15,width:100,height:45,backgroundColor:'rgba(255, 255, 255, 0.50)',...style.center},
  digitalContent:{borderRadius: 16,
    
    width: 100,
    height:45,

    backgroundColor: "transparent",...style.center},
    digitalContent1:{width: '98%', height: '95%',backgroundColor:'white',borderRadius:15,...style.center,opacity:0.7},
});