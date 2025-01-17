import React,{useContext} from "react";
import {View,Text,Image,StyleSheet,TouchableOpacity,Platform} from "react-native"
import icons from "../constant/icons";
import { Context } from "./Context";
import { colors, fonts } from "../constant/theme";
import { scaleHeight, scaleWidth } from "../utils/responsive";
import { style } from "../constant/style";

const BackHeaderComponent = ({navigation}) =>{

    const {digital,myanmar} = useContext(Context)

    return(
        <View style={styles.container}>
            <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{...style.flexRow}}
            >
                <Image source={icons.digital_back_arrow}
                resizeMode="contain"
                 style={[styles.icon,{tintColor:digital?
                null: colors.primary}]}/>
            
            </TouchableOpacity>

        </View>
    ) 
}
export default BackHeaderComponent

const styles = StyleSheet.create({
    container:{height:50,flexDirection:'row',alignItems:'center',paddingHorizontal:18},
    icon:{width:scaleWidth(20),height:scaleHeight(20)},
    text:{...fonts.LT_h2,marginLeft:25,lineHeight:Platform.OS === 'ios' ? 0 : 25}
})