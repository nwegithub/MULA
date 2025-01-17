import React, { useEffect, useContext } from "react";
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Image } from "react-native";
import { colors, fonts, } from "../../../../constant/theme";
import { style } from "../../../../constant/style";
import { scaleWidth, scaleHeight } from "../../../../utils/responsive";
import icons from "../../../../constant/icons";
import { Context } from "../../../../component/Context";


const ArtistFilter = ({ artistNameSelected, setArtistNameSelected, newArtistArray, flatListRef, currentIndex, setCurrentIndex,
    setArtistModalOpen, }) => {

    const { theme, language } = useContext(Context)

    useEffect(() => {
        if (newArtistArray?.length > 0 && currentIndex >= 0 && currentIndex < newArtistArray?.length) {
          flatListRef.current?.scrollToIndex({
            animated: true,
            index: currentIndex,
          });
        }
      }, [currentIndex, newArtistArray]);
      


    const handleNextPress = () => {
        if (currentIndex === newArtistArray?.length - 1) {
            return
        }
        setCurrentIndex(currentIndex + 1)
    };

    const handleBack = () => {
        if (currentIndex === 0) {
            return
        }
        setCurrentIndex(currentIndex - 1)
    }



    return (
        <View style={styles.filterContainer}>


            <TouchableOpacity
                disabled={currentIndex === 0}
                onPress={handleBack}
            >
                <Image source={icons.back_arrow} style={styles.icon} resizeMode="contain" tintColor={currentIndex === newArtistArray?.length - 1? colors.primary : theme.secColor} />
            </TouchableOpacity>



            <FlatList
                ref={flatListRef}
                horizontal
                initialScrollIndex={currentIndex}
                data={newArtistArray}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item, index }) => {
                    return (
                        <TouchableOpacity
                            key={index}
                            onPress={() => {
                                if(item?.artist_name === "See All" || item?.artist_name_mm === "အားလုံးကြည့်ရန်" ){
                                    setArtistModalOpen(true)

                                }else{
                                    setArtistNameSelected(item)

                                }
                            }}
                            style={styles.filterContent}>
                            <Text style={[styles.text, {
                                color: artistNameSelected.artist_name === item?.artist_name || artistNameSelected.artist_name_mm === item?.artist_name
                                    ? theme.mainColor : theme.secColor,
                                    //  textDecorationLine: artistNameSelected.artist_name === item?.artist_name || artistNameSelected.artist_name_mm === item?.artist_name && "underline",
                                   
                                    
                            }]}>
                                {language === 'eng' ? item?.artist_name : item?.artist_name_mm}
                            </Text>
                        </TouchableOpacity>
                    )
                }}

            />


            <TouchableOpacity
                disabled={currentIndex === newArtistArray?.length - 1}
                onPress={handleNextPress}
            >
                <Image source={icons.forward_arrow} style={styles.icon} resizeMode="contain"  tintColor={currentIndex === 0 ? colors.primary : theme.secColor} />

            </TouchableOpacity>



        </View>
    )
}

export default ArtistFilter

const styles = StyleSheet.create({

    filterContainer: {
        ...style.flexRowSpace, padding: 16,
    },
    icon: {
        width: scaleWidth(18), height: scaleHeight(18)
    },
    text: {
        ...fonts.LT_body4,
    },
    filterContent: {
        marginRight: 10, paddingHorizontal: 8,
    }
});