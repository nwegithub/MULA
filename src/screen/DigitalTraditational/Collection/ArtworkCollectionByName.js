import React, { useContext } from "react";
import { View, Text, SafeAreaView, StyleSheet, StatusBar, ImageBackground, Platform } from "react-native"
import { useQuery } from "@apollo/client";
import { GET_ARTWORK_COLLECTION_BY_ID } from "../../../graphql/queries";
import Loading from "../../../component/Loading";
import CollectionSlider from "./Component/CollectionSlider";
import { colors, fonts } from "../../../constant/theme";
import { style } from "../../../constant/style";
import { Context } from "../../../component/Context";
import images from "../../../constant/images";
import BackHeaderComponent from "../../../component/BackHeaderComponent";

const ArtworkCollectionByName = ({ route,navigation }) => {
    const { collectionId } = route.params
    const { digital,language,theme } = useContext(Context)
    const { data } = useQuery(GET_ARTWORK_COLLECTION_BY_ID, {
        variables: {
            collectionId: collectionId
        }, fetchPolicy: 'network-only'
    })



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
                    <Text style={[styles.text, {
                        color:theme.mainColor,
                        lineHeight: Platform.OS == 'ios' ? 0 : 30
                    }]}>{
                            digital ? (language === 'mm' ? data?.digital_collection_by_pk.collection_name_mm : data?.digital_collection_by_pk.collection_name)
                                :
                                (language === 'mm'? data?.collection_by_pk.collection_name_mm : data?.collection_by_pk.collection_name)
                        } {language === 'mm'? "စုစည်းချက်" : "Collection"}</Text>
                    <CollectionSlider data={digital ? data?.digital_collection_by_pk.digital_collection_digital_art_collections
                        : data?.collection_by_pk.collection_art_collections} navigation={navigation}

                    />
                </View>
            </SafeAreaView>
        </ImageBackground>
    )
}
export default ArtworkCollectionByName

const styles = StyleSheet.create({
    container: {
        flex: 1,


    },
    text: { marginBottom: 30, ...fonts.PT_h2, paddingLeft: 40 },
    carouselContainer: {
        marginBottom: 20,
    },
    bgImg: { flex: 1, height: '100%' },
})
