import React,{useContext} from "react";
import {View,Text,SafeAreaView, StyleSheet,Dimensions,Image,TouchableOpacity,Linking,Platform} from "react-native"
import { Context } from "../../component/Context";
import { colors, fonts } from "../../constant/theme";
import HeaderComponent from "../../component/HeaderComponent";
import { style } from "../../constant/style";
import icons from "../../constant/icons";
import { scaleHeight } from "../../utils/responsive";

const width = Dimensions.get('screen').width

const ContactUS = ({navigation}) => {

    const {digital,language} = useContext(Context)

    return( 
        <SafeAreaView style={[styles.container,{backgroundColor:digital? colors.darkBlack: colors.white}]}>
            <HeaderComponent title="Contact Us" myaTitle="ဆက်သွယ်ရန်" parentScreenName="Drawer" navigation={navigation}/>
            <View style={{width:width,height:scaleHeight(255)}}>
                <Image source={require('../../assets/images/Contact.jpg')} style={{width:'100%',height:'100%'}}/>
            </View>
            <View style={styles.content}>
                <Image source={icons.digital_location} style={[styles.icon,{tintColor:digital? null: colors.primary}]}/>
                <Text style={[styles.location,{color:digital? colors.lightWhite:colors.black,}]}>
                    {
                        language === 'mm'?
                        "E 1-12၊ ဝန်ကြီးများရုံး၊ သိမ်ဖြူလမ်း၊ ဗိုလ်တထောင်မြို့နယ်၊ ရန်ကုန်မြို့၊ မြန်မာနိုင်ငံ။"
                        :
                        "E 1-12, The Secretariat Yangon, Thein Phyu Road, Botahtaung Township, Yangon, Myanmar"
                    }
                
                </Text>
                <TouchableOpacity
                onPress={() => 
                    { Platform.OS === 'ios' ?
                        Linking.openURL('https://maps.apple.com/?address=No.%20300%20Thein%20Phyu%20Road,%20Yangon,%20Myanmar%20(Burma)&auid=6136917244634899114&ll=16.775863,96.165841&lsp=9902&q=The%20Secretariat&t=m')
                        :
                        Linking.openURL('https://www.google.com/maps/place/The+Secretariat+Yangon/@16.7756394,96.1657984,18z/data=!4m14!1m7!3m6!1s0x30c1ec885301a081:0xd45abd0dd139db8b!2sThe+Secretariat+Yangon!8m2!3d16.7753595!4d96.1658145!16s%2Fm%2F0cp00x7!3m5!1s0x30c1ec885301a081:0xd45abd0dd139db8b!8m2!3d16.7753595!4d96.1658145!16s%2Fm%2F0cp00x7?entry=ttu')
                    }
                    }
                >
                <Text style={[styles.location,{color:'#09FBD3',textDecorationLine:'underline'}]}>
                    {
                        language === 'mm'?
                        "မြေပုံကိုကြည့်ရန်"
                        :
                        "view on map"
                    }
                    
                </Text>
                </TouchableOpacity>
                <View style={styles.phoneContainer}>
                    <Image source={icons.digital_phone} style={[styles.icon,{tintColor:digital? null: colors.primary}]}/>
                    <TouchableOpacity
                    onPress={() => Linking.openURL('tel:+959443478857')}
                    >
                    <Text style={[styles.phone,{color:digital? colors.lightWhite:colors.black}]}>+95 9443478857</Text>
                    </TouchableOpacity>
                </View>
                <Image source={icons.language} style={[styles.icon,{tintColor:digital? null: colors.primary}]}/>
                <TouchableOpacity
                onPress={() => Linking.openURL('https://www.mula.com.mm/')}
                >
                <Text  style={[styles.phone,{color:digital? colors.lightWhite:colors.black}]}>
                www.mula.com.mm
                </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default ContactUS

const styles = StyleSheet.create({
    container:{flex:1},
    content:{paddingVertical:20,paddingHorizontal:40,...style.center},
    icon:{width:25,height:25},
    location:{...fonts.LT_h2,textAlign:'center',margin:10,lineHeight:Platform.OS === 'ios'? 0:30},
    phoneContainer:{paddingVertical:25,alignItems:'center'},
    phone:{...fonts.LT_h2,marginTop:10
        ,textDecorationLine:'underline'}

})