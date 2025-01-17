import React from "react";
import { View,Text,Image,TouchableOpacity } from "react-native";
import { colors, fonts } from "../../../constant/theme";
import { style } from "../../../constant/style";
import HeaderComponent from "./Component/HeaderComponent";
import icons from "../../../constant/icons";

const PaymentSuccessful = ({navigation}) => {
    return(
        <View style={{flex:1,backgroundColor:colors.lightWhite,}}>
            <HeaderComponent name={""} navigation={navigation}/>
            <View style={{flex:1,...style.center}}>
            <View style={{width:150,height:150,borderRadius:50,borderColor:'rgba(255, 203, 137, 1)'}}>
                <Image source={{uri:'https://atlas-content-cdn.pixelsquid.com/stock-images/cartoon-red-artist-paint-brush-zeXze29-600.jpg'}}
                style={{width:100,height:100,borderRadius:50}}/>
            </View>
            <Text style={{...fonts.PT_h2,color:colors.primary}}>Payment Successful!</Text>
            <Text style={{...fonts.LT_body3,color:colors.black,marginVertical:20}}>Thanks for your order</Text>

            <TouchableOpacity
            onPress={() => navigation.navigate('Order')}
            >
                <Text style={{...fonts.LT_body3,color:colors.primary,textDecorationLine:'underline',textDecorationStyle:'dotted'}}>View my order</Text>
            </TouchableOpacity>

        </View>
        </View>
        
    )
}

export default PaymentSuccessful