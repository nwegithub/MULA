import React,{useEffect,useContext} from "react";
import { View ,Text,TouchableOpacity,StyleSheet,FlatList,Image} from "react-native";
import { fonts, } from "../../../../constant/theme";
import { style } from "../../../../constant/style";
import { scaleWidth,scaleHeight } from "../../../../utils/responsive";
import icons from "../../../../constant/icons";
import { Context } from "../../../../component/Context";
import { colors } from "../../../../constant/theme";


const ArtworkMediumFilter = ({mediumSelected,setMediumSelected,newArtworkMediumArray,flatListRef,currentIndex,setCurrentIndex,
setMediumModalOpen,})  => {

    const {  theme, language } = useContext(Context)


    useEffect(() => {
        flatListRef.current?.scrollToIndex({
          animated: true,
          index: currentIndex
        })
      }, [currentIndex])
    
    
      const handleNextPress = () => {
        if (currentIndex === newArtworkMediumArray.length - 1) {
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
    
    

    return(
        <View style={styles.filterContainer}>

        
          <TouchableOpacity
          disabled={currentIndex === 0}
            onPress={handleBack}
          >
            <Image source={icons.back_arrow} style={styles.icon} resizeMode="contain" tintColor={currentIndex === newArtworkMediumArray?.length - 1? colors.primary : theme.secColor} />
          </TouchableOpacity>
      


        <FlatList
          ref={flatListRef}
          horizontal
          initialScrollIndex={currentIndex}
          data={newArtworkMediumArray}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  if (item?.medium_name === "See All" || item?.medium_name_mm === "အားလုံးကြည့်ရန်") {
                    setMediumModalOpen(true);
                  }else{
                    setMediumSelected(item);

                  }
                }}
                style={styles.filterContent}>
                <Text style={[styles.text, {
                  color: mediumSelected.medium_name === item?.medium_name || mediumSelected.medium_name_mm === item?.medium_name
                    ? theme.mainColor : theme.secColor, 
                    // textDecorationLine: mediumSelected.medium_name === item?.medium_name || mediumSelected.medium_name_mm === item?.medium_name && "underline"
                }]}>
                  {language === 'eng' ? item?.medium_name : item?.medium_name_mm}
                </Text>
              </TouchableOpacity>
            )
          }}

        /> 

   
          <TouchableOpacity
          disabled={currentIndex === newArtworkMediumArray.length - 1}
            onPress={handleNextPress}
          >
            <Image source={icons.forward_arrow} style={styles.icon} resizeMode="contain" tintColor={currentIndex === 0 ? colors.primary : theme.secColor} />

          </TouchableOpacity>

      

      </View>
    )
}

export default ArtworkMediumFilter

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