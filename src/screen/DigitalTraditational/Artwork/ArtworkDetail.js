import React,{useContext,useEffect,useState} from "react"
import {View,Text,SafeAreaView,StyleSheet,Image,TouchableOpacity,Dimensions,Platform} from "react-native"
import { style } from "../../../constant/style"
import icons from "../../../constant/icons"
import { Context } from "../../../component/Context"
import DetailBody from "./Component/DetailBody"
import { colors, fonts } from "../../../constant/theme"
import { GET_ARTWORK_BY_ID,GET_ARTWORK_BY_ID_FOR_USER } from "../../../graphql/queries"
import {  useQuery,useMutation } from "@apollo/client"
import Loading from "../../../component/Loading"
import { err } from "react-native-svg/lib/typescript/xml"

const width = Dimensions.get('screen').width

const HomeDetail = ({navigation,route}) =>{

    const {digital,user,langData,language} = useContext(Context)

    const {ArtworkId} = route.params

   
    const {data} = useQuery(user? GET_ARTWORK_BY_ID_FOR_USER: GET_ARTWORK_BY_ID,{
        variables:{userId: user && user.id ,ArtworkId},fetchPolicy:'network-only'})


    if(!data){
        return <Loading />
    }

    
    return(
        <SafeAreaView style={[styles.container1,{backgroundColor: digital? colors.darkBlack:colors.white}]}>
                <TouchableOpacity 
                onPress={() =>navigation.navigate('Full Imgage',{
                    ArtworkImg:digital? data.digital_art_work_by_pk.artwork_image_url :data.traditional_art_work_by_pk.artwork_image_url,
                    
                    
                })}
                style={{height:width}}>
                    <Image 
                    source={{uri:digital? data.digital_art_work_by_pk.artwork_image_url :  data.traditional_art_work_by_pk.artwork_image_url}} 
                    resizeMode="cover" style={styles.img}
                    
                    />
                    <TouchableOpacity 
                    onPress={() =>navigation.navigate('Full Imgage',{
                        ArtworkImg:digital? data.digital_art_work_by_pk.artwork_image_url :data.traditional_art_work_by_pk.artwork_image_url,
                        
                       
                    })}
                    style={[styles.fullView,{backgroundColor: digital ? 'rgba(251, 249, 247, 0.2)' 
                    : 'rgba(30, 30, 30, 0.3)',}]}
                    >
                        <Image source={icons.full_view} style={styles.icon}/>
                        <Text style={{color:colors.lightWhite,lineHeight:Platform.OS === 'ios'? 0:20,...fonts.LT_body6}}>{langData.fullScreen}</Text>

                    </TouchableOpacity>
                <TouchableOpacity
                    onPress={()=> navigation.goBack()}
            style={{position:'absolute',top:15,left:10,width:50,height:50,borderRadius:50,backgroundColor:colors.white,...style.center}}
            >
                <Image source={icons.digital_back_arrow} style={{width:25,height:25,tintColor:
                digital? null:colors.primary}} resizeMode="contain"/>
            </TouchableOpacity>
                
            </TouchableOpacity>

            <DetailBody navigation={navigation} data={data} ArtworkId={ArtworkId}/>

        </SafeAreaView>
    )
}
export default HomeDetail

const styles  = StyleSheet.create({
    container1:{flex:1},
    img:{width:'100%',height:'100%'},
    fullView:{position:'absolute',right:0,bottom:0,...style.flexRow,padding:5},
    icon:{width:20,height:20,marginRight:5}
})