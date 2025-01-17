import React, { useContext, useEffect } from "react";
import {View,Text,TouchableOpacity,SafeAreaView,StyleSheet,Image} from 'react-native'
import { style } from "../constant/style";
import { colors, fonts } from "../constant/theme";
import { Context } from "../component/Context";
import icons from "../constant/icons";
import Video from "react-native-video"

const StartUp = ({navigation}) =>{

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setTimeout(() => {
                navigation.navigate('Drawer')
            }, 4000)
        });

        return unsubscribe;
    }, [navigation])


    return(
        <View style={{flex:1,}}>
            <View style={{ height:'100%',backgroundColor:colors.lightWhite,...style.center}}>
                <Video
                source={require('../assets/images/mula.mp4')}
                resizeMode='cover'
                repeat={true}
                style={{width:'100%',height:'100%'}}
                />
            </View>
            
                

        </View>
    )
}
export default StartUp

const styles = StyleSheet.create({
    signIn:{...style.button,marginTop:40},
    siginUp:{height: 42,
        width: '100%',
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#945708',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.5,
        shadowRadius: 2,marginTop:20,
        elevation: 3,borderWidth:1,borderColor:'#945708',
        backgroundColor:colors.lightWhite},

    btnText:{color:colors.lightWhite,...fonts.LT_body1},
    siginUpText:{color:'#945708',...fonts.LT_body1}
})