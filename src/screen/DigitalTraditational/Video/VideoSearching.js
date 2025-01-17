import React, { useContext, useState, useRef, useEffect } from "react";
import { View, TouchableOpacity, StyleSheet, Image, FlatList, SafeAreaView, TextInput, Text, Modal } from "react-native"
import icons from "../../../constant/icons";
import { style } from "../../../constant/style";
import { colors, fonts } from "../../../constant/theme";
import { Context } from "../../../component/Context";
import LinearGradient from "react-native-linear-gradient";
import { useQuery, gql, useMutation } from '@apollo/client';
import Loading from "../../../component/Loading";
import { scaleHeight, scaleWidth } from "../../../utils/responsive";
import { VIDEO_VIEW_COUNT } from "../../../graphql/mutations";
import { GET_VIDEO_CREATER_BY_ID, GET_VIDEO } from "../../../graphql/queries"
import appStorage from "../../../utils/appStorage";

const GET_FILTERED_VIDEOS = gql`
query getFilteredVideos($search: String!,$isTraditional: Boolean!) {
  videos(
    where: {
      _or: [
        { video_name: { _ilike: $search } }
        { video_name_mm: { _ilike: $search } }
        { video_category: { name: { _ilike: $search } } }
        { video_category: { name_mm: { _ilike: $search } } }
        { videos_creator: { name: { _ilike: $search } } }
        { videos_creator: { name_mm: { _ilike: $search } } }
      ]
      pending: { _eq: false }
      disable: { _eq: false }
      is_traditional: { _eq: $isTraditional }
    }
  ) {
    id
    video_name
    video_name_mm
    video_category {
      id
      name
      name_mm
    }
    videos_creator {
      id
      name
      name_mm
    }
  }
}
`;

const VideoSearching = ({ navigation }) => {

    const { digital, langData, language, theme } = useContext(Context)
    const [searchText, setSearchText] = useState('')
    const [txt, setTxt] = useState('')
    const [searchHistory, setSearchHistory] = useState([]);
    const [longPressedItem, setLongPressedItem] = useState(null);

    const searchRef = useRef(null)


    const storageKey = digital ? 'digitalSearchHistory' : 'traditionalSearchHistory';


    useEffect(() => {
        const loadHistory = async () => {
            try {
                const history = await appStorage.getItem(storageKey);
                if (history) {
                    setSearchHistory(JSON.parse(history));
                }
            } catch (e) {
                console.error(e);
            }
        };

        loadHistory();
    }, []);

    const { data } = useQuery(GET_FILTERED_VIDEOS, {
        variables: {
            search: `%${searchText}%`,
            isTraditional: !digital,
        },

    });

    const handleSearch = async () => {

        setSearchText('');

    };


    const handleVideoPress = async (item) => {

        navigation.navigate('Video Detail', { videoId: item.id })
    }

    const handleVideoPressForHistory = async (item) => {
        const itemName = item;
        const updatedHistory = [itemName, ...searchHistory.filter((i) => i !== itemName)];
        setSearchHistory(updatedHistory);
        await appStorage.saveItem(storageKey, JSON.stringify(updatedHistory));
    };


    const handleLongPress = (item) => {
        setLongPressedItem(item);
    };

    const handleDelete = async (itemToDelete) => {
        const updatedHistory = searchHistory.filter((item) => item !== itemToDelete);
        setSearchHistory(updatedHistory);
        await appStorage.saveItem(storageKey, JSON.stringify(updatedHistory));
        setLongPressedItem(null);
    };


    return (

        <SafeAreaView style={[styles.container, { backgroundColor: digital ? colors.darkBlack : colors.white }]}>

            <View style={{ padding: 20, }}>

                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={{ width: '15%', marginTop: 5 }}
                    >

                        <Image source={icons.digital_back_arrow} style={{
                            width: 25, height: 25, tintColor:
                                digital ? null : colors.primary
                        }} resizeMode="contain" />
                    </TouchableOpacity>
                    <View style={{ width: '85%' }}>

                        <TextInput
                            ref={searchRef}
                            placeholder='Search'
                            value={searchText}
                            onChangeText={(text) => setSearchText(text)}
                            placeholderTextColor={digital ? colors.lightWhite : colors.black}
                            style={[styles.textInput, {
                                backgroundColor: digital ? colors.gray : colors.lightWhite,
                                color: digital ? colors.lightWhite : colors.black
                            }]}
                        />
                        <Image source={icons.search} style={[styles.icon, { tintColor: digital ? null : colors.primary }]} />
                        <TouchableOpacity
                            onPress={() => handleSearch()}
                            style={{ position: 'absolute', right: 20, top: 10, }}>
                            {
                                searchText &&
                                <Image source={icons.digital_remove} style={[{ tintColor: digital ? null : colors.primary, width: 20, height: 20, }]} />

                            }
                        </TouchableOpacity>
                    </View>
                </View>




                {searchText.trim() ? (

                    <FlatList
                        data={data?.videos}
                        contentContainerStyle={{ paddingTop: 20, paddingBottom: 30 }}

                        showsVerticalScrollIndicator={false}
                        renderItem={({ item, index }) => {
                            return (
                                <>
                                    <TouchableOpacity
                                        key={index}
                                    >
                                        <TouchableOpacity
                                            onPress={() => {
                                                handleVideoPress(item),
                                                    handleVideoPressForHistory(language === 'mm' ? item.video_name_mm : item.video_name)
                                            }}
                                            style={{ ...style.flexRowSpace, marginVertical: 10, }}
                                        >
                                            <Text style={[styles.title, { color: theme.mainColor }]}>{language === 'mm' ? item.video_name_mm : item.video_name}</Text>
                                            <Image source={icons.digital_upArrow} style={{
                                                width: scaleWidth(23), height: scaleHeight(23),
                                                tintColor: digital ? null : colors.primary
                                            }} />

                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            onPress={() => {
                                                navigation.navigate('Video List By Creater', { createrId: item.videos_creator.id }),
                                                    handleVideoPressForHistory(language === 'mm' ? item.videos_creator.name_mm : item.videos_creator.name)
                                            }}
                                            style={{ ...style.flexRowSpace, marginVertical: 10, }}

                                        >
                                            <Text style={[styles.subtitle, { color: theme.mainColor }]}>{language === 'mm' ? item.videos_creator.name_mm : item.videos_creator.name}</Text>
                                            <Image source={icons.digital_upArrow} style={{
                                                width: scaleWidth(23), height: scaleHeight(23),
                                                tintColor: digital ? null : colors.primary
                                            }} />

                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            onPress={() => {
                                                navigation.navigate(language === 'mm' ? 'ဗီဒီယို' : 'Video', {
                                                    categoryFilterData: item.video_category,
                                                    categoryId: item.video_category.id
                                                })
                                                    , handleVideoPressForHistory(language === 'mm' ? item.video_category.name_mm : item.video_category.name)
                                            }}
                                            style={{ ...style.flexRowSpace, marginVertical: 10, }}

                                        >
                                            <Text style={[styles.subtitle, { color: theme.mainColor }]}>{language === 'mm' ? item.video_category.name_mm : item.video_category.name}</Text>
                                            <Image source={icons.digital_upArrow} style={{
                                                width: scaleWidth(23), height: scaleHeight(23),
                                                tintColor: digital ? null : colors.primary
                                            }} />
                                        </TouchableOpacity>

                                    </TouchableOpacity>
                                    <View style={{ height: 1, backgroundColor: '#d9d9d9', width: '100%', marginVertical: 9 }} />
                                </>
                            )
                        }}
                        ListEmptyComponent={

                            <View style={{ ...style.center, marginTop: 200 }}>
                                <Image source={icons.search}
                                    resizeMode="contain" style={[styles.icon2, { tintColor: digital ? '#09FBD3' : colors.primary }]} />
                                <Text style={{ color: theme.mainColor, marginTop: 20, }}>No Result Found!</Text>
                            </View>

                        }

                    />
                )
                    :
                    (
                        <FlatList
                            data={searchHistory}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({item,index}) => {
                                console.log("item...",item)
                                return(
                                    <>
                                    
                                    <View style={styles.itemContainer}>
                                    <TouchableOpacity
                                        onPress={() => setSearchText(item)}
                                        onLongPress={() => handleLongPress(item)}
                                    >
                                        <Text style={styles.text}>{item}</Text>
                                    </TouchableOpacity>
                                    {longPressedItem === item && (
                                        <TouchableOpacity
                                            onPress={() => handleDelete(item)}
                                            
                                        >
                                            <Image
                                                source={icons.digital_delete}
                                                style={[styles.deleteIcon,{tintColor:digital? null : colors.primary}]}
                                            />
                                        </TouchableOpacity>
                                    )}
                                    
                                    

                                </View>
                                <View style={styles.separator} />
                                    </>
                                )
                            }}
                            ListHeaderComponent={
                                <Text style={[styles.subtitle, { color: theme.mainColor, ...fonts.LT_body2, paddingVertical: 10 }]}>
                                    Previous Search Results
                                </Text>
                            }
                        />
                    )
                }




            </View>



        </SafeAreaView>
    )
}
export default VideoSearching

const styles = StyleSheet.create({
    container: { flex: 1, },
    imgContainer: {
        width: '42%', margin: 15, height: scaleHeight(230), borderRadius: 100, backgroundColor: colors.lightWhite, marginBottom: 10, borderWidth: 1, borderColor: colors.lightWhite,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 6,
    },
    subtitle: { ...fonts.LT_body5 },
    digitalContainer: { width: '45%', margin: 5, height: scaleHeight(210), marginVertical: 15, marginHorizontal: 10, borderRadius: 20, justifyContent: 'center', alignItems: 'center', },
    textInput: {
        paddingLeft: 60,
        height: 40, borderRadius: 30, width: '100%', ...fonts.LT_body4, ...style.center,
        ...style.shadow, marginBottom: 8,
    },
    icon: { position: 'absolute', left: 20, top: 10, width: 20, height: 20, },
    icon1: { position: 'absolute', right: 20, top: 10, width: 20, height: 20, },
    text: { ...fonts.LT_body3, },
    icon2: { width: scaleWidth(50), height: scaleHeight(50) },
    itemContainer: {
       ...style.flexRowSpace,
        paddingHorizontal: 10,
        marginVertical: 5,
      },
   
     
      
      deleteIcon: {
        width: 20,
        height: 20,
      },
      separator: {
        height: 0.5,
        backgroundColor: '#d9d9d9',
        width: '100%',
        marginVertical: 9,
      },
    
})