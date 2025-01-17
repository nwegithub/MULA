import React, { useContext } from "react";
import { View, Text, Modal, StyleSheet, TouchableWithoutFeedback, TouchableOpacity, Dimensions, Platform } from "react-native"
import icons from "../constant/icons";
import { fonts, colors } from "../constant/theme";
import { style } from "../constant/style"
import { Context } from "./Context";
import LinearGradient from "react-native-linear-gradient";
import ModalWrapper from "./ModalWrapper";

const width = Dimensions.get('screen').width

const AlertBox = ({ title, myaTitle, subtitle, modal, setModal }) => {

    const { digital, langData, language } = useContext(Context)

    return (
        <View >
            <ModalWrapper modalOpen={modal} setModalOpen={setModal}>
                <View style={{ ...style.center }}>
                    <Text style={{ ...fonts.LT_body5, color:  colors.black, marginTop: 10, lineHeight: Platform.OS === 'ios' ? 0 : 25 }}> {language === 'mm' ? myaTitle : title}</Text>
                    <Text style={{ ...fonts.LT_body5, color:  colors.black, marginTop: 5 }}>{subtitle}</Text>
                    {
                        !digital ?

                            <TouchableOpacity
                                onPress={() => setModal(false)}
                                style={{ backgroundColor: colors.primary, padding: 10, borderRadius: 5, width: 80 }}
                            >
                                <Text style={{ color: colors.lightWhite, ...fonts.LT_body6, textAlign: 'center', lineHeight: Platform.OS === 'ios' ? 0 : 20 }}>{langData.ok}</Text>
                            </TouchableOpacity>

                            :
                            <LinearGradient
                                colors={colors.linearBtn}
                                start={{ x: 0, y: 1 }}
                                end={{ x: 1, y: 0 }}
                                style={{
                                    height: 35, width: 100,
                                    borderRadius: 5, ...style.center, margin: 5, marginLeft: 10
                                }}
                            >
                                <TouchableOpacity
                                    onPress={() => setModal(false)}
                                >
                                    <Text style={{
                                        color: digital ? colors.lightWhite : colors.primary, ...fonts.LT_body6, textAlign: 'center', lineHeight: Platform.OS === 'ios' ? 0 : 23,
                                    }}>
                                        {langData.ok}
                                    </Text>
                                </TouchableOpacity>

                            </LinearGradient>


                    }
                </View>

            </ModalWrapper>

        </View>
    )
}
export default AlertBox

const styles = StyleSheet.create({
    sucModalContainer: {
        position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, ...style.center, backgroundColor:
            'rgba(0,0,0,0.5)', padding: 30,
    }
})