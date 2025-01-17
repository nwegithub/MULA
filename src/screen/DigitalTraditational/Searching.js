import React,{useContext,useState,useRef} from "react";
import {View,TouchableOpacity,StyleSheet,Image,FlatList,SafeAreaView,TextInput,Text, Modal} from "react-native"
import icons from "../../constant/icons";
import { style } from "../../constant/style";
import { colors, fonts } from "../../constant/theme";
import { Context } from "../../component/Context";
import LinearGradient from "react-native-linear-gradient";
import { GET_ARTWORK_BY_ARTWORK_NAME } from "../../graphql/queries";
import { useQuery } from "@apollo/client";
import Loading from "../../component/Loading";
import { scaleHeight, scaleWidth } from "../../utils/responsive";
import AnimatedImage from "../../component/AnimatedImage";


const Searching = ({navigation}) =>{

    const {digital,langData,language,theme} = useContext(Context)
    const [artworkName,setArtworkName] = useState(null)
    const [searchText,setSearchText] = useState('')
    const [txt,setTxt] = useState('')

    const searchRef = useRef(null)

    const {data, loading} = useQuery(GET_ARTWORK_BY_ARTWORK_NAME, {variables:{
       SearchValue:`%${searchText}%`
    },fetchPolicy: 'network-only'});

    const {data:ArtworkData} = useQuery(GET_ARTWORK_BY_ARTWORK_NAME, {variables:{
        SearchValue:`%${artworkName}%`
     },fetchPolicy: 'network-only'});
 
    const handleSearch = () => {
        setArtworkName(null)
        setSearchText('')
        
    }

    
   
    return(

        <SafeAreaView style={[styles.container,{backgroundColor:digital?colors.darkBlack:colors.white}]}>
       
        <View style={{padding:20,}}>
        
        <View style={{flexDirection:'row'}}>
        <TouchableOpacity
                    onPress={()=> navigation.goBack()}
            style={{width:'15%',marginTop:5}}
            >

                <Image source={icons.digital_back_arrow} style={{width:25,height:25,tintColor:
                digital? null:colors.primary}} resizeMode="contain"/>
        </TouchableOpacity>
        <View style={{width:'85%'}}>
        
        <TextInput
        ref={searchRef}
        placeholder='Search'
        value={searchText}
        onChangeText= {(text) =>{setTxt(text),setSearchText(text)}}
        placeholderTextColor={digital? colors.lightWhite: colors.black}
        style={[styles.textInput,{backgroundColor:digital? colors.gray:colors.lightWhite,
            color:digital? colors.lightWhite : colors.black}]}
        />
        <Image source={icons.search} style={[styles.icon,{tintColor:digital? null: colors.primary}]}/>
        <TouchableOpacity 
        onPress={() => handleSearch()}
        style={{position:'absolute',right:20,top:10,}}>
        <Image source={icons.digital_remove} style={[{tintColor:digital? null: colors.primary,width:20,height:20,}]}/>
        </TouchableOpacity>
        </View>
        </View>


        { txt !== '' && 
           
           <FlatList
          data={digital? data?.digital_art_work :data?.traditional_art_work}
          contentContainerStyle={{paddingTop:20,paddingBottom:30}}
          
          showsVerticalScrollIndicator={false}
          renderItem={({item,index}) => {
              return(
                  <>
                  <TouchableOpacity 
                  onPress={() => {setArtworkName(item.artwork_name),setTxt('')}}
                  key={index}
                  style={{...style.flexRowSpace} }>
                      <Text style={[styles.text,{color:digital? colors.lightWhite:colors.black}]}>
                          {language === 'mm' ?item.artwork_name_mm : item.artwork_name}
                      </Text>
                      <Image source={icons.digital_upArrow} style={{width:scaleWidth(23),height:scaleHeight(23),
                    tintColor:digital? null : colors.primary}}/>
                  </TouchableOpacity>
                  <View style={{height:1,backgroundColor:'#d9d9d9',width:'100%',marginVertical:9}}/>
                  </>
              )
          }}
          ListEmptyComponent={
           
            <View style={{...style.center,marginTop:200}}>
                <Image source={icons.search} 
                resizeMode="contain" style={[styles.icon2,{tintColor:digital? '#09FBD3' :colors.primary}]}/>
                <Text style={{color:theme.mainColor,marginTop:20,}}>No Result Found!</Text>
            </View>
        
          }
          
          />
      }
        
        {
            txt === '' &&

            <FlatList
            row={2}
            numColumns={2}
            data={digital? ArtworkData?.digital_art_work :ArtworkData?.traditional_art_work}
            showsVerticalScrollIndicator={false}
            
            renderItem={({item,index}) =>{
                return(
                    <>
                    {
                        !digital ?
                        <TouchableOpacity 
                        onPress={() => navigation.navigate('Home Detail',{
                            ArtworkId:item.id,
                            
                        })}
                    style={styles.imgContainer}
                    key={item.id}>
                        <AnimatedImage uri={item.artwork_image_url}
                        resizeMode="cover"
                        style={{width:'100%',height:'100%',borderRadius:digital? 30: 100}}/>
                        
                    </TouchableOpacity>
                    :

                   
                    <LinearGradient
                   colors={colors.linearBorder}
                   start={{x:0,y:1}}
                   end={{x:1,y:0}}
                   style={styles.digitalContainer}
                   >
                     <TouchableOpacity
                   onPress={() => navigation.navigate('Home Detail',{
                    ArtworkId:item.id,
                    
                })}  
                    style={{width:'98%',height:'98%',borderRadius:20}}
                    >
                     <AnimatedImage uri={item.artwork_image_url}
                        resizeMode="cover"
                        style={{width:'100%',height:'100%',borderRadius:20}}/>
                    </TouchableOpacity>
                   </LinearGradient>
                   

                    }
                    
                   
                   </>
                )
            }}

            contentContainerStyle={{paddingBottom:80,}}
            
            />
        }
           
            
        </View>
        
           
        
        </SafeAreaView>
    )
}
export default Searching

const styles = StyleSheet.create({
    container:{flex:1,},
    imgContainer:{width:'42%',margin:15,height:scaleHeight(230),borderRadius:100,backgroundColor:colors.lightWhite,marginBottom:10,borderWidth:1,borderColor:colors.lightWhite,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 6,},
    digitalContainer:{width:'45%',margin:5,height:scaleHeight(210),marginVertical:15,marginHorizontal:10,borderRadius:20,justifyContent:'center',alignItems:'center',},
    textInput:{ paddingLeft:60,
        height:40,borderRadius:30,width:'100%',...fonts.LT_body4,...style.center,
        ...style.shadow,marginBottom:8,},
        icon:{position:'absolute',left:20,top:10,width:20,height:20,},
        icon1:{position:'absolute',right:20,top:10,width:20,height:20,},
        text:{...fonts.LT_body3,},
    icon2:{width:scaleWidth(50),height:scaleHeight(50)}
})