import React, { useContext, useState, useEffect } from "react"
import {
    View,
    Text,
    SafeAreaView,
    StyleSheet,
    ImageBackground,
    FlatList,
    Image,
    TouchableOpacity,
    Platform, ScrollView
} from "react-native"
import { fonts, colors } from "../../../constant/theme"
import { style } from "../../../constant/style"
import { Context } from "../../../component/Context"
import images from "../../../constant/images"
import { scaleHeight, scaleWidth } from "../../../utils/responsive"
import icons from "../../../constant/icons"
import LinearGradient from "react-native-linear-gradient"
import { GET_ARTICLE, GET_ARTICLE_CATEGORY } from "../../../graphql/queries"
import { useQuery } from "@apollo/client"
import Loading from "../../../component/Loading"
import CategoryFilter from "./Component/CategoryFilter"
import { useRoute } from '@react-navigation/native';



const Article = ({ navigation }) => {
    const { digital, theme, language } = useContext(Context)
    const [categorySelected, setCategorySelected] = useState({ name: "%%", name_mm: "%%" })
    const route = useRoute();
    const articleFilterData = route?.params?.articleFilterData || null;


    const { data, refetch } = useQuery(GET_ARTICLE, {
        variables: {
            isTraditional: !digital,
            categoryName: categorySelected.name,
            categoryName_mm: categorySelected.name_mm
        },
        fetchPolicy: 'network-only'
    })
    const { data: articleCategory } = useQuery(GET_ARTICLE_CATEGORY, {
        variables: {
            isTraditional: !digital,
        },
        fetchPolicy: 'cache-and-network'
    })


    useEffect(() => {
        if (categorySelected.name === "All" || categorySelected.name_mm === "အားလုံး") {
            setCategorySelected({ name: "%%", name_mm: "%%" })
        } else if (categorySelected !== "") {
            setCategorySelected(categorySelected)
        }
    }, [categorySelected,refetch])


    useEffect(() => {
        if (articleFilterData) {
            setCategorySelected(articleFilterData);
        }
    }, [articleFilterData]);



    const newArr1 = [{ name: "All", name_mm: "အားလုံး" }]
    const newCategoryData = newArr1.concat(articleCategory?.article_category)


    const handleArticlePress = (index) => {
        const article = data.articles[index];

        navigation.navigate('Article Detail', {
            articleId: article.id,
            articles: data.articles,
            currentIndex: index
        })
    }


    // if (!data || !articleCategory ) {
    //   return <Loading />;
    // }
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
                    data={data?.articles}
                    refreshing={data?.networkStatus === 4}
                    onRefresh={async () => {
                        refetch()
                    }}

                    showsVerticalScrollIndicator={false}
                    renderItem={({ item, index }) => {
                        return (
                            <TouchableOpacity
                                key={index}
                                onPress={() => handleArticlePress(index)}
                            >
                                {
                                    index === 0 ?
                                        <View
                                            style={styles.boxContainer}
                                        >
                                            <Image source={{ uri: item.image_url }} style={styles.img} />

                                            <View style={[styles.positionView,{
                                                backgroundColor:'rgba(0,0,0,0.3)',
                                            }]}>
                                                <View style={{ ...style.flexRow ,justifyContent:'center'}}>
                                                    <Image source={icons.digital_time} style={[styles.icon, { tintColor: colors.lightWhite }]} />
                                                    <Text style={{ color: colors.lightWhite, ...fonts.LT_body5, paddingLeft: 5 }}>{item.duration_time} min</Text>
                                                </View>
                                                <View style={{ ...style.flexRow, paddingLeft: 10,justifyContent:'center' }}>
                                                    <Image source={icons.digital_calendar} style={[styles.icon, { tintColor: colors.lightWhite }]} />
                                                    <Text style={{ color: colors.lightWhite, ...fonts.LT_body5, paddingLeft: 5 }}>{new Date(item.created_at).toLocaleDateString()}</Text>
                                                </View>
                                            </View>

                                            <View style={styles.gradientContainer}>
                                                <LinearGradient
                                                    style={styles.rectangleLineargradient}
                                                    locations={[0, 1]}
                                                    colors={['rgba(0, 0, 0, 0)', '#000']}
                                                    useAngle={true} angle={180} >

                                                    <Text style={[styles.blurTxt, { lineHeight: Platform.OS === 'ios' ? 0 : 25 }]}>
                                                        {language === 'mm' ? item.name_mm : item.name}</Text>
                                                </LinearGradient>
                                            </View>
                                        </View>
                                        :
                                        <View style={styles.boxContainer1}>
                                            <View style={{ justifyContent: 'space-evenly', height: '80%',flex:1 }}>
                                                <Text style={{ color: theme.secColor, ...fonts.LT_body5 }}>{language === 'mm' ? item.article_category.name_mm :
                                                    item.article_category.name}</Text>
                                                <Text style={{ color: theme.mainColor, ...fonts.LT_h2 }}>{language === 'mm' ? item.name_mm : item.name}</Text>
                                                <View style={{ ...style.flexRow, }}>
                                                    <View style={{ ...style.flexRow }}>
                                                        <Image source={icons.digital_time} style={[styles.icon, { tintColor: theme.secColor }]} />
                                                        <Text style={{ color: theme.secColor, ...fonts.LT_body5, paddingLeft: 5 }}>{item.duration_time} min</Text>
                                                    </View>
                                                    <View style={{ ...style.flexRow, paddingLeft: 10 }}>
                                                        <Image source={icons.digital_calendar} style={[styles.icon, { tintColor: theme.secColor }]} />
                                                        <Text style={{ color: theme.secColor, ...fonts.LT_body5, paddingLeft: 5 }}>{new Date(item.created_at).toLocaleDateString()}</Text>
                                                    </View>
                                                </View>
                                            </View>
                                            <View style={{  height: '70%' ,width:130}}>
                                                <Image source={{ uri: item.image_url }} style={styles.img} />
                                            </View>


                                        </View>
                                }

                            </TouchableOpacity>
                        )
                    }}
                    contentContainerStyle={{ paddingBottom: 90, paddingHorizontal: 16 }}
                />
            </SafeAreaView>
        </ImageBackground>
    )
}
export default Article

const styles = StyleSheet.create({
    container: { flex: 1 },
    bgImg: { flex: 1, height: '100%' },
    img: { width: '100%', height: '100%', borderRadius: 10 },
    boxContainer: { borderRadius: 10, height: scaleHeight(190), marginTop: 15 },
    boxContainer1: { ...style.flexRowSpace, height: scaleHeight(150), borderBottomWidth: 0.3, borderColor: colors.gray,flex:1 },
    title: { ...fonts.LT_h2, },

    blurTxt: { color: colors.lightWhite, ...fonts.LT_body1 },
    icon: { width: scaleWidth(16), height: scaleHeight(16), },

    gradientContainer: { position: 'absolute', left: 0, right: 0, bottom: 0 },
    rectangleLineargradient: {
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10,
        flex: 1,
        width: "100%",
        height: 52,
        backgroundColor: "transparent",
        justifyContent: 'center', paddingLeft: 20
    },
    positionView: {
        position: 'absolute',
        left: 0,
        right: 0,
        ...style.flexRowSpace,
        paddingHorizontal:10,
        height:35,
        borderTopLeftRadius:5,borderTopRightRadius:5,

    }

})


