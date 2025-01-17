import React, { useContext } from "react";
import { View, Modal, Text, TouchableOpacity, ScrollView, StyleSheet, TouchableWithoutFeedback, Dimensions,KeyboardAvoidingView } from "react-native";
import { colors,fonts } from "../../../../constant/theme";
import { style } from "../../../../constant/style";
import { Context } from "../../../../component/Context";


const ArtistFilterModal = ({ artistModalOpen, setArtistModalOpen ,artistArray,setArtistNameSelected,artistNameSelected,
setSort}) => {

    const { digital,theme,language } = useContext(Context)

    return (
        <Modal visible={artistModalOpen} transparent={true} animationType="slide">
      
                <TouchableWithoutFeedback
                    onPress={() => setArtistModalOpen(false)}
                >
                    <View style={{
                        flex: 1,
                        backgroundColor: theme.mainBgColor,
                    }}>
                    </View>
                </TouchableWithoutFeedback>

                <View style={[styles.container,{backgroundColor:theme.bgColor}]}>
                    <View style={[styles.content, { backgroundColor: theme.mainBgColor }]}>
                    <ScrollView
                    showsVerticalScrollIndicator={false}
                    >
                        <Text style={[styles.title,{color:theme.secColor}]}>
                            Sorting
                        </Text>
                        <TouchableOpacity
                        onPress={() => setSort("asc")}
                        >
                        <Text style={[styles.body,{marginTop:10}]}>
                            A to Z
                        </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                        onPress={() => setSort("desc")}
                        >
                        <Text style={[styles.body,{marginTop:10}]}>
                            Z to A
                        </Text>
                        </TouchableOpacity>
                        <View style={{width:'100%',height:0.8,marginVertical:20,backgroundColor:theme.secColor}}/>
                        {
                            artistArray?.map((item,index) => 
                            
                            <TouchableOpacity 
                            onPress={() => setArtistNameSelected(item)}
                            style={{marginVertical:10}}>
                                <Text style={[styles.body,{color:artistNameSelected.artist_name === item?.artist_name || artistNameSelected.artist_name_mm === item?.artist_name
                    ? theme.mainColor : theme.secColor,
                    // textDecorationLine: artistNameSelected.artist_name === item?.artist_name || artistNameSelected.artist_name_mm === item?.artist_name && "underline"
                    }]}>
                                    { language === 'eng' ? item?.artist_name : item?.artist_name_mm}
                                </Text>
                                </TouchableOpacity>
                            )
                        }
                    </ScrollView>
                    </View>
                </View>

        </Modal>
    )
}

export default ArtistFilterModal

const styles = StyleSheet.create({
    container: { position: "absolute", left: 0, right: 0, bottom: 0,flex: 1 ,borderTopLeftRadius: 24, borderTopRightRadius: 24,height:'45%',},
    content: {  paddingHorizontal: 25,paddingVertical:30  },
    title:{...fonts.LT_body2,marginBottom:10},
    body:{...fonts.LT_body4}
})