
import React, { useContext, useEffect, useState, useMemo, useRef } from "react";
import { View, TouchableOpacity, StyleSheet, Image, Dimensions, Modal, Animated, FlatList, Text } from "react-native"
import icons from "../../../constant/icons";
import { style } from "../../../constant/style";
import { colors, fonts } from "../../../constant/theme";
import { Context } from "../../../component/Context";
import LinearGradient from "react-native-linear-gradient";
import MasonryList from '@react-native-seoul/masonry-list';
import { scaleHeight, scaleWidth } from "../../../utils/responsive";
import appStorage from "../../../utils/appStorage";
import AnimatedImage from "../../../component/AnimatedImage";
import SwitchModal from "./Component/SwitchModal";
import ArtworkMediumFilter from "./Component/ArtworkMediumFilter";
import ArtworkMediumFilterModal from "./Component/ArtworkMediumFilterModal";

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

const Artwork = ({ navigation, data, artworkMediumData,setArtworkMediumName,setMediumSelected,mediumSelected }) => {

  const flatListRef = useRef(null)

  const [open, setOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mediumModalOpen,setMediumModalOpen] = useState(false)


  const { digital, setDigital, } = useContext(Context)

  const [scaleValue] = useState(new Animated.Value(0));


  useEffect(() => {
  if (mediumSelected.medium_name === "All" || mediumSelected.medium_name_mm === "အားလုံး"){
      setArtworkMediumName({ medium_name: "%%", medium_name_mm: "%%" });

    }else if (mediumSelected !== "") {
      setArtworkMediumName(mediumSelected);
    } 
    
    
  }, [mediumSelected]);



  const onButtonClicked = () => {

    Animated.timing(scaleValue, {
      toValue: 1,
      useNativeDriver: true,
      duration: 1300,
    }).start(() => { scaleValue.setValue(0); });
    setOpen(true)

    const timeout = setTimeout(() => {
      setOpen(false)
      saveArtworkType(digital)
    }, 800);
    return () => clearTimeout(timeout);

  }

  const scaleValueInterpolation = scaleValue.interpolate({
    inputRange: [0, 0.25, 0.5, 1],
    outputRange: [1, 20, 30, 40],
  });


  const saveArtworkType = async (artworkType) => {

    setDigital(!artworkType)
    await appStorage.saveItem("ArtworkType", digital ? "false" : "true")

  }

  const artworkMediumType = artworkMediumData?.artwork_medium_type
  const newArr1 = [{ medium_name: "All", medium_name_mm: "အားလုံး" }]
  const newArr2 = [{ medium_name: "See All", medium_name_mm: "အားလုံးကြည့်ရန်" }]

  const updateArtworkMedium = newArr1.concat(artworkMediumType)
  const newArtworkMediumArray = updateArtworkMedium.concat(newArr2)


  
  const animatedStyle = {
    opacity: scaleValue,
  };



  const Card = ({ item, styles }) => {
    const randomBool = useMemo(() => Math.random() < 0.5, []);
    return (

      <>


        {
          !digital ?

            <TouchableOpacity
              onPress={() => navigation.navigate('Home Detail', { ArtworkId: item.id })}
              key={item.id} style={[styles.tradiContainer, { elevation: 10, height: randomBool ? scaleHeight(210) : scaleHeight(230) }]}>
              <AnimatedImage
                uri={item.artwork_image_url}
                style={{
                  height: '100%',
                  alignSelf: 'stretch',
                  borderRadius: width > 400 ? 110 : 80,
                }}
                resizeMode="cover"
                sharedTransitionTag="tag"

              />

            </TouchableOpacity>
            :
            <LinearGradient
              colors={colors.linearBorder}
              start={{ x: 0, y: 1 }}
              end={{ x: 1, y: 0 }}
              style={{
                width: '82%',
                margin: 15, height: randomBool ? scaleHeight(200) : scaleHeight(220),
                borderRadius: 20, justifyContent: 'center', alignItems: 'center',
              }}
            >
              <TouchableOpacity
                key={item.id}
                onPress={() => navigation.navigate('Home Detail',
                  { ArtworkId: item.id }
                )}
                style={{ width: '96%', height: '98%', borderRadius: 20, }}
              >
                <AnimatedImage uri={item.artwork_image_url}
                  style={{ width: '100%', height: '100%', borderRadius: 20 }}


                />
              </TouchableOpacity>
            </LinearGradient>
        }
      </>
    )
  }

  return (

    <>
      <Animated.View
        style={[styles.container, { transform: [{ scale: scaleValueInterpolation }] }]}
      />
    {
      !digital &&
      <ArtworkMediumFilter 
      mediumSelected={mediumSelected} 
      setMediumSelected={setMediumSelected} 
      newArtworkMediumArray={newArtworkMediumArray}
      flatListRef={flatListRef}
      currentIndex={currentIndex}
      setCurrentIndex={setCurrentIndex}
      setMediumModalOpen={setMediumModalOpen}
      setArtworkMediumName={setArtworkMediumName}
      />
    }
     
      
      <MasonryList
        contentContainerStyle={{
          alignSelf: 'stretch',
          paddingBottom: 80, paddingHorizontal: 20
        }}
        numColumns={2}
        data={digital ? data.digital_art_work : data.traditional_art_work}

        renderItem={({ item, index }) =>

          <Card item={item} styles={styles} />

        }
      />
      <TouchableOpacity
        style={[styles.container]}
        onPress={onButtonClicked}
      >
        {
          !digital ?
            <LinearGradient
              colors={colors.linearBorder}
              start={{ x: 0, y: 1 }}
              end={{ x: 1, y: 0 }}
              style={{ width: '100%', height: '100%', borderRadius: 28, ...style.center }}
            >
              <Image source={icons.digital_world}
                resizeMode="contain"
                style={{ width: scaleWidth(30), height: scaleHeight(30) }} />
            </LinearGradient>
            :

            <Image source={icons.tradi_world}
              resizeMode="contain"
              style={{ width: scaleWidth(35), height: scaleHeight(30) }} />
        }

      </TouchableOpacity>

        <SwitchModal open={open} animatedStyle={animatedStyle} digital={digital}/>
        <ArtworkMediumFilterModal 
        mediumModalOpen={mediumModalOpen}
        setMediumModalOpen={setMediumModalOpen}
        updateArtworkMedium={updateArtworkMedium}
        setMediumSelected={setMediumSelected}
        mediumSelected={mediumSelected}
        />
     
    </>
  )
}
export default Artwork

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    width: 55,
    height: 55,
    borderRadius: 28,
    position: 'absolute',
    right: 20,
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 40,
    zIndex: 1,
    elevation: 1,
    ...style.shadow,
  },


  tradiContainer: {
    margin: 15,
    flex: 1,
    borderWidth: 1.2,
    width: '82%',
    alignItems: 'center',

    borderColor: colors.lightWhite,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    borderRadius: 80,
  },
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
    marginRight: 10, paddingHorizontal: 8
  }
});