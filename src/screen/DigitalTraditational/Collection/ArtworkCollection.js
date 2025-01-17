import React, { useContext } from "react";
import { View, Text, SafeAreaView, StyleSheet, FlatList, Image, TouchableOpacity, Platform } from "react-native"
import { Context } from "../../../component/Context";
import { colors, fonts } from "../../../constant/theme";
import icons from "../../../constant/icons";
import { style } from "../../../constant/style";
import LinearGradient from "react-native-linear-gradient";
import { scaleHeight } from "../../../utils/responsive";
import AnimatedImage from "../../../component/AnimatedImage";

const ArtworkCollection = ({ route, navigation,data }) => {


    const { digital, language } = useContext(Context)



    return (
        <SafeAreaView style={[styles.container]}>
            <View style={styles.content}>

                <FlatList
                    row={2}
                    numColumns={2}
                    data={digital ? data.digital_collection : data.collection}
                    showsVerticalScrollIndicator={false}

                    renderItem={({ item, index }) => {

                        return (
                            <>
                                {
                                    !digital ?
                                        <TouchableOpacity
                                            onPress={() => navigation.navigate('Artwork Collection By Name', {
                                                collectionId: item.id
                                            })}
                                            style={styles.tradicontainer}
                                            key={item.id}>
                                            <AnimatedImage uri={item.collection_image_url }
                                                resizeMode="cover"
                                                style={{ width: '100%', height: '100%', borderRadius: digital ? 30 : 100 }} />

                                            <View style={[styles.nameContainer, {

                                            }]}>
                                                <Text style={[styles.name,{
                                                    lineHeight: Platform.OS == 'ios' ? 0 : 30,
                                                }]}>{language === 'mm' ? item.collection_name_mm : item.collection_name}</Text>
                                            </View>
                                        </TouchableOpacity>
                                        :


                                        <LinearGradient
                                            colors={colors.linearBorder}
                                            start={{ x: 0, y: 1 }}
                                            end={{ x: 1, y: 0 }}
                                            style={styles.digitalContainer}
                                        >
                                            <TouchableOpacity
                                                onPress={() => navigation.navigate('Artwork Collection By Name', {
                                                    collectionId: item.id
                                                })}
                                                style={{ width: '96%', height: '98%', borderRadius: 20 }}
                                            >
                                                <AnimatedImage uri={item.collection_image_url }
                                                    resizeMode="cover"
                                                    style={{ width: '100%', height: '100%', borderRadius: 20 }} />
                                                <View style={styles.nameContainer}>
                                                    <Text style={[styles.name, {
                                                        lineHeight: Platform.OS == 'ios' ? 0 : 30
                                                    }]}>{language === 'mm'? item.collection_name_mm : item.collection_name}</Text>
                                                </View>
                                            </TouchableOpacity>
                                        </LinearGradient>


                                }


                            </>
                        )
                    }}

                    contentContainerStyle={{ paddingBottom: 80, }}

                />

            </View>

        </SafeAreaView>
    )
}

export default ArtworkCollection

const styles = StyleSheet.create({
    container: { flex: 1 },
    content: { paddingHorizontal: 20 },
    tradicontainer: {
        width: '41%', margin: 15, height:scaleHeight(220), borderRadius: 100, backgroundColor: colors.lightWhite, marginBottom: 10,
        borderWidth: 1, borderColor: colors.lightWhite,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 6,
    },
    digitalContainer: { width: '45%', margin: 5, height: 210, marginVertical: 15, marginHorizontal: 10, borderRadius: 20, justifyContent: 'center', alignItems: 'center', },
    title: { ...fonts.PT_h1, paddingTop: 10, margin: 10, marginLeft: 25 },
    nameContainer: { position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, ...style.center },
    name: { ...fonts.PT_h1, color: colors.lightWhite, lineHeight: 30, textAlign: 'center' }
})