import React, { useContext, useRef, useState } from "react"
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
import { GET_VIDEO_LIST, GET_VIDEO,GET_VIDEO_CREATER_BY_ID} from "../../../graphql/queries"
import { useQuery } from "@apollo/client"
import Loading from "../../../component/Loading"
import BackHeaderComponent from "../../../component/BackHeaderComponent"

const VideoListByCreater = ({ navigation,route }) => {
    const { digital, theme, language } = useContext(Context)
    const { createrId } = route.params
    const {data:createrData} = useQuery(GET_VIDEO_CREATER_BY_ID,{
        variables:{ createrId: createrId },
        fetchPolicy:"cache-and-network"
    })
 

    if (! createrData) {
        return <Loading />
    }

    console.log("creater",createrData)

    return (
        <ImageBackground
            source={digital ? images.digital_bg : images.tradi_bg
            }
            style={styles.bgImg}
        >


            <SafeAreaView style={styles.container}>
            <BackHeaderComponent navigation={navigation}/>



                <View
                    style={{ ...style.flexRow, padding: 20, }}
                >
                    <View style={{ borderRadius: 50, }}>
                        <Image source={{ uri: createrData?.video_creator_by_pk.image_url }} style={{ width: 45, height: 45, borderRadius: 50 }} />
                    </View>
                    <View style={{ paddingLeft: 10 }}>
                        <Text style={{ ...fonts.PT_h4, color: theme.mainColor }}>{createrData?.video_creator_by_pk.name} </Text>
                        <Text style={{ ...fonts.PT_h4, color: colors.gray }}>{createrData?.video_creator_by_pk.creator_videos_aggregate.aggregate.count} {
                            createrData?.video_creator_by_pk.creator_videos_aggregate.aggregate.count === 0 || 1 ? "video" : "videos"}</Text>

                    </View>
                </View>


                <FlatList
                    data={createrData?.video_creator_by_pk.creator_videos}
                    showsVerticalScrollIndicator={false}
                    refreshing={createrData.networkStatus === 4}
                    onRefresh={async () => {
                        await refetch()
                    }}
                    renderItem={({ item, index }) => {

                        return (
                            <TouchableOpacity
                                onPress={() => navigation.navigate('Video Detail', { videoId: item.id })}
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
                                        <Text style={{ ...fonts.LT_body5, color: colors.lightWhite }}>{item.duration_minute}</Text>
                                    </View>

                                </View>
                                <View
                                    style={{ ...style.flexRow, height: '30%', paddingHorizontal: 20, }}
                                >
                                   
                                    <View style={{ paddingLeft: 10 }}>
                                        <Text style={{ ...fonts.PT_h2, color: theme.mainColor }}>{language === 'mm' ? item.video_name_mm : item.video_name}</Text>
                                        <Text style={{ ...fonts.PT_h4, color: colors.gray }}> 
                                        {(item.video_views_aggregate.aggregate.max.view_count ?? 0)} {(item.video_views_aggregate.aggregate.max.view_count ?? 0) <= 1 ? "view" : "views"}
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
export default VideoListByCreater

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
        borderRadius: 20, height: 38, alignItems: 'center', justifyContent: 'center'
    },

    minuteDuration: {
        position: 'absolute', right: 15, bottom: 15, ...style.center, backgroundColor: 'background: rgba(0, 0, 0, 0.6)',
        paddingHorizontal: 10, paddingVertical: 5, borderRadius: 5
    }
})