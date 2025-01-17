import React from "react";
import { View,Text,Image,TouchableOpacity, ScrollView } from "react-native";
import icons from "../../../constant/icons";
import { style } from "../../../constant/style";
import { colors,fonts } from "../../../constant/theme";
import { scaleWidth,scaleHeight } from "../../../utils/responsive";

const AutoPayment = ({navigation}) => {
    return(
        <View style={{backgroundColor:colors.lightWhite,flex:1}}>
             <View style={{
                ...style.flexRowSpace,
                paddingVertical: 20,
            }}>
                <TouchableOpacity onPress={() => navigation.goBack()}
                    style={{
                        width: 40,
                        justifyContent: "center",
                        alignItems: "center",
                        height: 40,
                    }}
                >
                    <Image source={icons.back_arrow} resizeMode="contain" style={{ width: scaleWidth(20), height: scaleHeight(20), tintColor: colors.primary }} />
                </TouchableOpacity>
                <View>
                    <Text style={{ ...fonts.PT_h2, color: colors.primary }}>
                        Auto-Payment
                    </Text>
                </View>


                <TouchableOpacity
                    onPress={() => navigation.navigate("Onboarding", {
                        redirectTo: "Cart",
                    })
                    }
                    style={{
                        width: 45,
                        height: 45,
                        justifyContent: "center",
                        alignItems: "center",
                    }}>
                    <Image source={icons.cart} resizeMode="contain" style={{ width: scaleWidth(20), height: scaleHeight(20), tintColor: colors.primary }} />
                </TouchableOpacity>


            </View>
            <ScrollView
            style={{paddingHorizontal:15}}
            >
                <Text style={{...fonts.LT_body3,color:colors.black,textAlign:'center'}}>123000(Ks)</Text>
                <View style={{height:0.5,backgroundColor:colors.black,marginVertical:20}}/>
                <View style={{...style.flexRowSpace,marginTop:10}}>
                    <Text style={{color:colors.black,...fonts.LT_body3}}>Marchant Name</Text>
                    <Text style={{color:colors.black,...fonts.LT_body3}}>MULA</Text>

                    
                </View>
                <View style={{...style.flexRowSpace,marginTop:10}}>
                    <Text style={{color:colors.black,...fonts.LT_body3}}>Transaction Time</Text>
                    <Text style={{color:colors.black,...fonts.LT_body3}}>20/07/24   16:30:37</Text>

                    
                </View>
                <View style={{...style.flexRowSpace,marginTop:10}}>
                    <Text style={{color:colors.black,...fonts.LT_body3}}>Reference Number</Text>
                    <Text style={{color:colors.black,...fonts.LT_body3}}>485fg94-6223-fg45</Text>

                    
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

            </ScrollView>

        </View>
    )
}
export default AutoPayment