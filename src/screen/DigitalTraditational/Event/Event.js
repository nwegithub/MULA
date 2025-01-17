import React, { useContext, useState } from "react";
import {
    View, Text, SafeAreaView, StyleSheet, TouchableOpacity, FlatList, Image, Dimensions,
    ImageBackground, Platform, ScrollView
} from "react-native";
import { Context } from "../../../component/Context";
import { colors, fonts } from "../../../constant/theme";
import icons from "../../../constant/icons";
import { style } from "../../../constant/style";
import LinearGradient from "react-native-linear-gradient";
import { scaleWidth, scaleHeight } from "../../../utils/responsive";
import { GET_EVENT } from "../../../graphql/queries";
import { useQuery } from "@apollo/client";
import Loading from "../../../component/Loading";
 
const width = Dimensions.get('screen').width
const height = Dimensions.get('screen').height
const imgWidth = width * 0.8

const Event = ({ navigation }) => {

    const { digital, language,langData } = useContext(Context)

   
     
     const curDate = new Date()
    const currentDate= curDate.toISOString().split('T')[0]

    
    const initialDate = new Date();
    const sevenDaysLater = new Date(initialDate);
    sevenDaysLater.setDate(initialDate.getDate() + 7);
    const sevenDaysLaterData = sevenDaysLater.toISOString().split('T')[0]

    const {data} = useQuery(GET_EVENT,{variables:{
        currDate:currentDate,
    },
    fetchPolicy:'network-only'
})


    const [listSelected, setListSelected] = useState(1)
    const list = [
        {
            id: 1,
            eng: "Current Events",
            mm: "လက်ရှိပွဲများ"
        },
        {
            id: 2,
            eng: "Upcoming Events",
            mm: "လာမည့်ပွဲများ"
        },
        {
            id:3,
            eng:"Past Events",
            mm:"ပြီးခဲ့သည့်ပွဲများ"
        }

    ]
    
    if(!data){
        return <Loading/>
    }


    return (
        <SafeAreaView style={[styles.container, { backgroundColor: digital ? colors.darkBlack : colors.white }]}>

            <View style={{ ...style.center,}}>
                <Image source={digital ? icons.digital_mula_logo_name : icons.mula_logo_name} style={{ width: 100, height: 50 }} />
            </View>

            <View style={{}}>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ justifyContent: 'space-between', paddingBottom:20,paddingLeft:20 }}
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
                                                style={[styles.digitalContainer,{width:language === 'mm' ? scaleWidth(130) : scaleWidth(145)}]}
                                            >
                                                <TouchableOpacity
                                                    key={item.id}
                                                    onPress={() => setListSelected(item.id)}
                                                    style={{
                                                        backgroundColor: listSelected !== item.id ? colors.darkBlack : null, width: listSelected !== item.id ? '98%' : null,

                                                         borderRadius: 8, justifyContent: 'center',height:'96%',paddingHorizontal:language === 'mm' ? 16 :16
                                                    }}
                                                >

                                                    <Text style={{
                                                        ...fonts.LT_body4, color: colors.lightWhite,
                                                        textAlign: 'center', lineHeight: Platform.OS === 'ios' ? 0 : scaleHeight(20)
                                                    }}>{language === 'mm'  ? item.mm : item.eng}</Text>
                                                </TouchableOpacity>
                                            </LinearGradient>



                                            :


                                            <TouchableOpacity
                                                key={item.id}
                    
                                                onPress={() => setListSelected(item.id)}
                                                style={[styles.listContainer, {
                                                    backgroundColor: listSelected === item.id ? colors.primary : colors.lightWhite,
                                                    borderWidth: 1, borderColor: listSelected === item.id ? colors.lightWhite : colors.primary,
                                                }]}
                                            >

                                                <Text style={{
                                                    ...fonts.LT_body4, color: listSelected === item.id ? colors.lightWhite : colors.primary,
                                                    textAlign: 'center', lineHeight: Platform.OS === 'ios' ? 0 : scaleHeight(20)
                                                }}>{language === 'mm'  ? item.mm : item.eng}</Text>
                                            </TouchableOpacity>



                                    }
                                </>
                            )
                        })
                    }
                </ScrollView>

            </View>

            

            {digital ?
                <FlatList
                    showsHorizontalScrollIndicator={false}
                    horizontal
                    data={listSelected == 1 ? data?.currentEvent : 
                        listSelected == 2? data?.upcomingEvent : data?.pastEvent}
                    renderItem={({ item, index }) => {
                        return (
                            <View key={index}>
                                <TouchableOpacity
                                    onPress={() => navigation.navigate('EventDetail', {
                                        EventItem: item
                                    })}
                                    style={[styles.imgContainer,{height:'70%',}]}
                                >

                                    <Image source={{uri: item.event_thumbnail_url}}

                                        resizeMode="cover"
                                        style={{ borderRadius: 20, width: '100%', height: '100%' }} />
                                    <View style={styles.gradientContainer}>
                                    <LinearGradient
                                        style={styles.rectangleLineargradient}
                                        locations={[0, 1]}
                                        colors={['rgba(0, 0, 0, 0)', colors.darkBlack]}
                                        useAngle={true} angle={180} >
                                        <View style={styles.content2}>
                                            <Text style={{ ...fonts.PT_h2, color: colors.lightWhite }}>
                                            {language === 'mm'  ? item.event_name_mm : item.event_name}</Text>
                                            <Text style={{ ...fonts.LT_body4, color: colors.lightWhite }}>
                                                {new Date(item.event_start_date).toDateString()} - {new Date(item.event_end_date).toDateString()}
                                            </Text>

                                         </View>
                                    </LinearGradient>
                                    </View>

                                    </TouchableOpacity>

                            </View>
                        )
                    }}
                    contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 20,paddingLeft:scaleWidth(40) }}
                    ListEmptyComponent={
                        <View style={styles.listEmptyContainer}>
                            <Image source={icons.digital_noEvent} style={styles.listEmptyImage}/>
                            <Text style={[styles.listEmptyText,{color:colors.lightWhite}]}>{language === 'mm' ? "ပွဲအစီအစဉ်များ အကြောင်းကို ဤနေရာတွင် ဖော်ပြပေးသွားပါမည်။" : "Stay Tuned for Upcoming Event"}</Text>
                        </View>
                    }
                />
                :

                <FlatList
                    showsHorizontalScrollIndicator={false}
                    horizontal
                    data={listSelected == 1 ? data?.currentEvent : 
                        listSelected == 2? data?.upcomingEvent : data?.pastEvent}
                    contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 20,paddingLeft:scaleWidth(40) }}
                    renderItem={({ item, index }) => {
                        return (
                           
                            <View key={index}>
                                <TouchableOpacity
                                    onPress={() => navigation.navigate('EventDetail', {
                                        EventItem: item
                                    })}
                                    style={[styles.imgContainer,{}]}
                                >

                                    <Image source={{ uri: item.event_thumbnail_url
 }}

                                        resizeMode="contain"
                                        style={{ borderRadius: 20, width: '100%', height: '100%' }} />



                                </TouchableOpacity>

                                <View style={styles.content2}>
                                    <Text style={{ ...fonts.PT_h1, color: digital ? colors.lightWhite : colors.primary,
                                    textAlign:'center' }}>
                                        {language === 'mm'  ? item.event_name_mm : item.event_name}</Text>
                                    <Text style={{ ...fonts.PT_h1, marginTop: 10, color: digital ? colors.lightWhite : colors.primary,
                                    textAlign:'center' }}>{new Date(item.event_start_date).toDateString()} - {new Date(item.event_end_date).toDateString()}</Text>
                                </View>

                            </View>
                        )
                    }}
                    ListEmptyComponent={
                        <View style={styles.listEmptyContainer}>
                            <Image source={icons.tradi_noEvent} style={styles.listEmptyImage}/>
                            <Text style={styles.listEmptyText}>{language === 'mm' ? "ပွဲအစီအစဉ်များ အကြောင်းကို ဤနေရာတွင် ဖော်ပြပေးသွားပါမည်။" : "Stay Tuned for Upcoming Event"}</Text>
                        </View>
                    }
                />
            }





        </SafeAreaView>
    )
}
export default Event

const styles = StyleSheet.create({
    container: { flex: 1 },
    content: { paddingHorizontal: 20 },
    content1: { ...style.flexRowSpace, margin: 10 },
    btn: { marginVertical: 20, borderRadius: 20, paddingVertical: 10, paddingHorizontal: 10 },
    btnText: { color: colors.lightWhite, ...fonts.LT_body2, lineHeight: Platform.OS == 'ios' ? 0 : scaleHeight(25) },
    imgContainer: { width: imgWidth, height: '60%', borderRadius: 20, margin: 7, },
    content2: { margin: 10, ...style.center,width:imgWidth },
    
    listContainer: {
        borderRadius: 20,height:38,...style.center,paddingHorizontal:16,marginRight:10,
    },
    digitalContainer:{
        height: 38,
        borderRadius: 8, ...style.center,marginRight:15,
    },
    listEmptyContainer:{...style.center},
    listEmptyImage:{width:width-40,height:200,marginBottom:20},
    listEmptyText:{...fonts.LT_body2,color:colors.gray,marginBottom:80,textAlign:'center',maxWidth:260},
    gradientContainer: { position: 'absolute', left: 0, right: 0, bottom: 0 },

})