import React, { useContext } from "react";
import { View, Text, SafeAreaView, ImageBackground, StyleSheet, ScrollView, Platform } from "react-native";
import { Context } from "../../component/Context";
import HeaderComponent from "../../component/HeaderComponent";
import { colors, fonts } from "../../constant/theme";
import images from "../../constant/images";

const AboutUs = ({navigation}) => {

    const {digital,language} = useContext(Context)

    return(
        <ImageBackground 
            source={ digital? images.digital_bg : images.about
          }
            style={styles.bgImg}
            >
                <SafeAreaView style={{flex:1,}}>
                <ScrollView
                showsVerticalScrollIndicator={false}
                >
               <HeaderComponent title="About Us" myaTitle="ကျွန်ုပ်တို့အကြောင်း" parentScreenName="Drawer" navigation={navigation}/>
                    <View style={{padding:20,margin:5}}>
                        <Text style={{fontSize:language === 'mm'? 24: 26,fontFamily:'PTSerif-Bold',color:digital? colors.lightWhite:colors.black,lineHeight:Platform.OS == 'ios'? 0: 35}}>
                        {
                           language === 'mm'? 
                           "MULA- အနုပညာပန်းချီပြခန်း-အစဉ်မပြတ်ပြောင်းလဲနေသောကမ္ဘာကြီးအတွက် အချိန်အကန့်အသတ် မရှိမကုန်ဆုံးနိုင်သော အနုပညာတစ်ရပ်။"
                           :
                           "MULA: The Art Gallery, Timeless art for an ever-changing world."
                        }
                        
                        </Text>
                        <View style={{alignItems:'flex-end',margin:20}}>
                            {
                                language === 'mm'?
                                <Text style={{...fonts.LT_h1,color:digital? colors.lightWhite:colors.black,lineHeight: Platform.OS === 'ios'? 0: 30}}>တီထွင်ဖန်တီးမှု၏ အရင်းအမြစ်များကို ထုတ်ဖော်ခြင်း</Text>
                                :
                                <>
                                 <Text style={{...fonts.LT_h1,color:digital? colors.lightWhite:colors.black}}>
                            - Unearthing the Roots of 
                            </Text>
                            <Text style={{...fonts.LT_h1,color:digital? colors.lightWhite:colors.black}}>
                            Creativity
                            </Text>
                                </>
                            }
                           
                        </View>
                        <View style={{marginTop:20}}>
                            <Text style={{...fonts.LT_body5,color: digital? colors.lightWhite : colors.black,lineHeight:Platform.OS == 'ios'? 0:25}}>
                            {
                                language === 'mm'?
                                <>
                                "MULA သည် ရန်ကုန်မြို့တွင်တည်ရှိသော ခေတ်မှီအနုပညာပန်းချီပြခန်းတစ်ခုဖြစ်သည်။ ကျွန်ုပ်တို့၏ ရည်ရွယ်ချက်မှာ တက်သစ်စ ပန်းချီအနုပညာရှင်များ၏ လက်ရာအနုပညာများကို ပြသရန်နှင့် အနုပညာလောကတွင် ခြေကုပ်နေရာတစ်ခု ထူထောင်နိုင်ရန် ပလက်ဖောင်းတစ်ခုကို ဖန်တီးပံ့ပိုးပေးရန်ဖြစ်ပါသည်။"
                                </>
                                
                                :
                                <>
                                "MULA is a contemporary art gallery located in Yangon City. 
                                Our mission is to provide a platform for emerging artists 
                                to showcase their work and establish a foothold in the art world."
                                </>
                            }
                            
                            </Text>
                        </View>
                        <View style={{marginTop:20}}>
                            <Text style={{...fonts.LT_body5,color: digital? colors.lightWhite : colors.black,lineHeight: Platform.OS == 'ios'? 0:25}}>
                                {
                                    language === 'mm'?
                                    <>
                                    ကျွနု်ပ်တို့၏ ပြခန်းတွင် အမျိုးမျိုးသော ပန်းချီကားများအပါအဝင် ပန်းပုများနှင့် ခေတ်မှီလက်ရာများကို ပြသထားပါသည်။ မူလတွင် ပြပွဲများနှင့် ပွဲလမ်းသဘင်များအပြင် တိုက်ရိုက်သင်ကြားပေးသော ပန်းချီသင်တန်းများကိုလဲ ပုံမှန်ကျင်းပပြုလုပ်လျက်ရှိပါသည်။
                                    </>
                                    :
                                <>
                                "  Our gallery features a diverse range of art, including paintings,
                                sculptures, and mixed media works. We also host regular 
                                exhibitions and events that are open to the public, 
                                as well as offer art live classes and workshops for 
                                the community. We strive to create a welcoming and 
                                inclusive environment where people can come together 
                                to appreciate and discuss art."
                                </>
                                }
                          
                            </Text>
                        </View>

                        <View style={{alignItems:'flex-end',marginTop:40}}>
                            <Text style={{...fonts.LT_body6,color: digital? colors.lightWhite : colors.black,lineHeight: Platform.OS == 'ios'? 0:25}}>{language === 'mm'? "ဝန်ကြီးများရုံးရန်ကုန်" : "The Secretariat Yangon"}</Text>
                            <Text style={{...fonts.LT_body6,color: digital? colors.lightWhite : colors.black}}>959 962277099</Text>
                        </View>

                    </View>
                    </ScrollView>
                </SafeAreaView>

        </ImageBackground>
    )
}
export default AboutUs

const styles = StyleSheet.create({
    bgImg:{flex:1,height:'100%'}
})