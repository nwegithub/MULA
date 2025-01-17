import React,{useContext} from "react";
import {View,Text,SafeAreaView,StyleSheet} from "react-native"
import { Context } from "../../../component/Context";
import TradiExplore from "./Component/TradiExplore";
import DigitalExplore from "./Component/DigitalExplore";


const ExploreArtwork = ({navigation,route}) =>{

    const {digital} = useContext(Context)
    const {ArtistId,artistName,artistName_mm} = route.params

    
    
    
    return(
        <SafeAreaView style={styles.container}>
           {
            digital?
            <DigitalExplore navigation={navigation} ArtistId={ArtistId} artistName={artistName}
            artistName_mm={artistName_mm}/>
            :
            <TradiExplore navigation={navigation} ArtistId={ArtistId} artistName={artistName}
            artistName_mm={artistName_mm}
            />
           }

        </SafeAreaView>
    )
}
export default ExploreArtwork

const styles = StyleSheet.create({
    container:{flex:1}
})