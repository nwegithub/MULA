import React, { useContext, useState } from "react"
import {
    View,
    Text,
    SafeAreaView,
    StyleSheet,
    Image,
    Dimensions,
    TouchableOpacity,
    ScrollView,
    Platform
} from "react-native"
import { Context } from "../../../component/Context"
import { scaleHeight, scaleWidth } from "../../../utils/responsive"
import { style } from "../../../constant/style"
import { fonts, colors } from "../../../constant/theme"
import icons from "../../../constant/icons"
import { GET_ARTICLE_BY_ID } from "../../../graphql/queries"
import { useQuery } from "@apollo/client"
import Loading from "../../../component/Loading"
import RenderHTML, { defaultSystemFonts } from "react-native-render-html";
import { useFocusEffect } from '@react-navigation/native';


const width = Dimensions.get('window').width

const ArticleDetail = ({ navigation, route }) => {
    const { theme, digital, language } = useContext(Context)
    const { articleId, articles, currentIndex } = route.params

    const [contentHeight, setContentHeight] = useState(0);
    const screenHeight = Dimensions.get('window').height;

    const handleContentSizeChange = (width, height) => {
        setContentHeight(height);
    };

    const { data } = useQuery(GET_ARTICLE_BY_ID, {
        variables: {
            articleId: articleId
        }, fetchPolicy: 'network-only'
    })


    const systemFonts = [...defaultSystemFonts, 'Lato-Regular',]



    const handleNextPress = () => {
        if (currentIndex < articles.length - 1) {
            const nextIndex = currentIndex + 1;
            const nextArticle = articles[nextIndex];
            navigation.navigate('Article Detail', {
                articleId: nextArticle.id,
                articles,
                currentIndex: nextIndex,
            });
        }
    };


    const handlePreviousPress = () => {
        if (currentIndex > 0) {
            const previousIndex = currentIndex - 1;
            const previousArticle = articles[previousIndex];
            navigation.navigate('Article Detail', {
                articleId: previousArticle.id,
                articles,
                currentIndex: previousIndex,
            });
        }
    };


    if (!data) {
        return <Loading />
    }

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.bgColor }]}>
            <ScrollView
                contentContainerStyle={styles.container}
                onContentSizeChange={handleContentSizeChange}
                scrollEnabled={contentHeight > screenHeight}
            >


                <View style={styles.imgContainer}>
                    <Image source={{ uri: data.articles_by_pk.image_url }} resizeMode="cover" style={styles.img} />
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={{ position: 'absolute', top: 15, left: 10, width: 50, height: 50, borderRadius: 50, backgroundColor: colors.white, ...style.center }}
                    >
                        <Image source={icons.digital_back_arrow} style={{
                            width: 25, height: 25, tintColor:
                                digital ? null : colors.primary
                        }} resizeMode="contain" />
                    </TouchableOpacity>
                </View>

                <View style={styles.content}>
                    <Text style={[styles.title, { color: theme.mainColor, lineHeight: 25 }]}>
                        {language === 'mm' ? data.articles_by_pk.name_mm : data.articles_by_pk.name}</Text>

                    <View style={styles.dateTimeContainer}>
                        <View style={styles.dateTimeContent}>
                            <Image source={icons.digital_time} style={[styles.icon, { tintColor: digital ? null : colors.black }]} />
                            <Text style={[styles.dateTimeTxt, { color: theme.secColor }]}>{data.articles_by_pk.duration_time} min</Text>
                        </View>
                        <View style={styles.dateTimeContent}>
                            <Image source={icons.digital_calendar} style={[styles.icon, { tintColor: digital ? null : colors.black }]} />
                            <Text style={[styles.dateTimeTxt, { color: theme.secColor }]}>{new Date(data.articles_by_pk.created_at).toLocaleDateString()}</Text>
                        </View>
                    </View>

                    <RenderHTML
                        contentWidth={width}
                        source={{
                            html:
                                language === 'mm' ? data.articles_by_pk.description_1_mm : data.articles_by_pk.description_1

                        }}
                        tagsStyles={{
                            body: {
                                color: theme.secColor, fontSize: 14, fontFamily: 'Lato-Regular',
                                lineHeight: 25, textAlign: 'justify'

                            },
                            p: { margin: 0, padding: 0 }
                        }}
                        systemFonts={systemFonts}
                    />
                    <View>
                        {data.articles_by_pk.image_url_1 ? (
                            <Image
                                source={{ uri: data.articles_by_pk.image_url_1 }}
                                resizeMode="cover"
                                style={styles.bodyImage}
                            />
                        ) : null}
                    </View>
                    <RenderHTML
                        contentWidth={width}
                        source={{
                            html:
                                language === 'mm' ? data.articles_by_pk.description_2_mm : data.articles_by_pk.description_2

                        }}
                        tagsStyles={{
                            body: {
                                color: theme.secColor, fontSize: 14, fontFamily: 'Lato-Regular',
                                lineHeight: 25, textAlign: 'justify'

                            },
                            p: { margin: 0, padding: 0 }
                        }}
                        systemFonts={systemFonts}
                    />
                    <View>
                        {data.articles_by_pk.image_url_2 ? (
                            <Image
                                source={{ uri: data.articles_by_pk.image_url_2 }}
                                resizeMode="cover"
                                style={styles.bodyImage}
                            />
                        ) : null}
                    </View>
                    <RenderHTML
                        contentWidth={width}
                        source={{
                            html:
                                language === 'mm' ? data.articles_by_pk.description_3_mm : data.articles_by_pk.description_3

                        }}
                        tagsStyles={{
                            body: {
                                color: theme.secColor, fontSize: 14, fontFamily: 'Lato-Regular',
                                lineHeight: 25, textAlign: 'justify'

                            },
                            p: { margin: 0, padding: 0 }
                        }}
                        systemFonts={systemFonts}
                    />

                </View>
                <View style={{ display: 'flex', ...style.flexRowSpace, padding: 16 }}>
                    <TouchableOpacity
                        onPress={handlePreviousPress}
                        style={{ ...style.flexRow }}>
                        <Image source={icons.digital_back_arrow} style={[styles.icon, { tintColor: digital ? null : colors.primary }]} />
                        <Text style={{ ...fonts.LT_body4, color: theme.mainColor }}>Prev</Text>

                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={handleNextPress}
                        style={{ ...style.flexRow }}>
                        <Text style={{ ...fonts.LT_body4, color: theme.mainColor }}>Next</Text>
                        <Image source={icons.digital_forward_arrow} style={[styles.icon, { tintColor: digital ? null : colors.primary }]} />

                    </TouchableOpacity>

                </View>


            </ScrollView>



        </SafeAreaView>
    )
}
export default ArticleDetail

const styles = StyleSheet.create({
    container: { flexGrow: 1, },
    imgContainer: { width: width, height: scaleHeight(268) },
    img: { width: '100%', height: '100%' },
    content: { paddingHorizontal: 20, paddingVertical: 10, paddingBottom: 60, },
    dateTimeContainer: { ...style.flexRowSpace, paddingVertical: 10 },
    dateTimeTxt: { ...fonts.LT_body5, paddingLeft: 3 },
    dateTimeContent: { ...style.flexRow, },
    icon: { width: scaleWidth(16), height: scaleHeight(16), resizeMode: 'contain' },
    title: { ...fonts.LT_h2, paddingVertical: 10, textAlign: 'justify' },
    body: { ...fonts.LT_body4, paddingBottom: 10, lineHeight: 25 },
    backContainer: {
        position: 'absolute',
        left: 15, top: 15,
    },
    bodyImage: { width: '90%', height: scaleHeight(200), borderRadius: 10, alignSelf: 'center', marginVertical: 16 }
})