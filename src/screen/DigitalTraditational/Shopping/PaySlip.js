import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, TextInput, ScrollView } from "react-native";
import { colors, fonts } from "../../../constant/theme";
import icons from "../../../constant/icons";
import { scaleWidth, scaleHeight } from "../../../utils/responsive";
import { style } from "../../../constant/style";
import HeaderComponent from "./Component/HeaderComponent";

const PaySlip = ({navigation}) => {
    const [phone, setPhone] = useState(false)
    return (
        <View style={{ backgroundColor: colors.lightWhite, flex: 1 }}>

           <HeaderComponent name={"Pay With KBZ Slip"} navigation={navigation}/> 

            <ScrollView style={{ paddingHorizontal: 15 }}>
                <View style={{...style.center}}>
                <Image source={{uri:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeL3m0PraCrLOg7IDvY4WiEJl6WXg8EyE2og&s'}} 
                resizeMode="contain"
                style={{width:200,height:200}}/>

                </View>
                <Text style={{ ...fonts.LT_body3, color: colors.black ,marginTop:5}}>Your KBZ phone number</Text>
                <View style={{ ...style.flexRow, marginTop: 10 }}>
                    <Image source={{ uri: 'https://www.kbzbank.com/wp-content/uploads/2019/08/Image-8_-KBZPay-Logo_Credit-to-KBZ.jpg' }} style={{ width: scaleWidth(45), height: scaleHeight(45), borderRadius: 10 }} />
                    <TextInput
                        placeholder={"+95"}
                        value={phone}
                        style={{ borderWidth: 10, borderWidth: 1, borderColor: colors.gray, width: 200, height: 40, paddingLeft: 20, marginLeft: 10, borderRadius: 5 }}
                    />
                </View>
                <View style={{ marginTop: 25 }}>
                    <Text style={{ ...fonts.LT_body3, color: colors.black }}>Note</Text>
                    <TextInput
                        placeholder="Write your note here"
                        value={phone}
                        multiline
                        style={{ borderWidth: 10, borderWidth: 1, borderColor: colors.gray, height: 150, paddingLeft: 20, borderRadius: 5, marginTop: 10 }}
                    />
                </View>

            </ScrollView>
            <View style={{
                backgroundColor: colors.white, padding: 15, ...style.shadow, position: 'absolute', bottom: 0, left: 0, right: 0,
            }}>
                <View style={{...style.flexRowSpace, }}>
                <Text style={{ ...fonts.LT_body3, color: colors.black }}>Total price</Text>
                <Text style={{ ...fonts.LT_body3, color: colors.black }}>Ks 10000</Text>
                </View>
               
                <TouchableOpacity
                    onPress={() => navigation.navigate('Payment Successful')}
                    style={{
                        ...style.button,
                        marginVertical: 20, backgroundColor: colors.primary,
                    }}
                >

                    <Text style={{ ...fonts.body2, color: colors.lightWhite }}>Pay Now</Text>

                </TouchableOpacity>

            </View>


        </View>
    )
}

export default PaySlip