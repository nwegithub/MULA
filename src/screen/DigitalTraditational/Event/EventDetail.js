import React, { useContext } from "react";
import {
    View,
    Text,
    SafeAreaView,
    StyleSheet,
    Image,
    Dimensions,
    TouchableOpacity,
    ScrollView,
    Linking,
    Platform
} from "react-native";
import { colors, fonts } from "../../../constant/theme";
import { Context } from "../../../component/Context";
import { style } from "../../../constant/style";
import icons from "../../../constant/icons";
import { WebView } from 'react-native-webview';
import LinearGradient from "react-native-linear-gradient";
import {scaleHeight, scaleWidth} from "../../../utils/responsive";
import RenderHTML, {defaultSystemFonts} from "react-native-render-html";

const width = Dimensions.get('screen').width

const EventDetail = ({ navigation, route }) => {

    const { digital, language, langData,theme } = useContext(Context)

    const { EventItem } = route.params

    const [startHour, startMinute] = EventItem.event_start_time.split(':')
    const [endHour, endMinute] = EventItem.event_end_time.split(':')


    const systemFonts = [...defaultSystemFonts, 'Lato-Regular',]


    return (
        <SafeAreaView style={[styles.container, { backgroundColor: digital ? colors.darkBlack : colors.white }]}>

                <View style={[styles.imgContainer,{height: digital? scaleHeight(380): scaleHeight(300)}]}>

                    <Image source={{ uri: EventItem.event_thumbnail_url }}
                           resizeMode="contain"
                           style={styles.img} />
                    {digital &&
                        <View style={styles.gradientContainer}>
                            <LinearGradient
                                style={styles.rectangleLineargradient}
                                locations={[0, 1]}
                                colors={['rgba(0, 0, 0, 0)', colors.darkBlack]}
                                useAngle={true} angle={180} >
                                <View style={{justifyContent:'flex-end',flex:1}}>
                                <Text style={{ ...fonts.LT_h2, color: digital ? colors.lightWhite : colors.primary }}>
                                    {language === 'mm' ? EventItem.event_name_mm : EventItem.event_name}</Text>
                                <View style={{ }}>
                                    <View style={styles.content1}>
                                        <Image source={icons.digital_calendar} resizeMode="contain"
                                            style={[styles.icon, { tintColor: digital ? null : colors.primary }]} />
                                        <Text style={[styles.time, { color: digital ? colors.lightWhite : colors.primary, }]}>
                                            {new Date(EventItem.event_start_date).toDateString()} - {new Date(EventItem.event_end_date).toDateString()}
                                        </Text>

                                    </View>
                                    <View style={{...style.flexRow,}}>
                                        <Image source={icons.digital_time} resizeMode="contain"
                                            style={[styles.icon, { tintColor: digital ? null : colors.primary }]} />
                                        <Text style={[styles.time, { color: digital ? colors.lightWhite : colors.primary, }]}>
                                            {startHour > 12 ? (startHour - 12 + ':' + startMinute) : (startHour + ':' + startMinute)}{startHour < 12 ? " AM" : " PM"}
                                            - {endHour > 12 ? (endHour - 12 + ':' + endMinute ): (startHour + ':' + endMinute)}{endHour < 12 ? "AM" : "PM"}</Text>
                                    </View>

                                </View>
                                </View>
                            </LinearGradient>
                        </View>

                    }

                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={{ position: 'absolute', top: 15, left: 10 }}
                    >
                        <Image source={icons.digital_back_arrow} style={{
                            width: 25, height: 25, tintColor:
                                digital ? null : colors.primary
                        }} resizeMode="contain" />
                    </TouchableOpacity>

                </View>
                <ScrollView
                showsVerticalScrollIndicator={false}
            >
                <View style={[styles.content, { backgroundColor: digital ? colors.darkBlack : colors.white, flex: 1 }]}>
                    {!digital &&
                        <>
                            <Text style={{ ...fonts.LT_h2, color: digital ? colors.lightWhite : colors.primary,lineHeight:Platform.OS
                            === 'ios'? 0 :25}}>
                                {language === 'mm' ? EventItem.event_name_mm : EventItem.event_name}</Text>
                            <View style={{}}>
                                <View style={styles.content1}>
                                    <Image source={icons.digital_calendar} resizeMode="contain"
                                        style={[styles.icon, { tintColor: digital ? null : colors.primary }]} />
                                    <Text style={[styles.time, { color: digital ? colors.lightWhite : colors.primary, }]}>
                                        {new Date(EventItem.event_start_date).toDateString()} - {new Date(EventItem.event_end_date).toDateString()}
                                    </Text>

                                </View>
                                <View style={{...style.flexRow,marginBottom:10,}}>
                                    <Image source={icons.digital_time} resizeMode="contain"
                                        style={[styles.icon, { tintColor: digital ? null : colors.primary }]} />
                                    <Text style={[styles.time, { color: digital ? colors.lightWhite : colors.primary, }]}>
                                        {startHour > 12 ? (startHour - 12 + ':' + startMinute) : (startHour + ':' + startMinute)}{startHour < 12 ? " AM" : " PM"}
                                        - {endHour > 12 ? (endHour - 12 + ':' + endMinute ): (startHour + ':' + endMinute)}{endHour < 12 ? "AM" : "PM"}</Text>
                                </View>
                            </View>

                        </>
                    }
                    <View style={[styles.content1, { marginTop: 0 }]}>
                        <Image source={icons.digital_location} resizeMode="contain"
                               style={[styles.icon, { tintColor: digital ? null : colors.primary }]} />
                        <Text style={[styles.time, { color: digital ? colors.lightWhite : colors.primary, }]}>
                            {language === 'mm' ? EventItem.event_location_mm : EventItem.event_location}
                        </Text>
                    </View>
                    <View style={{ marginTop: 5 }}>
                        <Text style={{ ...fonts.LT_body2, color: digital ? colors.lightWhite : colors.black }}>{langData.description}</Text>

                        <RenderHTML
                            contentWidth={width}
                            source={{
                                html:
                                    language === 'mm'? EventItem.event_description_mm : EventItem.event_description

                            }}
                            tagsStyles={{
                                body: {
                                    color: theme.secColor, fontSize: language === 'mm' ? scaleWidth(12) : scaleWidth(14), fontFamily: 'Lato-Regular',
                                    lineHeight: Platform.OS === 'ios' ? 0 : 25,

                                },
                                p: { margin: 0, padding: 0 }
                            }}
                            systemFonts={systemFonts}
                        />
                    </View>
                    <View style={{ width: '100%', height: 600, flex: 1, marginTop: 20 }}>
                        <Text style={{ color: digital ? colors.lightWhite : colors.black, ...fonts.LT_body2, marginBottom: 10 }}>{langData.location}</Text>
                    
                            
                        <WebView 
                        source={{ uri: 'https://www.google.com/maps/place/The+Secretariat+Yangon/@16.7754928,96.1655507,20.45z/data=!4m14!1m7!3m6!1s0x30c1ec885301a081:0xd45abd0dd139db8b!2sThe+Secretariat+Yangon!8m2!3d16.7753425!4d96.1657997!16s%2Fm%2F0cp00x7!3m5!1s0x30c1ec885301a081:0xd45abd0dd139db8b!8m2!3d16.7753425!4d96.1657997!16s%2Fm%2F0cp00x7?entry=ttu&g_ep=EgoyMDI0MTExMy4xIKXMDSoASAFQAw%3D%3D' }} 
                        style={{ flex: 1 }} />
                    </View>

                </View>


            </ScrollView>

        </SafeAreaView>
    )
}
export default EventDetail

const styles = StyleSheet.create({
    container: { flex: 1 },
    imgContainer: { width: width, },
    img: { width: '100%', height: '100%' },
    content: { padding: 20 },
    content1: { ...style.flexRow, marginVertical: 10 },
    icon: { width: scaleWidth(22), height: scaleHeight(22) },
    time: { ...fonts.LT_body4, marginLeft: 10,lineHeight:Platform.OS === 'ios'? 0 :25 },
    gradientContainer: { position: 'absolute', left: 0, right: 0, bottom: 0 },
    rectangleLineargradient: {
        flex: 1,
        width: "100%",
        height: 150,
        backgroundColor: "transparent",
        justifyContent: 'center', paddingLeft: 20
    }

})