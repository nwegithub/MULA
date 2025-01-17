import React, { useContext, useRef, useState, useEffect } from "react"
import {
    View, Text, SafeAreaView, StyleSheet, Dimensions, TouchableWithoutFeedback,
    ActivityIndicator, Platform, TouchableOpacity, Image, ScrollView, Alert, BackHandler
} from "react-native"
import { useFocusEffect } from '@react-navigation/native';
import Video from "react-native-video"
import { Context } from "../../../component/Context"
import { scaleHeight, scaleWidth } from "../../../utils/responsive"
import { style } from "../../../constant/style"
import { fonts, colors } from "../../../constant/theme"
import icons from "../../../constant/icons"
import { useQuery, useMutation } from "@apollo/client"
import { GET_VIDEO_BY_ID, GET_CREATOR_FOLLOW } from "../../../graphql/queries"
import { VIDEO_CREATOR_FOLLOW, VIDEO_CREATOR_UNFOLLOW, VIDEO_VIEW_COUNT } from "../../../graphql/mutations"
import Loading from "../../../component/Loading"
import VideoControl from "./Component/VideoControl"
import Orientation from "react-native-orientation-locker"
import RenderHTML, { defaultSystemFonts } from "react-native-render-html";
import LinearGradient from "react-native-linear-gradient"
import AlertBox from "../../../component/AlertBox";

const width = Dimensions.get('screen').width

const VideoDetail = ({ route, navigation }) => {
    const videoRef = useRef()
    const { theme, digital, language, user } = useContext(Context)
    const { videoId } = route.params

    const [showControl, setShowControl] = useState(false)
    const [vdoLoading, setVdoLoading] = useState(false)
    const [pause, setPause] = useState(false)
    const [fullScreen, setFullScreen] = useState(false)
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [viewCounted, setViewCounted] = useState(false); 
    const [modal,setModal] = useState(false)
    const [title,setTitle] = useState("")
    const [myaTitle,setMyaTitle] = useState("")



    const { data } = useQuery(GET_VIDEO_BY_ID, { variables: { videoId: videoId }, fetchPolicy: "network-only" })

    const creatorId = data?.videos_by_pk.videos_creator.id


    const { data: creatorFollowData } = useQuery(GET_CREATOR_FOLLOW, {
        variables: {
            isTraditional: !digital,
            userId: user && user.id,
            videoCreatorId: creatorId
        }
    })

    const [videoCreatorFollow] = useMutation(VIDEO_CREATOR_FOLLOW, { refetchQueries: [GET_VIDEO_BY_ID, GET_CREATOR_FOLLOW] })
    const [videoCreatorUnFollow] = useMutation(VIDEO_CREATOR_UNFOLLOW, { refetchQueries: [GET_VIDEO_BY_ID, GET_CREATOR_FOLLOW] })
    const [videoViewCount] = useMutation(VIDEO_VIEW_COUNT, { refetchQueries: [GET_VIDEO_BY_ID] })

    const systemFonts = [...defaultSystemFonts, 'Lato-Regular',]


    useEffect(() => {
        if (fullScreen) {
            Orientation.lockToLandscape();
        } else {
            Orientation.lockToPortrait();
        }
        return () => Orientation.lockToPortrait();
    }, [fullScreen]);


 

    const handleOnLoad = (data) => {
        setVdoLoading(false);
        setDuration(data.duration);
    };

    const handleOnSeek = (value) => {
        setCurrentTime(value);
        videoRef.current.seek(value);
    };



    const handleCreatorFollow = async () => {

        await videoCreatorFollow({
            variables: {
                userId: user.id,
                videoCreatorId: creatorId,
                isTraditional: !digital
            }
        })
        setModal(true)
        setTitle("Followed")
        setMyaTitle("ဖောလိုးခဲ့ပြီးပါပြီ")

    }


    const handleCreatorunFollow = async () => {
        await videoCreatorUnFollow({
            variables: {
                userId: user.id,
                videoCreatorId: creatorId,
                isTraditional: !digital
            }
        })
        setModal(true)
        setTitle("Unfollowed")
        setMyaTitle("အန်ဖောလိုးခဲ့ပြီပါပြီး")
    }

    const viewDuration = parseInt(currentTime + 2)

    const handleVideoViewCount = async () => {
        try {
            const { data } = await videoViewCount({
                variables: {
                    userId: user.id,
                    videoId: videoId,
                    isTraditional: !digital,
                    duration: viewDuration,
                }
            });
            
        } catch (error) {
            console.error('Error executing mutation:', error);
        }
        setViewCounted(true)
    };
    

    const skipForward = () => {
        if (currentTime < duration) {
            let skipTime = currentTime + 10
            setCurrentTime(skipTime)
            videoRef.current.seek(skipTime)
        }

    }

    const skipBackward = () => {
        if (currentTime > 0) {
            let skipTime = currentTime - 10
            setCurrentTime(skipTime)
            videoRef.current.seek(skipTime)
        } else {
            setCurrentTime(0)
        }

    }
 
    const handleReplay = async () => {
        setViewCounted(false)
        if (videoRef.current) {
            videoRef.current.seek(0); // Reset video to the start
            setPause(false); // Resume playback
            
            
            if (user && !viewCounted) {
                await handleVideoViewCount();
            }
        }
    };
    
    

    if (!data) {
        return <Loading />
    }


    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.bgColor }]}>
            <TouchableWithoutFeedback
                onPress={() => setShowControl(!showControl)}
            >
                <View>
                    <Video
                        ref={videoRef}
                        source={{ uri: data.videos_by_pk.video_url }}
                        controls={false}
                        autoplay={true}
                        paused={pause}
                        onLoadStart={() => setVdoLoading(true)}
                        onLoad={handleOnLoad}
                        onProgress={data => {
                            setCurrentTime(data.currentTime);

                            if (user && !viewCounted && data.currentTime >= duration / 2) {
                                handleVideoViewCount();
                            }
                        }}
                        onError={(e) => {
                            alert("cannot play video");
                            console.log("e", e);
                        }}
                        fullscreen={Platform.OS === "android" ? fullScreen : false}
                        onEnd={() => {
                            setFullScreen(false);
                        }}
                        poster={data.videos_by_pk.thumbnail_image_url}
                        posterResizeMode="cover"
                        resizeMode="contain"
                        style={{
                            width: "100%",
                            height: fullScreen ? "100%" : 250,
                            backgroundColor: "#000",
                        }}
                    />
                    {
                        showControl &&
                        <VideoControl
                            pause={pause} setPause={setPause}
                            fullScreen={fullScreen} setFullScreen={setFullScreen}
                            currentTime={currentTime} setCurrentTime={setCurrentTime}
                            duration={duration} setDuration={setDuration}
                            handleOnSeek={handleOnSeek}
                            skipForward={skipForward}
                            skipBackward={skipBackward}
                            handleReplay={handleReplay}
                        />

                    }

                    {
                        vdoLoading &&
                        <View style={styles.loadingContainer}>
                            <ActivityIndicator color='#fff' size='large' />
                        </View>
                    }
                    {
                        !fullScreen &&
                        <TouchableOpacity
                            onPress={() => {
                                navigation.goBack()
                            }}
                            style={[styles.backContainer, {
                                
                            }]}>
                            <Image source={icons.digital_back_arrow}
                                resizeMode="contain"
                                style={[styles.icon,{tintColor: digital ? 'red' : colors.primary}]} />
                        </TouchableOpacity>
                    }

                </View>

            </TouchableWithoutFeedback>
            {
                !fullScreen &&
                <ScrollView 
                
                contentContainerStyle={styles.content}>

                    <Text style={[styles.title, {
                        color: theme.mainColor,
                    }]}>{language === 'mm' ? data.videos_by_pk.video_name_mm :
                        data.videos_by_pk.video_name}</Text>
                    <Text style={{ ...fonts.LT_body6, color:theme.secColor }}>{data.videos_by_pk.video_views_aggregate.aggregate.sum.view_count ?? 0} 
                    {(data.videos_by_pk.video_views_aggregate.aggregate.sum.view_count ?? 0) <= 1 ? " view" : " views"}
                    </Text>

                    <View style={{ ...style.flexRowSpace, paddingVertical: 20 }}>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Video List By Creater', { createrId: data.videos_by_pk.videos_creator.id })}
                            style={{ ...style.flexRow, width: '80%' }}>
                            <Image source={{ uri: data.videos_by_pk.videos_creator.image_url }} style={styles.profile} />
                            <View style={{ paddingLeft: 10 }}>
                                <Text style={{ ...fonts.PT_h3, color: theme.mainColor, textDecorationLine: 'underline' }}>{data.videos_by_pk.videos_creator.name}
                                </Text>
                                <Text style={{ ...fonts.LT_body4, color:theme.secColor }}>{
                                    creatorFollowData?.video_creator_follow.length !== 0 ?
                                        creatorFollowData?.video_creator_follow[0].follow_count
                                        :
                                        '0'
                                } followers</Text>
                            </View>
                        </TouchableOpacity>

                        {
                            digital ?
                                <TouchableOpacity
                                    style={styles.followBtn}

                                    onPress={() => {
                                        user ?
                                            (
                                                creatorFollowData?.video_creator_follow.length !== 0 ?
                                                    handleCreatorunFollow()

                                                    :
                                                    handleCreatorFollow()

                                            )
                                            :
                                            (navigation.navigate("Sign In", {
                                                redirectTo: "BACK"
                                            }))

                                    }}                                >
                                    <LinearGradient
                                        colors={colors.linearBtn}
                                        start={{ x: 0, y: 1 }}
                                        end={{ x: 1, y: 0 }}
                                        style={{ width: '100%', height: 30, borderRadius: 16, ...style.center, }}
                                    >
                                        <Text style={{ ...fonts.LT_body4, color: colors.lightWhite }}>
                                            {creatorFollowData?.video_creator_follow.length !== 0 ? "Followed" : "Follow"}

                                        </Text>

                                    </LinearGradient>
                                </TouchableOpacity>

                                :
                                <TouchableOpacity
                                    onPress={() => {
                                        user ?
                                            (
                                                creatorFollowData?.video_creator_follow.length !== 0 ?
                                                    handleCreatorunFollow()

                                                    :
                                                    handleCreatorFollow()

                                            )
                                            :
                                            (navigation.navigate("Sign In", {
                                                redirectTo: "BACK"
                                            }))

                                    }}

                                    style={styles.followBtn}
                                >

                                    <Text style={{ color: colors.lightWhite, ...fonts.LT_body4, lineHeight: 25 }}>
                                        {creatorFollowData?.video_creator_follow.length !== 0 ? "Followed" : "Follow"}
                                    </Text>


                                </TouchableOpacity>
                        }

                    </View>


                    <RenderHTML
                        contentWidth={width}
                        source={{
                            html:
                                language === 'mm' ? data.videos_by_pk.description_mm : data.videos_by_pk.description_en

                        }}
                        tagsStyles={{
                            body: {
                                color: theme.secColor, fontSize: language === 'mm' ? scaleWidth(12) : scaleWidth(14), fontFamily: 'Lato-Regular',
                                lineHeight: Platform.OS === 'ios' ? 0 : 25,textAlign:'justify'

                            },
                            p: { margin: 0, padding: 0 }
                        }}
                        systemFonts={systemFonts}
                    />


                </ScrollView>
            }

            <AlertBox title={title} myaTitle={myaTitle} modal={modal} setModal={setModal}/>


        </SafeAreaView>
    )
}
export default VideoDetail

const styles = StyleSheet.create({
    container: { flex: 1, },
    video: { width: '100%', height: '100%', },
    loadingContainer: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        ...fonts.LT_body2,
    },
    description: {
        ...fonts.LT_body4, marginTop: 10

    },
    content: {
        paddingHorizontal: 20, paddingVertical: 10,
    },
    backContainer: {
        position: 'absolute',
        left: 15, top: 15, width: 50, height: 50,
        borderRadius: 50, ...style.center


    },
    icon: { width: scaleWidth(20), height: scaleHeight(20) },
    profile: { width: 45, height: 45, borderRadius: 100 },
    followBtn: { width: 80, marginVertical: 10, ...style.center, backgroundColor: colors.primary, borderRadius: 20 }
})