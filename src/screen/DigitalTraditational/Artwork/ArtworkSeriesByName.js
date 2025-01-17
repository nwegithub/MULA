import React, { useContext } from "react";
import { View, Text, SafeAreaView, StyleSheet, StatusBar,ImageBackground,Platform } from "react-native"
import { useQuery } from "@apollo/client";
import { GET_SERIES_BY_SERIES_NAME } from "../../../graphql/queries";
import Loading from "../../../component/Loading";
import SeriesSlider from "./Component/SeriesSlider";
import { fonts,colors } from "../../../constant/theme";
import { style } from "../../../constant/style";
import { Context } from "../../../component/Context";
import BackHeaderComponent from "../../../component/BackHeaderComponent";
import images from "../../../constant/images";


const ArtworkSeriesByName = ({ route,navigation }) => {
  const { digital,language,theme } = useContext(Context)
  const { ArtistId, SeriesName, SeriesName_mm } = route.params

  const { data,  } = useQuery(GET_SERIES_BY_SERIES_NAME, { variables: { SeriesName, ArtistId }, fetchPolicy: 'network-only' })


  if (!data) {
    return <Loading />
  }




  if (!data) {
    return <Loading />
  }
  return ( 
    <ImageBackground
            source={digital ? images.digital_bg : images.tradi_bg
            }
            style={styles.bgImg}
        >
    <SafeAreaView style={styles.container}>
      <BackHeaderComponent navigation={navigation}/>
      <View style={styles.carouselContainer}>
        <Text style={[styles.title1, {
                        color: theme.mainColor,
                        
                    }]}>{language === 'mm' ? SeriesName_mm : SeriesName}</Text>
        <Text style={[styles.title2,{
                        color: theme.mainColor,
                        
                    }]}>{language === 'mm' ? "စီးရီး" : "Series"}</Text>
        <SeriesSlider data={!digital ? data.art_series
          :  data.digtal_art_series} navigation={navigation}

        />
      </View> 
    </SafeAreaView>
    </ImageBackground>
  )
}
export default ArtworkSeriesByName

const styles = StyleSheet.create({
  container: {
    flex: 1,
  
  },
  bgImg: { flex: 1, height: '100%' },
  text: { textAlign: 'center', color: 'black', marginBottom: 30, ...fonts.PT_h2 },
  carouselContainer: {
    marginBottom: 20,
  },
  title1:{...fonts.PT_h1,color:colors.black,marginLeft:30,lineHeight: Platform.OS == 'ios' ? 0 : 30},
  title2:{...fonts.LT_h1,color:colors.black,marginLeft:30,marginVertical:10,marginBottom:30,lineHeight: Platform.OS == 'ios' ? 0 : 30}
})
