import React,{useContext} from "react";
import {View,StatusBar} from "react-native"
import { Context } from "./Context";
import { colors } from "../constant/theme";

const StatusBarScreen = () =>{

  const {digital} = useContext(Context)

    return(
        <View>
             <StatusBar
             barStyle={digital?'light-content' : 'dark-content'}
        animated={true}
        backgroundColor= {digital? colors.darkBlack : colors.primary}
        
      />
        </View>
    )
}
export default StatusBarScreen