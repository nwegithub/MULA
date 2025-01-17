import React, { useState, useRef, createRef, useEffect, useContext } from 'react';
import {View, Text, Image, Animated, Dimensions, TouchableOpacity, SafeAreaView, Platform,BackHandler} from 'react-native';
import {colors, fonts} from '../../../constant/theme';
import icons from '../../../constant/icons';
import { scaleWidth, scaleHeight } from '../../../utils/responsive';
import Orientation from 'react-native-orientation-locker';
import { style } from '../../../constant/style';
import { Context } from '../../../component/Context';
import ImageZoom from 'react-native-image-pan-zoom';

const width1 = Dimensions.get('window').width
const height1 = Dimensions.get('window').height



const FullImg = ({ route, navigation }) => {

  const [panEnabled, setPanEnabled] = useState(false);
  const [rotate, setRotate] = useState(false)
  const { digital, language, langData } = useContext(Context)
  const { ArtworkImg } = route.params

  const imgUrl = ArtworkImg


  const [width, setWidth] = useState(Dimensions.get('window').width);
  const [height, setHeight] = useState(Dimensions.get('window').height);

  useEffect(() => {
    const updateDimensions = ({ window: { width, height } }) => {
      setWidth(width);
      setHeight(height);
    };

    if (rotate) {
      Orientation.lockToLandscape();
    } else {
      Orientation.lockToPortrait();
    }

    Dimensions.addEventListener('change', updateDimensions);

    
  }, [rotate]);
  useEffect(() => {
    const onBackPress = () => {
      Orientation.lockToPortrait();
      navigation.goBack(); // Go back to the previous screen
      return false; // Let the default back button behavior happen
    };
  
    BackHandler.addEventListener('hardwareBackPress', onBackPress);
  
    return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
  }, []);
const handleGoBack = () => {
  Orientation.lockToPortrait();
  navigation.goBack();
}

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: digital ? colors.darkBlack : colors.white }}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center',}}>
        <ImageZoom cropWidth={Dimensions.get('window').width}
                       cropHeight={Dimensions.get('window').height}
                       imageWidth={width}
                       imageHeight={height}>
                        
                        {/* <View style={{
        padding: 10, // Adjust the padding to make the frame thicker or thinner
        backgroundColor: colors.primary,
      }}> */}
        <Image 
          style={{ width: width, height: height,}} 
          resizeMode="contain"
          source={{ uri: ArtworkImg }}
        />
      {/* </View> */}
            </ImageZoom>
            <TouchableOpacity
                  onPress={() => setRotate(!rotate)}
                  style={{ position: 'absolute', bottom: digital? 0 : 5, right: 0, width: 100, height: 30, backgroundColor: 'rgba(255, 255, 255, 0.5)', ...style.flexRow ,
                  justifyContent:'center'}}
                >

                  <Image source={rotate ? icons.minimize : icons.full_view}
                    style={{ width: 20, height: 20, tintColor: colors.black, }} />
                  <Text style={{ marginLeft: 10,lineHeight:Platform.OS ===  'ios'? 0 :25,...fonts.LT_body4 }}>{langData.rotate}</Text>
                </TouchableOpacity>
       
          <TouchableOpacity
          onPress={handleGoBack}
          style={{ position: 'absolute', top: 15, left: 10 }}
        >
          <Image source={icons.digital_back_arrow} style={{
            width: 25, height: 25, tintColor:
              digital ? null : colors.primary
          }} resizeMode="contain" />
        </TouchableOpacity>
       
      </View>
    </SafeAreaView>
  );
};



export default FullImg;




