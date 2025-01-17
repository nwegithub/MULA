import { StyleSheet, View, ScrollView, Image, Text, useWindowDimensions, Platform,
    TouchableOpacity } from 'react-native';
    import React, { useContext, useLayoutEffect, useState, } from 'react';
    import Animated, { useAnimatedStyle, useSharedValue, useAnimatedScrollHandler, interpolate } from 'react-native-reanimated';
    import { colors,fonts } from '../../../../constant/theme';
    import { Context } from '../../../../component/Context';
    import { scaleHeight } from '../../../../utils/responsive';
    import LinearGradient from 'react-native-linear-gradient';
    import { style } from '../../../../constant/style';
    
    
    const CollectionSlider = ({ data,navigation }) => {
    
      const { digital, language } = useContext(Context)
    
    
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
          showsHorizontalScrollIndicator={false}
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
            if (digital ? !item.digital_art_collection_digital_art_work?.artwork_image_url
              : !item.art_collection_traditional_art_work?.artwork_image_url) {
              return <View style={{ width: SPACER }} key={index} />;
            }
            return (
              <View style={{ width: SIZE }} key={index}>
                <Animated.View style={[styles.imageContainer, style]}>
                  <Image source={{
                    uri:
                      digital ? item.digital_art_collection_digital_art_work?.artwork_image_url :
                        item.art_collection_traditional_art_work?.artwork_image_url
                  }} style={styles.image} />
    
                  <View style={styles.detailContainer}>
                    {
                      !digital?
                      <TouchableOpacity
                      onPress={() => navigation.navigate('Home Detail',{ArtworkId:item.art_collection_traditional_art_work.id})}
                      style={styles.tradiContent}
                      >
                        <Text style={[styles.detailTxt,{color:colors.black}]}>{language === 'mm'? "အသေးစိတ်" : "Details"}</Text>
                      </TouchableOpacity>
                      :
                      <LinearGradient
                      colors={colors.linearBorder}
                      start={{ x: 0, y: 1 }}
                      end={{ x: 1, y: 0 }}
                      style={styles.digitalContent}
                      >
                        <TouchableOpacity
                        onPress={() => navigation.navigate('Home Detail',{ArtworkId:item.digital_art_collection_digital_art_work.id})}
                        style={styles.digitalContent1}
                        >
                        <Text style={[styles.detailTxt,{color:colors.black}]}>{language === 'mm'? "အသေးစိတ်" : "Details"}</Text>
                        </TouchableOpacity>
                      </LinearGradient>
                    }
                  </View>
    
                </Animated.View>
                <Text style={[styles.text, {
                  color: digital ? colors.lightWhite : colors.primary,
                  lineHeight: Platform.OS == 'ios' ? 0 : 30
                }]}>{
                    digital ? (language === 'mm' ? item.digital_art_collection_digital_art_work?.artwork_name_mm : item.digital_art_collection_digital_art_work?.artwork_name) :
                      (language === 'mm' ? item.art_collection_traditional_art_work?.artwork_name_mm : item.art_collection_traditional_art_work?.artwork_name)
                  }</Text>
              </View>
            );
          })}
    
        </Animated.ScrollView>
      );
    };
    
    export default CollectionSlider;
    
    const styles = StyleSheet.create({
      imageContainer: {
        borderRadius: 20,
        overflow: 'hidden',
      },
      image: {
        width: '100%',
        height: scaleHeight(420),
      },
      text: {
        textAlign: 'center', marginTop: 30, color: colors.primary, ...fonts.PT_h2
      },
      detailContainer:{position:'absolute',left:0,right:0,top:0,bottom:0,...style.center},
      tradiContent:{borderWidth:1,borderColor:colors.lightWhite,borderRadius:15,width:100,height:45,backgroundColor:'rgba(255, 255, 255, 0.50)',...style.center},
      digitalContent:{borderRadius: 16,
        
        width: 100,
        height:45,

        backgroundColor: "transparent",...style.center},
        digitalContent1:{width: '98%', height: '95%',backgroundColor:'white',borderRadius:15,...style.center,opacity:0.7},
        detailTxt:{...fonts.LT_body4,}
    });