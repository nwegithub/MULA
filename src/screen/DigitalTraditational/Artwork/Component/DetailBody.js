import React, { useContext, useState } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView, Dimensions, Platform } from "react-native";
import icons from "../../../../constant/icons";
import { style } from "../../../../constant/style";
import { colors, fonts } from "../../../../constant/theme";
import { Context } from "../../../../component/Context";
import { DarkBreakLine } from "../../../../component/BreakLine";
import LinearGradient from "react-native-linear-gradient";
import RenderHTML, { defaultSystemFonts } from "react-native-render-html";
import { useMutation } from "@apollo/client";
import { ADD_FAVOURITE, DELETE_FAVOURITE } from "../../../../graphql/mutations";
import { GET_ARTWORK_BY_ID_FOR_USER, GET_USER_FAVOURITE } from "../../../../graphql/queries";
import { scaleWidth, scaleHeight } from "../../../../utils/responsive";
import { DigitalBotton,TradidionalButton } from "../../../../utils/helper";

const width = Dimensions.get('screen').width


const DetailBody = ({ navigation, data, ArtworkId }) => {
    const { digital, user, language,langData,theme } = useContext(Context)


    const [addFavourite] = useMutation(ADD_FAVOURITE, { refetchQueries: [GET_ARTWORK_BY_ID_FOR_USER, GET_USER_FAVOURITE] })
    const [deleteFavourite] = useMutation(DELETE_FAVOURITE, { refetchQueries: [GET_ARTWORK_BY_ID_FOR_USER, GET_USER_FAVOURITE] })

    const systemFonts = [...defaultSystemFonts, 'Lato-Regular',]


    const addFavouriteItem = async () => {
        try {
            await addFavourite({
                variables: {
                    ArtworkId: digital ? null : ArtworkId,
                    userId: user.id,
                    DigitalArtworkId: digital ? ArtworkId : null
                }
            })

        } catch (e) {
            console.log(e)

        }
    }

    const deleteFavoriteItem = async (favoriteId) => {
        await deleteFavourite({
            variables: { favoriteId }
        })


    }


    let series_data = digital ? data.digital_art_work_by_pk.digital_artist_art_series : data.traditional_art_work_by_pk.traditional_art_work_artist_art_series

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    

    if( !series_data){
        return null
    }

    

    return (
        <>
            <ScrollView
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.container}>
                    <ScrollView
                        showsHorizontalScrollIndicator={false}
                        horizontal>
                        {
                            series_data.map((item, index) => {
                                return (
                                    <View
                                        key={index}
                                        style={[styles.seriesContainer, { backgroundColor: digital ? '#cfd1cf' : '#cfd1cf', }]}
                                    >

                                        <Text style={[styles.seriesName, { color:digital? colors.black : colors.gray }]}> {
                                            digital ? (language === 'mm' ? item.digtal_art_sery.series_name_mm : item.digtal_art_sery.series_name)
                                                : (language === 'mm' ? item.artist_art_series_art_sery.series_name_mm : item.artist_art_series_art_sery.series_name)}</Text>


                                    </View>
                                )
                            })

                        }
                    </ScrollView>
                    <View style={styles.content}>
                        <View>
                            <Text style={[styles.header, { color: theme.secColor}]}>{
                                digital ?
                                    (language === 'mm' ? data.digital_art_work_by_pk.artwork_name_mm : data.digital_art_work_by_pk.artwork_name)
                                    :
                                    (language === 'mm' ? data.traditional_art_work_by_pk.artwork_name_mm : data.traditional_art_work_by_pk.artwork_name)}
                            </Text>
                            <Text style={[styles.body, { color: theme.secColor}]}>
                                <Text style={{ color: digital ? colors.lightWhite : colors.gray, fontSize: 15, fontFamily: 'Lato-Regular' }}>{language === 'mm' ? "" : "by"}</Text> {
                                    digital ?
                                        (language === 'mm' ? data.digital_art_work_by_pk.digital_art_work_artist.artist_name_mm : data.digital_art_work_by_pk.digital_art_work_artist.artist_name)
                                        :
                                        (language === 'mm' ? data.traditional_art_work_by_pk.traditional_art_work_artist.artist_name_mm : data.traditional_art_work_by_pk.traditional_art_work_artist.artist_name)}
                            </Text>
                        </View>

                        <TouchableOpacity
                            onPress={() =>
                                user
                                    ?
                                    (
                                        digital ?
                                            (

                                                data.digital_art_work_by_pk.digital_art_work_user_favourites.length !== 0 ?
                                                    deleteFavoriteItem(data.digital_art_work_by_pk.digital_art_work_user_favourites[0]?.id)
                                                    :
                                                    addFavouriteItem()
                                            )
                                            :
                                            (
                                                data.traditional_art_work_by_pk.traditional_art_work_user_favourites.length !== 0 ?
                                                    deleteFavoriteItem(data.traditional_art_work_by_pk.traditional_art_work_user_favourites[0]?.id)
                                                    :
                                                    addFavouriteItem()
                                            )
                                    )
                                    : navigation.navigate("Sign In", {
                                        redirectTo: "BACK"
                                    })
                            }

                            style={{ marginBottom: 20 }}>
                            {
                                digital ?
                                    <Image source={
                                        user && data.digital_art_work_by_pk.digital_art_work_user_favourites.length !== 0 ?
                                            icons.digital_heart_fill : icons.heart
                                    } resizeMode="contain" style={[styles.icon, {}]} />
                                    :

                                    <Image source={
                                       user && data.traditional_art_work_by_pk.traditional_art_work_user_favourites.length !== 0 ?
                                            icons.tradi_heart_fill : icons.heart
                                    } resizeMode="contain" style={[styles.icon, { tintColor: !digital ? colors.primary : null }]} />

                            }
                        </TouchableOpacity>

                    </View> 
                    <TouchableOpacity
                        onPress={() => navigation.navigate('ArtistDetail', {
                            ArtistId:
                                digital ?
                                    data.digital_art_work_by_pk.digital_art_work_artist.id
                                    :
                                    data.traditional_art_work_by_pk.traditional_art_work_artist.id
                        })}
                        style={styles.content}>
                        <Text style={[styles.body1, { color: theme.secColor }]}>{langData.exploreArtistAngArtwork}</Text>
                        <Image source={icons.forward_arrow} resizeMode="contain" style={[styles.icon, { tintColor: !digital ? colors.primary : null }]} />
                    </TouchableOpacity>

                </View>
                <DarkBreakLine />
                <View style={styles.container}>
                    <Text style={[styles.description, { color: theme.secColor }]}>{langData.description}</Text>

                    <RenderHTML
                        contentWidth={width}
                        source={{
                            html:
                                digital ?
                                    (language === 'mm' ?
                                        ((data.digital_art_work_by_pk.description_mm.toLowerCase()).includes("TBD") ?
                                            ""
                                            :
                                        data.digital_art_work_by_pk.description_mm )
                                        :
                                        ((data.digital_art_work_by_pk.description.toUpperCase()).includes("TBD")?
                                            ""
                                            :
                                        data.digital_art_work_by_pk.description))
                                    :
                                    (language === 'mm' ?
                                        ((data.traditional_art_work_by_pk.description_mm.toUpperCase()).includes("TBD")?
                                            ""
                                            :
                                        data.traditional_art_work_by_pk.description_mm)
                                        :
                                        ((data.traditional_art_work_by_pk.description.toUpperCase()).includes("TBD")?
                                            ""
                                            :
                                        data.traditional_art_work_by_pk.description ))
                        }}
                        tagsStyles={{
                            body: {
                                color: theme.secColor, fontSize: language === 'mm' ? scaleWidth(12) : scaleWidth(14), fontFamily: 'Lato-Regular', lineHeight: Platform.OS === 'ios' ? 0 : 25

                            },
                        }}
                        systemFonts={systemFonts}
                    />
                    {
                        digital ?
                            null :
                            <View style={{ ...style.flexRowSpace, }}>
                                {
                                    data.traditional_art_work_by_pk.artwork_year ? 
                                    <View>
                                    <Text style={[styles.txt1, { color: theme.secColor, }]}>
                                        {data.traditional_art_work_by_pk.artwork_year}
                                    </Text>
                                    <Text style={[styles.txt2, { color: digital ? colors.lightWhite : colors.gray, }]}>
                                        {langData.year}
                                    </Text>
                                </View>
                                :
                                <Text style={[styles.txt2, { color: digital ? colors.lightWhite : colors.gray, }]}>
                            -</Text>
                                }
                                
                                <View style={{ width: 1, height: 50, backgroundColor: colors.black, marginHorizontal: 10 }} />
                                <View>
                                    <Text style={[styles.txt1, { color: theme.secColor, }]}>
                                        {language === 'mm' ?
                                            data.traditional_art_work_by_pk.traditional_art_work_artwork_medium_type.medium_name_mm
                                            :
                                            data.traditional_art_work_by_pk.traditional_art_work_artwork_medium_type.medium_name
                                        }
                                    </Text>
                                    <Text style={[styles.txt2, { color: digital ? colors.lightWhite : colors.gray, }]}>
                                        {langData.medium}
                                    </Text>
                                </View>
                                <View style={{ width: 1, height: 50, backgroundColor: colors.black, marginHorizontal: 10 }} />
                                <View style={{}}>
                                    <Text style={[styles.txt1, { color: theme.secColor, }]}>
                                         {data.traditional_art_work_by_pk.width} {data.traditional_art_work_by_pk.traditional_artwork_dimension.dimension_name} x {data.traditional_art_work_by_pk.height} {data.traditional_art_work_by_pk.traditional_artwork_dimension.dimension_name}
                                    </Text>
                                    <Text style={[styles.txt2, { color: digital ? colors.lightWhite : colors.gray, }]}>
                                        {langData.dimension}
                                    </Text>
                                </View>

                            </View>

                    }

                </View>

            </ScrollView>

            <View style={styles.container}>

                {
                    digital?

                <Text style={[styles.price, { color: data.digital_art_work_by_pk.current_price === 2 ? colors.red : colors.lightWhite , marginTop: 10 }]}>
                    { data.digital_art_work_by_pk.current_price === 0?
                        "Not For Sale" :
                        data.digital_art_work_by_pk.current_price === 1 ?
                            "" :
                            data.digital_art_work_by_pk.current_price === 2 ?
                                "Sold Out" :
                        numberWithCommas(data.digital_art_work_by_pk.current_price)+"MMK"} </Text>
                :
                <Text style={[styles.price, { color: data.traditional_art_work_by_pk.current_price === 2 ? colors.red :  colors.primary, marginTop: 10 }]}>
                    { data.traditional_art_work_by_pk.current_price === 0 ?
                        "Not For Sale" :
                        data.traditional_art_work_by_pk.current_price === 1 ?
                           "" :
                            data.traditional_art_work_by_pk.current_price === 2 ?
                                "Sold Out" :
                        numberWithCommas(data.traditional_art_work_by_pk.current_price) 
                        + 
                        (data.traditional_art_work_by_pk.traditional_art_work_artwork_price_unit === null ?
                            " MMK" :
                            " " + data.traditional_art_work_by_pk.traditional_art_work_artwork_price_unit.price_unit
                          )
                        } 
                        </Text>
                    }

                {
                    digital && data.digital_art_work_by_pk.sold_out_date &&
                        <Text style={[styles.price,{marginTop:5,color:digital? colors.lightWhite : colors.black}]}>
                            {data.digital_art_work_by_pk.sold_out_date.split('T')[0]}
                        </Text>
                }

                {
                    !digital && data.traditional_art_work_by_pk.sold_out_date &&
                    <Text style={[styles.price,{marginTop:5,color:digital? colors.lightWhite : colors.black}]}>
                        { data.traditional_art_work_by_pk.sold_out_date.split('T')[0] } </Text>

                }

                <Text style={[styles.price,{marginTop:5,color:digital? colors.lightWhite : colors.black}]}>
                    { digital? data.digital_art_work_by_pk.buyer : data.traditional_art_work_by_pk.buyer } </Text>


                {
                    digital ?
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Contact Us')}
                        >
                            <DigitalBotton text={langData.purchase}/>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Contact Us')}
                        >
                            <TradidionalButton text={langData.purchase}/>
                        </TouchableOpacity>
                }

            </View>

        </>

    )
}
export default DetailBody

const styles = StyleSheet.create({
    container: { paddingHorizontal: 20, paddingVertical: 10 },
    icon: { width:scaleWidth(25), height: scaleHeight(25) },
    content: { ...style.flexRowSpace, marginTop: 10 },
    header: { ...fonts.PT_h1, lineHeight: Platform.OS === 'ios' ? 0 : 30 },
    body: { fontSize: 15, fontFamily: 'PTSerif-Bold', lineHeight: Platform.OS === 'ios' ? 0 : 25 },
    body1: { ...fonts.LT_body5, lineHeight: Platform.OS === 'ios' ? 0 : 20 },
    description: { ...fonts.LT_body2, marginTop: 10, },
    price: { ...fonts.LT_body1 },
    btnText: { ...fonts.LT_body2, color: colors.lightWhite, lineHeight: Platform.OS === 'ios' ? 0 : 27 },
    txt1: { ...fonts.LT_body2, },
    txt2: { ...fonts.LT_body5, color: colors.black, lineHeight: Platform.OS === 'ios' ? 0 : 20 },
    seriesContainer: {
        borderRadius: 8, ...style.center, height: 26, paddingHorizontal: 10,
        marginRight: 8,...style.center
    },
    seriesName: { ...fonts.LT_body5 }
})