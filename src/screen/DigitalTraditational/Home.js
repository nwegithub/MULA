import React, { useContext, useState, useRef, useEffect } from "react";
import {
    View, Text, SafeAreaView, StyleSheet, ImageBackground, Image, TouchableOpacity, Dimensions,
    ScrollView, Platform, Keyboard, Button, TextInput
} from "react-native"
import icons from "../../constant/icons"
import { Context } from "../../component/Context";
import Artwork from "./Artwork/Artwork";
import Artist from "./Artist/Artist";
import ArtworkCollection from "./Collection/ArtworkCollection";
import { style } from "../../constant/style";
import images from "../../constant/images";
import { colors, fonts } from "../../constant/theme";
import { scaleWidth, scaleHeight } from "../../utils/responsive";
import LinearGradient from "react-native-linear-gradient";
import { useQuery } from "@apollo/client";
import Loading from "../../component/Loading";
import { GET_ARTWORK, GET_ARTIST, GET_ARTWORK_COLLECTION_BY_RESELLER, GET_MEDIUM_TYPE } from "../../graphql/queries";
import CartButton from "../../component/CartButton";



const Home = ({ navigation }) => {

    const { digital, language, user } = useContext(Context)


    const [listSelected, setListSelected] = useState(1)
    const [mediumSelected, setMediumSelected] = useState("")
    const [artworkMediumName, setArtworkMediumName] = useState({ medium_name: "%%", medium_name_mm: "%%" });

    const [artistNameSelected, setArtistNameSelected] = useState("")
    const [artistName, setArtistName] = useState({ artist_name: "%%", artist_name_mm: "%%" })

    const [backgroundSource, setBackgroundSource] = useState(digital ? images.digital_bg : images.tradi_bg);

    useEffect(() => {
        setBackgroundSource(digital ? images.digital_bg : images.tradi_bg);
    }, [digital]);

    const { data } = useQuery(GET_ARTWORK, {
        variables: {
            artworkMedium: artworkMediumName.medium_name,
            artworkMedium_mm: artworkMediumName.medium_name_mm,
        },
        fetchPolicy: 'cache-and-network'
    });


    const { data: data1, } = useQuery(GET_ARTIST, {
        variables: {
            artistType: digital ? "Digital" : "Traditional",
            artistName: artistName.artist_name,
            artistName_mm: artistName.artist_name_mm
        }, fetchPolicy: 'cache-and-network'
    });

    const { data: data2 } = useQuery(GET_ARTWORK_COLLECTION_BY_RESELLER, { fetchPolicy: 'cache-and-network' })

    const { data: artworkMediumData } = useQuery(GET_MEDIUM_TYPE)





    const list = [
        {
            id: 1,
            eng: "Artworks",
            mm: "ပန်းချီကားချပ်များ"
        },
        {
            id: 2,
            eng: "Artists",
            mm: "အနုပညာရှင်များ"
        },
        {
            id: 3,
            eng: "Collections",
            mm: "စုစည်းချက်များ"
        },

    ]

    if (!(data && data1 && data2 && artworkMediumData)) {
        return <Loading />
    }
    return (


        <ImageBackground
            source={backgroundSource
            }
            style={styles.bgImg}
        >

            <SafeAreaView style={styles.container}>

                <View >

                    <View style={styles.headerContainer}>


                        <TouchableOpacity
                            onPress={() => navigation.openDrawer()}
                        >
                            <Image source={icons.drawer} style={{ tintColor: digital ? null : colors.primary, width: scaleWidth(20), height: scaleHeight(20) }} />
                        </TouchableOpacity>
                        <View />
                        <Image source={digital ? icons.digital_mula_logo_name : icons.mula_logo_name} style={{ width: 100, height: 50, }} />

                        <View
                            style={{ ...style.flexRow, }}
                        >
                            <TouchableOpacity
                                onPress={() => navigation.navigate('Order')}
                            >
                                <Image source={icons.search} resizeMode="contain"
                                    style={[styles.icon, { tintColor: digital ? null : colors.primary, }]} />
                            </TouchableOpacity>

                            {
                                user ?
                                    <CartButton navigation={navigation} />
                                    :
                                    <TouchableOpacity
                                        onPress={() => navigation.navigate('Sign In', { redirectTo: "BACK" })
                                        }
                                    >
                                        <Image source={icons.cart} resizeMode="contain" style={{ width: scaleWidth(20), height: scaleHeight(20), tintColor: colors.primary }} />

                                    </TouchableOpacity>

                            }



                        </View>

                    </View>


                    <ScrollView
                        horizontal

                        contentContainerStyle={{
                            flex: language === 'mm' ? 0 : 1, justifyContent: "space-between", marginBottom: 5,
                            paddingHorizontal: 20
                        }}
                        showsHorizontalScrollIndicator={false}
                    >
                        {
                            list.map((item, index) => {
                                return (
                                    <>
                                        {
                                            digital ?


                                                <LinearGradient
                                                    colors={colors.linearBtn}
                                                    start={{ x: 0, y: 1 }}
                                                    end={{ x: 1, y: 0 }}
                                                    style={{
                                                        width: language === 'mm' ? scaleWidth(140) : '30%', marginRight: language === 'mm' ? 15 : 0, height: 38,
                                                        borderRadius: 8, ...style.center,
                                                    }}
                                                >
                                                    <TouchableOpacity
                                                        key={index}
                                                        onPress={() => setListSelected(item.id)}
                                                        style={{
                                                            backgroundColor: listSelected !== item.id ? colors.darkBlack : null, width: listSelected !== item.id ? '98%' : null,

                                                            height: listSelected !== item.id ? '97%' : null, borderRadius: 8, justifyContent: 'center'
                                                        }}
                                                    >

                                                        <Text style={{
                                                            ...fonts.LT_body4, color: colors.lightWhite,
                                                            textAlign: 'center', lineHeight: Platform.OS === 'ios' ? 0 : 25
                                                        }}>{language === 'mm' ? item.mm : item.eng}</Text>
                                                    </TouchableOpacity>
                                                </LinearGradient>




                                                :



                                                <TouchableOpacity
                                                    key={index}
                                                    onPress={() => setListSelected(item.id)}
                                                    style={[styles.listContainer, {
                                                        backgroundColor: listSelected === item.id ? colors.primary : colors.lightWhite,
                                                        borderWidth: 1, borderColor: colors.primary, marginRight: language === 'mm' ? 13 : 0,
                                                        width: language === 'mm' ? 140 : '30%',
                                                    }]}
                                                >

                                                    <Text style={{
                                                        ...fonts.LT_body4, color: listSelected === item.id ? colors.lightWhite : colors.primary,
                                                        textAlign: 'center', lineHeight: Platform.OS === 'ios' ? 0 : 25
                                                    }}>{language === 'mm' ? item.mm : item.eng}</Text>
                                                </TouchableOpacity>




                                        }
                                    </>
                                )
                            })
                        }
                    </ScrollView>


                </View>

                {
                    listSelected === 1 ?
                        <Artwork
                            navigation={navigation}
                            data={data}
                            artworkMediumData={artworkMediumData}
                            setArtworkMediumName={setArtworkMediumName}
                            mediumSelected={mediumSelected}
                            setMediumSelected={setMediumSelected}
                        />
                        :
                        listSelected === 2 ?
                            <Artist
                                navigation={navigation}
                                data={data1}
                                artistNameSelected={artistNameSelected}
                                setArtistNameSelected={setArtistNameSelected}
                                setArtistName={setArtistName}

                            />
                            :

                            <ArtworkCollection navigation={navigation} data={data2} />
                }



            </SafeAreaView>

        </ImageBackground>


    )
}

export default Home

const styles = StyleSheet.create({
    container: { flex: 1, },
    bgImg: { flex: 1, height: '100%', },


    listContainer: {
        borderRadius: 20, height: 38, alignItems: 'center', justifyContent: 'center'
    },
    headerContainer: { ...style.flexRowSpace, paddingHorizontal: 20 },
    icon: { width: scaleWidth(20), height: scaleHeight(20) },
    header: { ...style.flexRow, flex: 1 }
})