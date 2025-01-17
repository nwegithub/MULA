import React, { useRef } from "react";
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Image } from "react-native"
import { style } from "../../../../constant/style";
import { fonts, colors } from "../../../../constant/theme";
import icons from "../../../../constant/icons";
import { scaleWidth, scaleHeight } from "../../../../utils/responsive";
import LinearGradient from "react-native-linear-gradient";

const CategoryFilter = ({ digital, data, categorySelected, setCategorySelected, navigation, language }) => {

    const flatListRef = useRef()

    return (
        <View>
            <View style={styles.headerContainer}>


                <TouchableOpacity
                    onPress={() => navigation.openDrawer()}
                    style={{ flex: 1 }}
                >
                    <Image source={icons.drawer} style={{ tintColor: digital ? null : colors.primary, width: scaleWidth(20), height: scaleHeight(20) }} />
                </TouchableOpacity>


                <Image source={digital ? icons.digital_mula_logo_name : icons.mula_logo_name} style={{ width: 100, height: 50, }} />

                <TouchableOpacity
                    onPress={() => navigation.navigate('Video Searching')}
                    style={{ flex: 1, alignItems: "flex-end" }}
                >
                    <Image source={icons.search} resizeMode="contain"
                        style={[styles.icon, { tintColor: digital ? null : colors.primary, }]} />
                </TouchableOpacity>

                {/* <TouchableOpacity 
            style={{marginLeft:20}}
            onPress={() => navigation.navigate('Checkout')}
            >
            <Image source={icons.cart} resizeMode="contain"
            style={[styles.icon,{tintColor: digital ? null: colors.primary}]}/>
            </TouchableOpacity> */}

            </View>
            <FlatList
                horizontal
                data={data || []} // Use empty array as fallback
                showsVerticalScrollIndicator={false}
                style={{ padding: 16 }}
                renderItem={({ item, index }) => (
                    <View style={{ height: 45 }}>
                        {digital ? (
                            <LinearGradient
                                colors={colors.linearBtn}
                                start={{ x: 0, y: 1 }}
                                end={{ x: 1, y: 0 }}
                                style={{
                                    marginRight: 10,
                                    borderRadius: 8,
                                    ...style.center,
                                    height: 45,
                                    padding: 1,
                                }}
                            >
                                <TouchableOpacity
                                    onPress={() => {
                                        setCategorySelected(item);
                                       
                                    }}
                                    style={{
                                        backgroundColor: categorySelected.id !== item?.id ? colors.darkBlack : null,
                                        paddingHorizontal: 20,
                                        height: categorySelected.id !== item?.id ? '100%' : null,
                                        borderRadius: 8,
                                        justifyContent: 'center',
                                    }}
                                >
                                    <Text
                                        style={{
                                            ...fonts.LT_body4,
                                            color: colors.lightWhite,
                                            textAlign: 'center',
                                            lineHeight: Platform.OS === 'ios' ? 0 : 25,
                                        }}
                                    >
                                        {language === 'mm' ? item?.name_mm : item?.name}
                                    </Text>
                                </TouchableOpacity>
                            </LinearGradient>
                        ) : (
                            <TouchableOpacity
                                onPress={() => setCategorySelected(item)}
                                style={[
                                    styles.listContainer,
                                    {
                                        backgroundColor: categorySelected.id === item?.id ? colors.primary : colors.lightWhite,
                                        borderWidth: 1,
                                        borderColor: colors.primary,
                                        marginRight: 10,
                                        paddingHorizontal: 20,
                                    },
                                ]}
                            >
                                <Text
                                    style={{
                                        ...fonts.LT_body4,
                                        color: categorySelected.id === item?.id ? colors.lightWhite : colors.primary,
                                        textAlign: 'center',
                                        lineHeight: Platform.OS === 'ios' ? 0 : 25,
                                    }}
                                >
                                    {language === 'mm' ? item?.name_mm : item?.name}
                                </Text>
                            </TouchableOpacity>
                        )}
                    </View>
                )}
            />

        </View>
    )
}
export default CategoryFilter

const styles = StyleSheet.create({
    headerContainer: { ...style.flexRowSpace, paddingHorizontal: 20, },
    icon: { width: scaleWidth(16), height: scaleHeight(16), },
    listContainer: {
        borderRadius: 15, height: 38, alignItems: 'center', justifyContent: 'center'
    },


})