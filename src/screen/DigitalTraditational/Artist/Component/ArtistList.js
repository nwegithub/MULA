import React,{useContext} from "react";
import {View,TouchableOpacity,StyleSheet,Image,FlatList} from "react-native"
import icons from "../../../../constant/icons";
import { style } from "../../../../constant/style";
import { colors, fonts } from "../../../../constant/theme";
import { Context } from "../../../../component/Context";
import LinearGradient from "react-native-linear-gradient";
import { GET_ARTIST } from "../../../../graphql/queries";
import { useQuery } from "@apollo/client";
import Loading from "../../../../component/Loading";
import { scaleHeight } from "../../../../utils/responsive";


const ArtistList = ({navigation}) =>{

    const {digital} = useContext(Context)

    const {data, loading} = useQuery(GET_ARTIST, {variables:{
        ArtistType: digital? "Digital" : "Traditional"
    },fetchPolicy: 'network-only'});

   
    if(!data){
        return <Loading/>
    }
    return(
        
            <FlatList
            row={2}
            numColumns={2}
            data={data.artist }
            showsVerticalScrollIndicator={false}
            
            renderItem={({item,index}) =>{
                return(
                    <>
                    {
                        !digital ?
                        <TouchableOpacity 
                        onPress={() => navigation.navigate('ArtistDetail',{
                            ArtistId:item.id,
                            
                        })}
                    style={styles.container}
                    key={item.id}>
                        <Image source={{uri:item.artist_profile_image_url}}
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
                   onPress={() => navigation.navigate('ArtistDetail',{
                    ArtistId:item.id
                })}
                    style={{width:'97%',height:'97%',borderRadius:20}}
                    >
                     <Image source={{uri:item.artist_profile_image_url}}
                        resizeMode="cover"
                        style={{width:'100%',height:'100%',borderRadius:20}}/>
                    </TouchableOpacity>
                   </LinearGradient>
                   

                    }
                    
                   
                   </>
                )
            }}

            contentContainerStyle={{paddingBottom:80,paddingHorizontal:20}}
            
            />
       
    )
} 
export default ArtistList

const styles = StyleSheet.create({
    container:{width:'42%',margin:15,height:scaleHeight(220),borderRadius:100,backgroundColor:colors.lightWhite,marginBottom:10,borderWidth:1,borderColor:colors.lightWhite,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 6,},
    digitalContainer:{width:'42%',margin:15,height:scaleHeight(210),borderRadius:20,justifyContent:'center',alignItems:'center',}
})