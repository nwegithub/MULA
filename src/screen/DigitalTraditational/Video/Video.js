import React, { useContext, useRef, useState, useEffect } from "react"
import {
    View, Text, SafeAreaView, StyleSheet, ImageBackground,
    FlatList, Image, TouchableOpacity, Platform, ScrollView
} from "react-native"
import { fonts, colors } from "../../../constant/theme"
import { style } from "../../../constant/style"
import { Context } from "../../../component/Context"
import images from "../../../constant/images"
import { scaleHeight, scaleWidth } from "../../../utils/responsive"
import icons from "../../../constant/icons"
import { GET_VIDEO_LIST, GET_VIDEO, GET_VIDEO_CATEGORY, GET_VIDEO_CREATER_BY_ID } from "../../../graphql/queries"
import { VIDEO_VIEW_COUNT } from "../../../graphql/mutations"
import { useQuery, useMutation } from "@apollo/client"
import Loading from "../../../component/Loading"
import CategoryFilter from "./Component/CategoryFilter"
import { useRoute } from '@react-navigation/native';

const Video = ({ navigation }) => {
    const { digital, theme, language } = useContext(Context)
    const route = useRoute();
    const categoryFilterData = route?.params?.categoryFilterData || null;
    const [categorySelected, setCategorySelected] = useState({
        name: "%%",
        name_mm: "%%",
    });


    useEffect(() => {
        if (categorySelected.name === "All" || categorySelected.name_mm === "အားလုံး") {
            setCategorySelected({ name: "%%", name_mm: "%%" })
        } else if (categorySelected !== "") {
            setCategorySelected(categorySelected)
        }
    }, [categorySelected])


    useEffect(() => {
        if (categoryFilterData) {
            setCategorySelected(categoryFilterData);
        }
    }, [categoryFilterData]);




    const { data: categoryData } = useQuery(GET_VIDEO_CATEGORY, {
        variables: { isTraditional: !digital },
        fetchPolicy: 'cache-and-network'
    })

    const { data: videoData, refetch } = useQuery(GET_VIDEO, {
        variables: {
            isTraditional: !digital,
            categoryName: categorySelected.name,
            categoryName_mm: categorySelected.name_mm
        },
        fetchPolicy: 'cache-and-network'
    })


    const newArr1 = [{ name: "All", name_mm: "အားလုံး" }]

    const newCategoryData = newArr1.concat(categoryData?.video_category)

    const handleVideoPress = async (item) => {

        navigation.navigate('Video Detail', { videoId: item.id })
    }


    function formatDuration(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds}`;
    }


    return (
        <ImageBackground
            source={digital ? images.digital_bg : images.tradi_bg
            }
            style={styles.bgImg}
        >


            <SafeAreaView style={styles.container}>





                <CategoryFilter
                    language={language}
                    navigation={navigation}
                    digital={digital}
                    data={newCategoryData}
                    categorySelected={categorySelected}
                    setCategorySelected={setCategorySelected}
                />


                <FlatList
                    data={videoData?.videos}
                    showsVerticalScrollIndicator={false}
                    refreshing={videoData?.networkStatus === 4}
                    onRefresh={async () => {
                        await refetch()
                    }}
                    renderItem={({ item, index }) => {

                        return (
                            <TouchableOpacity
                                onPress={() => handleVideoPress(item)}
                                key={index}
                                style={styles.boxContainer}>
                                <View style={{ width: 'auto', height: '70%' }}>
                                    <Image source={{ uri: item.thumbnail_image_url }}
                                        style={styles.img}

                                    />
                                    <View style={styles.playContainer}>
                                        <Image source={icons.play} style={styles.play} />
                                    </View>

                                    <View style={styles.minuteDuration}>
                                        <Text style={{ ...fonts.LT_body5, color: colors.lightWhite }}>{formatDuration(item.duration_minute)}</Text>
                                    </View>

                                </View>
                                <View
                                    style={{ ...style.flexRow, height: '30%', paddingHorizontal: 20, }}
                                >
                                    <TouchableOpacity
                                        onPress={() => navigation.navigate('Video List By Creater', { createrId: item.videos_creator.id })}
                                        style={{ borderRadius: 50, }}>
                                        <Image source={{ uri: item.videos_creator.image_url }} style={{ width: 45, height: 45, borderRadius: 50 }} />
                                    </TouchableOpacity>
                                    <View style={{ paddingLeft: 10 }}>
                                        <Text style={{ ...fonts.PT_h2, color: theme.mainColor }}>{language === 'mm' ? item.video_name_mm : item.video_name}</Text>
                                        <Text style={{ ...fonts.PT_h4, color: theme.secColor }}>{item.videos_creator.name }{" "}
                                            {( item.video_views_aggregate.aggregate.sum.view_count ?? 0) <= 1
                                                ? `${item.video_views_aggregate.aggregate.sum.view_count ?? 0} view`
                                                : `${item.video_views_aggregate.aggregate.sum.view_count} views`}

                                        </Text>
                                    </View>
                                </View>

                            </TouchableOpacity>
                        )
                    }}
                    contentContainerStyle={{ paddingBottom: 90, }}
                />
            </SafeAreaView>
        </ImageBackground>
    )
}
export default Video

const styles = StyleSheet.create({
    container: { flex: 1 },
    bgImg: { flex: 1, height: '100%' },
    img: { width: '100%', height: '100%', },
    boxContainer: { height: scaleHeight(300), },
    title: { ...fonts.LT_h2, },
    playContainer: { position: 'absolute', left: 0, right: 0, bottom: 0, top: 0, ...style.center },
    play: { width: scaleWidth(30), height: scaleHeight(30) },

    txt: { color: colors.lightWhite, ...fonts.LT_body1 },

    listContainer: {
        borderRadius: 15, height: 38, alignItems: 'center', justifyContent: 'center'
    },
    headerContainer: { ...style.flexRowSpace, paddingHorizontal: 20, marginTop: 5 },
    icon: { width: scaleWidth(20), height: scaleHeight(20) },
    header: { ...style.flexRow, flex: 1 },
    minuteDuration: {
        position: 'absolute', right: 15, bottom: 15, ...style.center, backgroundColor: 'background: rgba(0, 0, 0, 0.6)',
        paddingHorizontal: 10, paddingVertical: 5, borderRadius: 5
    }
})