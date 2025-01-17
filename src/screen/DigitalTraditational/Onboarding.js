import React,{useContext, useRef} from "react";
import {View,Text,SafeAreaView,StyleSheet,Image,Dimensions,ImageBackground,TouchableOpacity} from "react-native"
import Carousel from "../../component/Carousel";
import { colors, fonts } from "../../constant/theme";
import { style } from "../../constant/style";
import icons from "../../constant/icons";
import { Context } from "../../component/Context";
import images from "../../constant/images";
import { scaleWidth } from "../../utils/responsive";
import LinearGradient from "react-native-linear-gradient";



const Onboarding = ({navigation}) =>{

    const width = Dimensions.get('screen').width

    const scrollRef = useRef()

    const {digital,} = useContext(Context)

    const data = [
        {
            id:1,
            img:images.tradi_onBor1,
            logo:icons.mula_logo_name,

        },
        {
            id:2,
            img:images.tradi_onBor2,
            logo:icons.mula_logo_name,
        },
        {
            id:3,
            img:images.tradi_onBor3,
            logo:icons.mula_logo_name,
        },
    ]

    const data1 = [
        {
            id:1,
            img:images.digital_onBor1,
            logo:icons.mula_logo_name,

        },
        {
            id:2,
            img:images.digital_onBor2,
            logo:icons.mula_logo_name,
        },
        {
            id:3,
            img:images.digital_onBor3,
            logo:icons.mula_logo_name,
        },
    ]


   

    return(
        <View style={styles.container}>

           
            <Carousel
            data={digital ? data1 : data}
            scrollRef={scrollRef}
            renderItem={(item) => 
                    
                    <ImageBackground source={item.img} resizeMode="cover" style={{width,height:'100%',flex:1}}>
                    <SafeAreaView style={styles.content}>
                    <Image source={item.logo} resizeMode="contain" style={{width:150,height:50}}/>
                    {
                        item.id === 1 ?
                        <View style={styles.idContainer1}>
                            <Text style={[styles.idTitle1,{
                                color: digital ?colors.lightWhite : colors.black,fontFamily:'PTSerif-Regular'
                            }]}>Daring to be Different</Text>
                            <Text style={[styles.idBody1,{
                                color:digital ?colors.lightWhite : colors.black,fontFamily:'PTSerif-Regular'
                            }]}>A Modern and Contemporary Art Exhibition</Text>
                        </View>
                        :
                        item.id === 2 ?
                        <View style={styles.idContainer2}>
                            {
                                digital ?
                                <View>
                                    <Text style={styles.idDigBody}>Art doesn’t Have  </Text>
                                    <Text style={styles.idDigBody}>To be pretty</Text>
                                    <Text style={styles.idDigBody}>It has to be meaningful.</Text>
                                    <Text style={styles.idDigBody1}>Duane Hanson</Text>
                                </View>
                                :
                                <>
                                <Image source={icons.ellipse} style={styles.ellipse}/>
                            <Text style={[styles.idTitle2,{marginHorizontal:35}]}>
                            “I dream of painting and then I paint my dream.”
                            </Text>
                            
                            <Text style={[styles.idBody2,{
                            }]}>Vincent van Gogh <Text style={{fontSize:12}}>1853 - 1890</Text> </Text>
                            </>

                            }
                            
                            
                        </View>
                        :
                        <>
                        <View style={styles.idContainer3}>
                            <Text style={[styles.idTitle3,{
                                color:digital ?colors.lightWhite : colors.black,
                            }]}>MULA: The Art Gallery, Timeless art for an ever-changing world.</Text>
                            <Text style={[styles.idBody3,{marginTop:60,
                                color:digital ?colors.lightWhite : colors.black,
                            }]}>- Unearthing the Roots of </Text>
                            <Text style={[styles.idBody3,{marginLeft:140,
                                color:digital ?colors.lightWhite : colors.black,
                            }]}> Creativity</Text>

                           
            
                    
                            
                        </View>
                        {
                digital?
                <TouchableOpacity
                        onPress={() => navigation.navigate('VisitGallary')}
                        >
                <LinearGradient
                colors={colors.linearBtn}
                start={{x:0,y:1}}
                end={{x:1,y:0}}
                style={{width:width-40,height:42,borderRadius:20,...style.center,marginBottom:80}}
                >
                    
                    <Text style={{...fonts.LT_body2,color:colors.lightWhite}}>Get Started</Text>
                   
                </LinearGradient>
                </TouchableOpacity>
 
                :
                <TouchableOpacity
                        onPress={() => navigation.navigate('VisitGallary')}
                        style={[styles.btn,{width:width-50}]}
                        >
                            <Text style={{...fonts.LT_body2,color:colors.lightWhite}}>Get Started</Text>
                </TouchableOpacity>
            }
                        </>
                    }
                    </SafeAreaView>
                    </ImageBackground>
               
            }
            />
           

        </View>
    )
}
export default Onboarding

const styles = StyleSheet.create({

    container:{flex:1,},
    content:{flex:1,alignItems:'center',padding:20},
    title:{...fonts.body1,color:colors.black,marginTop:30},
    idContainer1:{flex:1,marginTop:220},
    idContainer2:{flex:1,...style.center},
    idTitle1:{fontSize:scaleWidth(50),},
    idBody1:{fontSize:15,marginTop:10,paddingLeft:5,},
    ellipse:{width:100,height:100},
    idTitle2:{fontSize:scaleWidth(30),marginVertical:10,fontFamily:'PTSerif-Regular',
    textAlign:'center',color:colors.black,},
    idBody2:{fontSize:20,fontFamily:'PTSerif-Regular',marginVertical:30,color:colors.gray,},
    idContainer3:{...style.center,flex:1},
    idTitle3:{fontFamily:'PTSerif-Regular',fontSize:scaleWidth(30),textAlign:'left',},
    idBody3:{fontSize:20,fontFamily:'PTSerif-Regular',textAlign:'right',marginLeft:20},
    idDigBody:{textAlign:'left',...fonts.PT_h1,fontSize:30,
    color:colors.lightWhite,lineHeight:50},
    idDigBody1:{color:colors.lightWhite,...fonts.PT_h1,textAlign:'right',marginTop:20},
    btn:{height:40,borderRadius:30,...style.center,backgroundColor:colors.primary,marginBottom:80}
    

})