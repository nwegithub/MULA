import React, { useContext, useState } from "react";
import {
    View, Text, SafeAreaView, StyleSheet, Image, ImageBackground, TouchableOpacity, ScrollView,
    FlatList, Dimensions, Platform, StatusBar
} from "react-native"
import { Context } from "../../../component/Context";
import { colors, fonts } from "../../../constant/theme";
import { style } from "../../../constant/style";
import icons from "../../../constant/icons";
import { scaleWidth, scaleHeight } from "../../../utils/responsive";
import { GET_ARTIST_BY_ID, GET_SERIES_BY_ARTIST_ID } from "../../../graphql/queries";
import { useQuery } from "@apollo/client";
import Loading from "../../../component/Loading";
import RenderHTML, { defaultSystemFonts } from "react-native-render-html";


const width = Dimensions.get('screen').width

const ArtistDetail = ({ navigation, route }) => {

    const { digital, language,langData } = useContext(Context)
    const { ArtistId } = route.params

    const systemFonts = [...defaultSystemFonts, 'Lato-Regular',]

    const { data, loading } = useQuery(GET_ARTIST_BY_ID, { variables: { ArtistId }, fetchPolicy: 'network-only' })

    const { data: series_data, } = useQuery(GET_SERIES_BY_ARTIST_ID, {
        variables: { ArtistId },
        fetchPolicy: 'network-only'
    })





    if (!(data&&series_data)) {
        return <Loading />
    }

    return (

        <View style={[styles.container,{backgroundColor:colors.white}]}>
            <StatusBar
                barStyle={'dark-content'}
                animated={true}
                backgroundColor= {digital? colors.darkBlack : colors.primary}

            />
            {
                digital ?

                    <ImageBackground source={{ uri: data.artist_by_pk.artist_profile_image_url }}
                        resizeMode="cover"
                        style={{ width: '100%', height: '100%', flex: 1 }}
                        blurRadius={5}
                    >
                        <SafeAreaView/>
                        <ScrollView
                            showsVerticalScrollIndicator={false}
                            style={styles.container}>
                            <View style={styles.content}>
                                <View style={{ marginTop:scaleHeight(60), marginBottom: 30 }}>
                                    <Image source={{ uri: data.artist_by_pk.artist_profile_image_url }}
                                        style={{ width: 100, height: 100, borderRadius: 50 }}
                                    />
                                    <Text style={styles.title1}>{language === 'mm' ? data.artist_by_pk.artist_name_mm : data.artist_by_pk.artist_name}</Text>
                                    <TouchableOpacity
                                        onPress={() => navigation.navigate('ExploreArtwork', {
                                            ArtistId,
                                            artistName_mm: data.artist_by_pk.artist_name_mm,
                                            artistName: data.artist_by_pk.artist_name,
                                        })}
                                        style={{ ...style.flexRowSpace }}>
                                        <Text style={[styles.title1, { ...fonts.LT_body1, lineHeight: Platform.OS === 'ios' ? 0 : scaleHeight(25) }]}>{langData.exploreArtwork}</Text>
                                        <Image source={icons.forward_arrow}
                                            resizeMode="contain"
                                            style={{ width: 20, height: 20 }} />
                                    </TouchableOpacity>
                                </View>

                                <View style={{ width: '100%', height: 1, backgroundColor: colors.lightWhite }} />
                                <View style={{ marginTop: 40 }}>
                                    <Text style={styles.header1}>{langData.biography} </Text>
                                    <RenderHTML
                                        contentWidth={width}
                                        source={{ html: language === 'mm' ? data.artist_by_pk.biography_mm : data.artist_by_pk.biography }}
                                        tagsStyles={{
                                            body: {
                                                color: digital ? colors.lightWhite : colors.gray, fontSize: language === 'mm' ? scaleWidth(14) : scaleWidth(16), fontFamily: 'Lato-Regular', lineHeight: Platform.OS === 'ios' ? 0 : 25

                                            },
                                            p: { margin: 0, padding: 0 }
                                        }}
                                        systemFonts={systemFonts}
                                    />
                                </View>
                                <View style={{ marginTop: 20 }}>

                                    <Text style={{ color: '#09FBD3', ...fonts.LT_body1, lineHeight: Platform.OS === 'ios' ? 0 : 25 }}>{langData.born}</Text>
                                    <Text style={{ color: colors.lightWhite, ...fonts.LT_body2 }}>{data.artist_by_pk.year_born}</Text>

                                </View>


                            </View>


                                <View style={styles.content}>
                                    {
                                        series_data.digtal_art_series.length !== 0 &&

                                        <TouchableOpacity
                                            onPress={() => navigation.navigate('Artwork Series', {
                                                ArtistId,
                                                artistName: data.artist_by_pk.artist_name,
                                                artistName_mm: data.artist_by_pk.artist_name_mm
                                            })}
                                            style={{...style.flexRowSpace}}>
                                            <Text style={{
                                                ...fonts.LT_body2,
                                                color: colors.lightWhite,
                                                lineHeight: Platform.OS === 'ios' ? 0 : 25
                                            }}>{langData.artworkSerie}</Text>
                                            <Text style={{
                                                ...fonts.LT_body5,
                                                color: colors.lightWhite,
                                                textDecorationLine: 'underline',
                                                lineHeight: Platform.OS === 'ios' ? 0 : 20
                                            }}>{langData.seeAll}</Text>
                                        </TouchableOpacity>
                                    }

                                    <FlatList
                                        data={series_data.digtal_art_series}
                                        horizontal
                                        renderItem={({item, index}) => {

                                            return (

                                                <TouchableOpacity

                                                    onPress={() => navigation.navigate('Artwork Series By Name', {
                                                        ArtistId,
                                                        SeriesName: item.series_name,
                                                        SeriesName_mm: item.series_name_mm

                                                    })}
                                                    key={index}
                                                    style={[styles.seriesContainer, {borderRadius: scaleWidth(15)}]}
                                                >


                                                    <Image
                                                        source={{uri: item.art_series_digital_artwork.artwork_image_url}}
                                                        style={{
                                                            width: '100%',
                                                            height: '80%',
                                                            borderRadius: scaleWidth(15)
                                                        }}/>


                                                    <Text style={{
                                                        ...fonts.LT_body5,
                                                        color: colors.lightWhite,
                                                        textAlign: 'center',
                                                        marginTop: 10,
                                                        lineHeight: Platform.OS === 'ios' ? 0 : 20
                                                    }}>
                                                        {language === 'mm' ? item.series_name_mm : item.series_name}</Text>


                                                </TouchableOpacity>
                                            )
                                        }
                                        }

                                        contentContainerStyle={{marginTop: 13}}
                                    />
                                </View>

                            <TouchableOpacity
                                onPress={() => navigation.goBack()}
                                style={{ position: 'absolute', top: 15, left: 10 }}
                            >

                                <Image source={icons.digital_back_arrow}  style={{
                                    width: 25, height: 25, tintColor:
                                        digital ? null : colors.primary
                                }} resizeMode="contain" />


                            </TouchableOpacity>
                        </ScrollView>

                    </ImageBackground>


                    :
                    <SafeAreaView style={{flex:1}}>
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        style={styles.container}>
                        <View style={{ ...style.flexRow, padding: 20, marginTop: 40, flex:1,}}>

                            <TouchableOpacity

                                style={styles.proPos}>
                                <Image source={{ uri: data.artist_by_pk.artist_profile_image_url }} style={styles.proImg} />
                            </TouchableOpacity>

                            <View style={{ marginLeft: 20, flex: 1 }}>
                                <Text style={{ color: colors.black,...fonts.PT_h1,fontSize: language === 'mm'? 18:20,marginBottom:5 }}>{language === 'mm' ? data.artist_by_pk.artist_name_mm : data.artist_by_pk.artist_name}</Text>
                                <TouchableOpacity onPress={() => navigation.navigate('ExploreArtwork', {
                                    ArtistId,
                                    artistName_mm: data.artist_by_pk.artist_name_mm,
                                    artistName: data.artist_by_pk.artist_name,
                                })}>
                                    <Text style={{ ...fonts.PT_h2,color: colors.primary, 
                                        textDecorationLine: 'underline',
                                        lineHeight:Platform.OS === 'ios' ? 0 : scaleHeight(30) }}>
                                        {langData.exploreArtwork}</Text>
                                </TouchableOpacity>

                            </View>

                        </View>

                        <View style={{paddingHorizontal:20,}}>

                            
                                <Text style={[styles.header,]}>{langData.biography}</Text>
                                <RenderHTML
                                    contentWidth={width}
                                    source={{ html: language === 'mm' ? data.artist_by_pk.biography_mm : data.artist_by_pk.biography }}
                                    tagsStyles={{
                                        body: {
                                            color: digital ? colors.lightWhite : colors.gray, fontSize: language === 'mm' ? scaleWidth(12) : scaleWidth(14), fontFamily: 'Lato-Regular', lineHeight: Platform.OS === 'ios' ? 0 : 25

                                        },
                                        p: { margin: 0, padding: 0 }
                                    }}
                                    systemFonts={systemFonts}
                                />
                                <View style={{ ...style.flexRowSpace, marginTop: 20 }}>
                                    <View>
                                        <Text style={{ color: colors.black, ...fonts.LT_body2, lineHeight: Platform.OS === 'ios' ? 0 : 25 }}>{langData.born}</Text>
                                        <Text style={{ color: colors.gray, ...fonts.LT_body5 ,marginTop:10}}>{data.artist_by_pk.year_born}</Text>
                                    </View>
                                    

                                </View>

                            

                        </View>



                            <View style={styles.content}>
                                {
                                    series_data.art_series.length !== 0 &&
                                    <TouchableOpacity
                                        onPress={() => navigation.navigate('Artwork Series', {
                                            ArtistId,
                                            artistName: data.artist_by_pk.artist_name,
                                            artistName_mm: data.artist_by_pk.artist_name_mm
                                        })}
                                        style={{...style.flexRowSpace}}>
                                        <Text style={{
                                            ...fonts.LT_body2,
                                            color: colors.black,
                                            lineHeight: Platform.OS === 'ios' ? 0 : 25
                                        }}>{langData.artworkSerie}</Text>
                                        <Text style={{
                                            ...fonts.LT_body5,
                                            color: colors.black,
                                            // textDecorationLine: 'underline',
                                            lineHeight: Platform.OS === 'ios' ? 0 : 20
                                        }}>{langData.seeAll}</Text>
                                    </TouchableOpacity>
                                }

                                <FlatList
                                    data={series_data.art_series}
                                    horizontal
                                    showsVerticalScrollIndicator={false}
                                    renderItem={({item, index}) => {

                                        return (

                                            <TouchableOpacity
                                                onPress={() => navigation.navigate('Artwork Series By Name', {
                                                    ArtistId,
                                                    SeriesName: item.series_name,
                                                    SeriesName_mm: item.series_name_mm

                                                })}
                                                key={index}
                                                style={[styles.seriesContainer, {borderRadius: scaleWidth(75),}]}
                                            >


                                                <Image
                                                    source={{uri: item.art_series_traditional_art_work.artwork_image_url}}
                                                    style={{
                                                        width: '100%',
                                                        height: '80%',
                                                        borderRadius: scaleWidth(50)
                                                    }}/>
                                                <Text style={{
                                                    ...fonts.LT_body5,
                                                    color: colors.black,
                                                    textAlign: 'center',
                                                    marginTop: 10,
                                                    lineHeight: Platform.OS === 'ios' ? 0 : 25,
                                                    marginBottom: 10
                                                }}>{language === 'mm' ? item.series_name_mm : item.series_name}</Text>


                                            </TouchableOpacity>
                                        )
                                    }
                                    }

                                    contentContainerStyle={{marginTop: 13}}
                                />
                            </View>

                        <TouchableOpacity
                            onPress={() => navigation.goBack()}
                            style={{ position: 'absolute', top: 15, left: 10 }}
                        >

                            <Image source={icons.digital_back_arrow} style={{
                                width: 25, height: 25, tintColor:
                                    digital ? null : colors.primary
                            }} resizeMode="contain" />


                        </TouchableOpacity>


                    </ScrollView>
                    </SafeAreaView>
            }

        </View>



    )
}
export default ArtistDetail

const styles = StyleSheet.create({
    container: { flex: 1 },
    bgImg: { height: 250 },
    proPos: { width: 100, height: 135 },
    proImg: { width: '100%', height: '100%' },
    content: { padding: 20 ,},
    title: { ...fonts.PT_h2, },
    title1: { ...fonts.PT_h1, marginTop: 5, color: colors.lightWhite, lineHeight: Platform.OS === 'ios' ? 0 : scaleHeight(30) },
    header: { ...fonts.LT_body2,paddingBottom:10 ,color: colors.black, lineHeight: Platform.OS === 'ios' ? 0 :scaleHeight(26) },
    body: { color: colors.black, ...fonts.LT_body2, marginTop: 10 },
    header1: { ...fonts.LT_body1, color: '#09FBD3', lineHeight: Platform.OS === 'ios' ? 0 : 25 },
    body1: { ...fonts.LT_body2, color: colors.lightWhite, marginTop: 10 },
    seriesContainer: { width: scaleWidth(90), height: scaleHeight(170),  marginRight: 15, }
})