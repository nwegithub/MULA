import React, { useContext } from "react";
import { View, Modal, Text, TouchableOpacity, ScrollView, StyleSheet, TouchableWithoutFeedback, Dimensions,KeyboardAvoidingView } from "react-native";
import { colors,fonts } from "../../../../constant/theme";
import { style } from "../../../../constant/style";
import { Context } from "../../../../component/Context";


const ArtworkMediumFilterModal = ({ mediumModalOpen, setMediumModalOpen ,updateArtworkMedium,setMediumSelected,mediumSelected}) => {

    const { digital,theme,language } = useContext(Context)

    return (
        <Modal visible={mediumModalOpen} transparent={true} animationType="slide">
      
                <TouchableWithoutFeedback
                    onPress={() => setMediumModalOpen(false)}
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
                            Artwork Categories
                        </Text>
                        {
                            updateArtworkMedium.map((item,index) => 
                            
                            <TouchableOpacity 
                            onPress={() => setMediumSelected(item)}
                            style={{marginVertical:10}}>
                                <Text style={[styles.body,{color:mediumSelected.medium_name === item?.medium_name || mediumSelected.medium_name_mm === item?.medium_name
                    ? theme.mainColor : theme.secColor,
                    // textDecorationLine: mediumSelected.medium_name === item?.medium_name || mediumSelected.medium_name_mm === item?.medium_name && "underline"
                    }]}>
                                    { language === 'eng' ? item?.medium_name : item?.medium_name_mm}
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

export default ArtworkMediumFilterModal

const styles = StyleSheet.create({
    container: { position: "absolute", left: 0, right: 0, bottom: 0,flex: 1 ,borderTopLeftRadius: 24, borderTopRightRadius: 24,height:'45%',},
    content: {  paddingHorizontal: 25,paddingVertical:30  },
    title:{...fonts.LT_body2,marginBottom:10},
    body:{...fonts.LT_body4}
})