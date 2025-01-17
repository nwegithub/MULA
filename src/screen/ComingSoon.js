import React, { useContext } from "react";
import { Image, SafeAreaView, Text, View } from "react-native";
import { Context } from "../component/Context";
import { style } from "../constant/style";
import { colors, fonts } from "../constant/theme";

const ComingSoon = ({navigation}) => {

  const {digital} = useContext(Context)

  return(
    <SafeAreaView style={{flex:1,...style.center,backgroundColor:digital? colors.darkBlack : colors.white}}>
      <View >
        {
          digital?
          <Image source={require('../assets/images/coming_soon.gif')} style={{width:180,height:180}}/>
          :
          <View style={{width:150,height:40,borderWidth:2,borderColor:colors.primary,...style.center}}>
          <Text style={{...fonts.LT_body1,color:colors.black,}}>Coming Soon</Text>
          </View>

        }
      </View>
      
      
    </SafeAreaView>
  )
}
export default ComingSoon