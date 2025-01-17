import React, { useContext } from "react";
import {View,Text,SafeAreaView,StyleSheet,ImageBackground,Image, TouchableOpacity,Dimensions} from "react-native"
import { Context } from "../../component/Context";
import icons from "../../constant/icons";
import { colors, fonts } from "../../constant/theme";
import { style } from "../../constant/style";
import images from "../../constant/images";
import appStorage from "../../utils/appStorage";
import {scaleHeight} from "../../utils/responsive";


const width = Dimensions.get('screen').width
const height = Dimensions.get('screen').height


const VisitGallary = ({navigation}) => {

    const {digital,setFirstTime} = useContext(Context)

    const handleNavigation = async () => {
       
            await appStorage.saveItem("firstTime","false")
            setFirstTime(false)
            navigation.navigate('Start Up')
       
    }

    return(
        
            <ImageBackground source={digital? images.digital_bg :images.mula_bg
            } style={styles.bgImg}>
                <SafeAreaView style={styles.container}>
                <View style={styles.content}>
                
                    <View style={{height:scaleHeight(100),marginTop:20}}>
                    {
                    !digital &&
                        <Image source={icons.logo} style={{width:150,height:'100%'}}/>
                    }
                    </View>
                
                <View  style={{height:height/2-60,width:width/2-10}}>
                    {
                        digital ?
                        <Image source={{uri:'https://axra.sgp1.digitaloceanspaces.com/Mula/artwork.jpg'}} style={styles.digImg} />
                        :
                        <Image source={{uri:'https://axra.sgp1.digitaloceanspaces.com/Mula/artwork.jpg'}} style={styles.traImg}/>
                    }
                </View>
                <View style={{paddingHorizontal:20}}>
                    <Text style={[styles.title,{color:digital? colors.lightWhite : colors.primary,fontFamily:'PTSerif-Regular'}]}>MULA </Text>
                    <Text style={{color:digital? colors.lightWhite : colors.primary,fontSize:20,textAlign:'center',fontFamily:'PTSerif-Regular'}}>The Art Gallery, Timeless Art For An Ever-Changing World.</Text>
                </View>

                {
                    digital ?

                    <TouchableOpacity
                    onPress={handleNavigation}
                    >
                        <Image source={icons.visitGallary} style={{width:160,height:160}}/>
                    </TouchableOpacity>
                    :

                    <TouchableOpacity 
                    onPress={handleNavigation}
                    style={styles.btn}>
                    <Text style={styles.btnText}>VISIT GALLERY</Text>
                </TouchableOpacity>

                }
                
                </View>

            

        </SafeAreaView>
        </ImageBackground>
    )
}
export default VisitGallary

const styles = StyleSheet.create({
    container:{flex:1},
    bgImg:{height:'100%',flex:1},
    content:{alignItems:'center'},
    title:{fontSize:48,textAlign:'center',marginTop:10},
    body:{...fonts.h2,textAlign:'center',marginTop:10},
    digImg:{width:'100%',height:'100%',borderRadius:100},
    traImg:{borderRadius:100,width:'100%',height:'100%',},
    btn:{borderRadius:20,backgroundColor:colors.primary,marginTop:30,...style.center,width:180,height:40},
    btnText:{color:colors.lightWhite,...fonts.LT_body3},
    digBtn:{ flex: 1.0,
        alignSelf: 'center',
        justifyContent: 'center',
        //backgroundColor: 'white',
        width: 175,
        margin: 2,borderRadius:20},
    digLinBtn:{justifyContent:'center',alignSelf:'center',width:180,height:40,borderRadius:20,marginTop:50},
    digBtnTxt:{textAlign:'center',...fonts.body2}
})