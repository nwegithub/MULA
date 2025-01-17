import { Text,View } from "react-native"
import { colors } from "../constant/theme"
import { fonts } from "../constant/theme"
import LinearGradient from "react-native-linear-gradient"
import { style } from "../constant/style"
import notifee from '@notifee/react-native';


export async function onMessageReceived(message) {
    try{
        await notifee.displayNotification(JSON.parse(message.data.notifee));
    }
    catch(e){
        
    }
    
}


export const DigitalBotton = ({text}) => {
    return (
        <LinearGradient
            colors={colors.linearBtn}
            start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 0 }}
            style={{ width: '100%', height: 42, borderRadius: 16, ...style.center, marginBottom: 20 }}
        >
            <Text style={{...fonts.LT_body2, color: colors.lightWhite}}>{text}</Text>

        </LinearGradient>
    )
}

export const TradidionalButton = ({text}) => {
    return(
        <View style={{
            ...style.button, marginVertical: 20
        }}>
            <Text style={{color: colors.lightWhite, ...fonts.LT_body2, lineHeight: 25}}>
                {text}
            </Text>

        </View>
    )
}