import React, { useContext } from "react";
import {View,Text,SafeAreaView,ImageBackground,StyleSheet,Platform,Image,TouchableOpacity} from "react-native"
import images from "../../../constant/images";
import { Context } from "../../../component/Context";
import { colors, fonts } from "../../../constant/theme";
import icons from "../../../constant/icons";
import { useQuery } from "@apollo/client";
import { GET_ARTWORK_COLLECTION_BY_ARTIST } from "../../../graphql/queries";
import Loading from "../../../component/Loading";
import ExploreSlider from "./Component/ExploreSlider";
import BackHeaderComponent from "../../../component/BackHeaderComponent";





const ExploreArtwork =({navigation,route}) => {
    const {digital,language,theme}= useContext(Context)
    const {ArtistId,artistName_mm,artistName} = route.params

    const {data,loading} = useQuery(GET_ARTWORK_COLLECTION_BY_ARTIST,{variables:{ArtistId},fetchPolicy:'network-only'})

    if(!data){
      return <Loading/>
    }
    return(
        <ImageBackground
            source={digital ? images.digital_bg : images.tradi_bg
            } 
            style={styles.bgImg}
        > 
            <SafeAreaView style={styles.container}>
              <BackHeaderComponent navigation={navigation}/>
              
      <View style={styles.carouselContainer}>
      <Text style={[styles.title2,{color:theme.mainColor}]}>{language === 'mm' ? "" : "Explore"}</Text>
        <Text style={[styles.title1,{color:theme.mainColor}]}>{language === 'mm' ? artistName_mm : artistName}{language === 'mm'? "၏ပန်းချီအနုပညာလက်ရာများ" : "'s Artworks"}</Text>
        <ExploreSlider data={!digital ? data.artist_by_pk?.artist_traditional_art_works
          :  data.artist_by_pk?.artist_digital_art_works} navigation={navigation}

        />
      </View>
     
    </SafeAreaView>

        </ImageBackground>
    )
}
export default ExploreArtwork

const styles = StyleSheet.create({
    bgImg: { flex: 1, height: '100%' },
    container: {
        flex: 1,
        
      },
      text: { textAlign: 'center', color: 'black', marginBottom: 30, ...fonts.PT_h2 },
      carouselContainer: {
        marginBottom: 20,
      },
      title2:{...fonts.LT_h1,color:colors.black,marginLeft:30,marginVertical:10,
        lineHeight: Platform.OS == 'ios' ? 0 : 30},
      title1:{...fonts.PT_h1,color:colors.black,marginLeft:30,lineHeight: Platform.OS == 'ios' ? 0 : 30,
    marginTop:0,marginBottom:30,maxWidth:300},


})