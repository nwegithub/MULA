import React, { useContext } from "react";
import { View, Text, Modal, StyleSheet, TouchableWithoutFeedback, TouchableOpacity, Dimensions, Platform } from "react-native"
import icons from "../constant/icons";
import { fonts, colors } from "../constant/theme";
import { style } from "../constant/style"
import { Context } from "./Context";
import LinearGradient from "react-native-linear-gradient";
import ModalWrapper from "./ModalWrapper";


const width = Dimensions.get('screen').width

const QusAlertBox = ({ title, myaTitle, modal, setModal, handleOk }) => {

    const { digital, langData, language } = useContext(Context)

    return (
        <View>
            <ModalWrapper modalOpen={modal} setModalOpen={setModal}>
                <Text style={{ textAlign: 'center', ...fonts.LT_body4, color: digital ? colors.lightWhite : colors.black, marginTop: 10, lineHeight: Platform.OS === 'ios' ? 0 : 25 }}> {language === 'mm' ? myaTitle : title}</Text>
                <View style={{ ...style.flexRowSpace, paddingTop: 17 ,...style.center}}>
                    {
                        digital ?
                            <>
                                <LinearGradient
                                    colors={colors.linearBtn}
                                    start={{ x: 0, y: 1 }}
                                    end={{ x: 1, y: 0 }}
                                    style={{
                                        height: 35, width: 100,
                                        borderRadius: 5, ...style.center, margin: 5, marginRight: 10
                                    }}
                                >
                                    <TouchableOpacity
                                        onPress={() => setModal(false)}
                                        style={{
                                            width: '98%', height: '98%', borderRadius: 5, ...style.center, backgroundColor: colors.black
                                        }}
                                    >
                                        <Text style={{
                                            color: digital ? colors.lightWhite : colors.primary, ...fonts.LT_body6, textAlign: 'center', lineHeight: Platform.OS === 'ios' ? 0 : 23,
                                        }}>
                                            {langData.cancel}
                                        </Text>
                                    </TouchableOpacity>

                                </LinearGradient>
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
                                        onPress={() => handleOk()}
                                    >
                                        <Text style={{
                                            color: digital ? colors.lightWhite : colors.primary, ...fonts.LT_body6, textAlign: 'center', lineHeight: Platform.OS === 'ios' ? 0 : 23,
                                        }}>
                                            {langData.ok}
                                        </Text>
                                    </TouchableOpacity>

                                </LinearGradient>
                            </>
                            :
                            <>
                                <TouchableOpacity
                                    onPress={() => setModal(false)}
                                    style={[styles.btnContainer, {
                                        backgroundColor: colors.lightWhite, borderWidth: 1,
                                        marginRight: 10, borderColor: colors.primary,
                                    }]}
                                >
                                    <Text style={[styles.btnTxt, { color: colors.primary, }]}>{langData.cancel}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => handleOk()}
                                    style={[styles.btnContainer, { backgroundColor: colors.primary, marginLeft: 10 }]}
                                >
                                    <Text style={[styles.btnTxt, { color: colors.lightWhite }]}>{langData.ok}</Text>
                                </TouchableOpacity>
                            </>
                    }
                </View>
            </ModalWrapper>




        </View>
    )
}
export default QusAlertBox

const styles = StyleSheet.create({
    sucModalContainer: {
        position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, ...style.center, backgroundColor:
            'rgba(0,0,0,0.5)',
    },
    btnContainer: { paddingVertical: 5, width: 100, borderRadius: 5 },
    btnTxt: { ...fonts.LT_body6, textAlign: 'center', lineHeight: Platform.OS === 'ios' ? 0 : 20 }
})