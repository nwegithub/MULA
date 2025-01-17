import React, { useContext } from "react";
import { View, Text, Image, SafeAreaView, StyleSheet, ImageBackground, Dimensions, TouchableOpacity, FlatList,
ScrollView } from "react-native";
import { Context } from "../../../../component/Context";
import { style } from "../../../../constant/style";
import { colors, fonts } from "../../../../constant/theme";
import { useQuery } from "@apollo/client";
import { GET_USER_FAVOURITE } from "../../../../graphql/queries";
import Loading from "../../../../component/Loading";
import icons from "../../../../constant/icons";
import { scaleHeight, scaleWidth } from "../../../../utils/responsive";

const width = Dimensions.get('screen').width

const Favourite = ({ navigation }) => {

    const { digital, user, language } = useContext(Context)


    const { data, loading } = useQuery(GET_USER_FAVOURITE, {
        variables: {
            userId: user.id
        }, fetchPolicy: 'network-only'
    })


    const digArr = []
    const triArr = []

    data?.user_favourites.map((item, index) => {
        item.user_favourites_traditional_art_work !== null ? triArr.push(item) : digArr.push(item)
    })



    if (!data) {
        return <Loading />
    }

    return (

        <ImageBackground source={{
            uri: digital ?
                'https://axra.sgp1.digitaloceanspaces.com/Mula/bg1.png'
                :
                'https://axra.sgp1.digitaloceanspaces.com/Mula/bg9.png'
        }} style={{ height: '100%', flex: 1 }}>
            <ScrollView 
            contentContainerStyle={{paddingBottom:20}}
            showsVerticalScrollIndicator={false}
            style={styles.container}>


                <FlatList
                    showsVerticalScrollIndicator={false}
                    numColumns={2}
                    row={2}
                    data={digital ? digArr : triArr}
                    renderItem={({ item, index }) => {

                        return (
                            <>

                                <TouchableOpacity
                                    key={index}
                                    onPress={() => navigation.navigate('Home Detail', {
                                        ArtworkId: digital ?
                                            item.user_favourites_digital_art_work.id
                                            :
                                            item.user_favourites_traditional_art_work.id
                                    })}
                                    style={[styles.imgView,]}
                                >
                                    <Image source={{
                                        uri:
                                            digital ? item.user_favourites_digital_art_work?.artwork_image_url :
                                                item.user_favourites_traditional_art_work?.artwork_image_url
                                    }} resizeMode="cover" style={styles.img} />

                                </TouchableOpacity>
                            </>
                        )
                    }}
                    contentContainerStyle={{ paddingBottom: 60, flex: 1, marginHorizontal:10 }}
                    ListEmptyComponent={
                        <View style={styles.listEmptyContainer}>
                            <Image source={icons.no_Favourite}
                                resizeMode="contain" style={styles.listEmptyImage} />
                            <Text style={[styles.listEmptyText, {
                                color: digital ? colors.lightWhite : colors.gray
                            }]}>{language === 'mm' ? "နှစ်သက်သောပစ္စည်းများမရှိပါ" : "There is no favourite item"}</Text>
                        </View>
                    }
                />

            </ScrollView>
        </ImageBackground>

    )
}
export default Favourite

const styles = StyleSheet.create({
    container: { flex: 1, },
    imgView: { width: '47.3%', height:scaleHeight(200), borderRadius: 17, ...style.shadow, backgroundColor: colors.lightWhite,margin:scaleWidth(5) },
    img: { width: '100%', height: '100%', borderRadius: 17 },
    listEmptyContainer: {  flex: 1,alignItems:'center', marginTop:scaleHeight(150) },
    listEmptyImage: { width: scaleWidth(130), height: scaleHeight(130), },
    listEmptyText: { ...fonts.LT_body2, color: colors.gray, marginTop: 20 }
})