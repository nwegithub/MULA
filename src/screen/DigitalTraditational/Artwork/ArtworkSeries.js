import React, { useContext } from "react";
import { View, Text, SafeAreaView, StyleSheet, FlatList,
    ImageBackground, Image, TouchableOpacity, Platform } from "react-native"
import { Context } from "../../../component/Context";
import { colors, fonts } from "../../../constant/theme";
import icons from "../../../constant/icons";
import Loading from "../../../component/Loading";
import { style } from "../../../constant/style";
import { useQuery } from "@apollo/client";
import { GET_SERIES_BY_ARTIST_ID } from "../../../graphql/queries";
import LinearGradient from "react-native-linear-gradient";
import images from "../../../constant/images";
import BackHeaderComponent from "../../../component/BackHeaderComponent";
import { scaleHeight } from "../../../utils/responsive";

const ArtworkSeries = ({ route, navigation }) => {

    const { ArtistId, artistName, artistName_mm } = route.params
    const { digital, langData,language,theme } = useContext(Context)

    const { data: series_data, } = useQuery(GET_SERIES_BY_ARTIST_ID, {
        variables: { ArtistId },
        fetchPolicy: 'network-only'
    })

    if (!series_data) {
        return <Loading />
    }

    return (
        <ImageBackground
            source={digital ? images.digital_bg : images.tradi_bg
            }
            style={styles.bgImg}
        >
        <SafeAreaView style={[styles.container]}>
            <BackHeaderComponent navigation={navigation}/>
            <View style={styles.content}>
                <Text style={[styles.title, { color: theme.secColor }]}>{language === 'mm' ? artistName_mm : artistName}{language === 'mm' ? "၏" : "'s"}</Text>
                <Text style={{ color: theme.secColor, ...fonts.LT_h1, marginLeft: 20, lineHeight: Platform.OS === 'ios' ? 0 : 28,}}> {language === 'mm' ? "ပန်းချီကားချပ်များစုစည်းမှူ" : "Artwork Series"}</Text>

                <FlatList
                    row={2}
                    numColumns={2}
                    data={!digital ? series_data.art_series : series_data.digtal_art_series}
                    showsVerticalScrollIndicator={false}

                    renderItem={({ item, index }) => {
                
                        return (
                            <>
                                {
                                    !digital ?
                                        <TouchableOpacity
                                            onPress={() => navigation.navigate('Artwork Series By Name', {
                                                ArtistId,
                                                SeriesName: item.series_name,
                                                SeriesName_mm: item.series_name_mm

                                            })}
                                            style={styles.tradicontainer}
                                            key={item.id}>
                                            <Image source={{ uri: item.art_series_traditional_art_work.artwork_image_url }}
                                                resizeMode="cover"
                                                style={{ width: '100%', height: '100%', borderRadius: digital ? 30 : 100 }} />

                                            <View style={styles.nameContainer}>
                                                <Text style={styles.name}>{language === 'mm' ? item.series_name_mm : item.series_name}</Text>
                                            </View>
                                        </TouchableOpacity>
                                        :


                                        <LinearGradient
                                            colors={colors.linearBorder}
                                            start={{ x: 0, y: 1 }}
                                            end={{ x: 1, y: 0 }}
                                            style={styles.digitalContainer}
                                        >
                                            <TouchableOpacity
                                                 onPress={() => navigation.navigate('Artwork Series By Name', {
                                                    ArtistId,
                                                    SeriesName: item.series_name,
                                                    SeriesName_mm: item.series_name_mm
    
                                                })}
                                                style={{ width: '97%', height: '98%', borderRadius: 20 }}
                                            >
                                                
                                                            <Image source={{ uri: item.art_series_digital_artwork.artwork_image_url }}
                                                                resizeMode="cover"
                                                                style={{ width: '100%', height: '100%', borderRadius: 20 }} />
                                                  
                                                <View style={styles.nameContainer}>
                                                    <Text style={styles.name}>{language === 'mm' ? item.series_name_mm : item.series_name}</Text>
                                                </View>
                                            </TouchableOpacity>
                                        </LinearGradient>


                                }


                            </>
                        )
                    }}

                    contentContainerStyle={{ paddingBottom: 80, }}

                />
                
            </View>

        </SafeAreaView>
        </ImageBackground>
    )
}

export default ArtworkSeries

const styles = StyleSheet.create({
    container: { flex: 1 },
    content: { paddingHorizontal: 20 },
    tradicontainer: {
        width: '41%', margin: 15, height:scaleHeight(220), borderRadius: 100, backgroundColor: colors.lightWhite, marginBottom: 10,
        borderWidth: 1, borderColor: colors.lightWhite,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 6,
    },
    digitalContainer: { width: '45%', margin: 5, height:scaleHeight(210), marginVertical: 15, marginHorizontal: 10, borderRadius: 20, justifyContent: 'center', alignItems: 'center', },
    title: { ...fonts.PT_h1, marginLeft: 25 },
    nameContainer: { position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, ...style.center },
    name: { ...fonts.PT_h1, color: colors.lightWhite, lineHeight: Platform.OS === 'ios' ? 0 : 30 },
    bgImg: { flex: 1, height: '100%' },
})