import React,{useContext} from "react";
import { View,Text,Image,SafeAreaView,StyleSheet,ImageBackground ,TouchableOpacity,FlatList,Platform} from "react-native";
import { Context } from "../../../../component/Context";
import { style } from "../../../../constant/style";
import { colors, fonts } from "../../../../constant/theme";
import icons from "../../../../constant/icons"


const MyCollection = ({navigation}) =>{

    const {digital,language,langData,theme} = useContext(Context)

    const data = [
        {
            id:1,
            img:'https://axra.sgp1.digitaloceanspaces.com/Mula/mula1.jpg',
            text:"Upload"
        },
        {
            id:2,
            img:'https://axra.sgp1.digitaloceanspaces.com/Mula/mula2.jpg',
        },
        {
            id:3,
            img:'https://axra.sgp1.digitaloceanspaces.com/Mula/mula3.jpg',
        },{
            id:4,
            img:'https://axra.sgp1.digitaloceanspaces.com/Mula/mula4.jpg',
        },{
            id:5,
            img:'https://axra.sgp1.digitaloceanspaces.com/Mula/mula5.jpg',
        },
    ]

    return(
        
             <ImageBackground source={{uri:digital? 
             'https://axra.sgp1.digitaloceanspaces.com/Mula/bg1.png'
             :
             'https://axra.sgp1.digitaloceanspaces.com/Mula/bg9.png'
            }} style={{height:'100%',flex:1}}>
                <SafeAreaView style={styles.container}>
                {/* <FlatList
                showsVerticalScrollIndicator={false}
                numColumns={2}
                row={2}
                data={data}
                renderItem={({item,index}) =>{
                    return(
                        <>
                      
                        <View
                style={styles.imgView}
                >
                    <Image source={{uri:item.img}} resizeMode="cover" style={styles.img}/>

                </View>
                </>
                    )
                }}
                contentContainerStyle={{paddingBottom:60}}
                /> */}
                    <View style={{padding:20,...style.center,flex:1,}}>
                        <Image source={icons.no_purchase}
                        resizeMode="contain"
                         style={{width:100,height:100,}}/>
                        <Text style={{lineHeight:Platform.OS === 'ios' ? 0:25,...fonts.LT_body2,color:theme.secColor,marginBottom:60,paddingTop:10,
                    textAlign:'center'}}>
                            {
                              language === 'mm'?
                              "ဝယ်ယူထားသောပန်းချီကားများကို ဤနေရာတွင်တွေ့မြင်နိုင်ပါလိမ့်မယ်"
                              :
                              "Your purchase item will appear here."
                            }
                            
                        </Text>
                    </View>
                </SafeAreaView>
             </ImageBackground>
        
    )
}
export default MyCollection

const styles = StyleSheet.create({
    container:{flex:1,},
    imgView:{width:'46%',height:200,borderRadius:17,...style.shadow,backgroundColor:colors.lightWhite,margin:8,},
    img:{width:'100%',height:'100%',borderRadius:17}
})