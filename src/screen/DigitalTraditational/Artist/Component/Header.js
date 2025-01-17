import React,{useContext} from "react";
import {View,Text,StyleSheet,Image,TouchableOpacity} from "react-native"
import icons from "../../../../constant/icons"
import { style } from "../../../../constant/style";
import { colors, fonts } from "../../../../constant/theme";
import { Context } from "../../../../component/Context";

const Header = ({navigation}) =>{
    const {digital,setDigital} = useContext(Context)
    return(
        <View style={styles.container}>
            
                
            <Text style={{...fonts.body1,color:digital? colors.lightWhite : colors.primary,marginLeft:20,fontWeight:'bold'}}>Artist</Text>
           
            <View style={styles.header}>
                <Image source={icons.search} style={[styles.icon,{marginRight:20,tintColor: digital ? null: colors.primary}]}/>
                <TouchableOpacity 
                onPress={() => navigation.navigate('MyCart1')}
                >
                <Image source={icons.cart} style={[styles.icon,{tintColor: digital ? null: colors.primary}]}/>
                </TouchableOpacity>
            </View>
            
        </View>
    )
}
export default Header

const styles = StyleSheet.create({
    container:{...style.flexRowSpace,marginBottom:10,flex:1},
    icon:{width:20,height:20},
    header:{...style.flexRowSpace,}
    
})