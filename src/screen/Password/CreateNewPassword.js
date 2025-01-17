import React, { useState, useContext } from "react";
import { View, Text, ImageBackground, Dimensions, Modal, SafeAreaView, TouchableWithoutFeedback, StyleSheet, TextInput, Image, TouchableOpacity, ScrollView, KeyboardAvoidingView } from "react-native"
import icons from "../../constant/icons";
import { style } from "../../constant/style";
import { colors, fonts } from "../../constant/theme";
import { useMutation } from "@apollo/client";
import { Context } from "../../component/Context";
import { RESET_PASSWORD } from "../../graphql/mutations";
import ModalWrapper from "../../component/ModalWrapper";

const width = Dimensions.get('screen').width

const CreatePassword = ({ navigation, route }) => {

    const { resetData } = route.params

    const { digital, myanmar } = useContext(Context)


    const [visible, setVisible] = useState()
    const [createPassword, setCreatePassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [modal, setModal] = useState(false)
    const [title, setTitle] = useState()


    const [resetPassword] = useMutation(RESET_PASSWORD)

    const handleResetPass = async () => {
        const response = await resetPassword({
            variables: {
                newPassword: confirmPassword,
                otp: resetData.code,
                phone: resetData.userData.phone
            }
        })




        if (response.data.resetPassword.error) {

            setModal(true)
            setTitle(response.data.resetPassword.message)


        } else {
            setModal(true)
            setTitle(response.data.resetPassword.message)
            // navigation.pop(4)
        }

    }

    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground source={{ uri: 'https://axra.sgp1.digitaloceanspaces.com/Mula/signIn.png' }} resizeMode="cover" style={styles.img}>
                <ScrollView style={{ flex: 1, }}
                    showsVerticalScrollIndicator={false}
                >
                    <KeyboardAvoidingView style={{}}
                        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    >
                        <View style={styles.content}>
                            <View style={styles.logoContainer}>
                                <Image source={icons.logo} resizeMode="contain" style={styles.icon} />
                            </View>
                            <View style={styles.content1}>
                                <Text style={styles.title}>Create New Password</Text>

                                <View>
                                    <TextInput
                                        value={createPassword}
                                        placeholder="Create Password"
                                        placeholderTextColor={colors.gray}
                                        onChangeText={(text) => setCreatePassword(text)}
                                        style={styles.input}
                                        secureTextEntry={!visible}

                                    />
                                    <TouchableOpacity
                                        onPress={() => setVisible(!visible)}
                                    >

                                        <Image source={visible ? icons.visible : icons.notVisible} style={{ position: 'absolute', right: 10, width: 25, height: 25, bottom: 10 }} />
                                    </TouchableOpacity>
                                </View>

                                <View>
                                    <TextInput
                                        value={confirmPassword}
                                        placeholder="Confirm Password"
                                        placeholderTextColor={colors.gray}
                                        onChangeText={(text) => setConfirmPassword(text)}
                                        style={[styles.input, {
                                            borderColor: colors.red, borderWidth: (confirmPassword &&
                                                createPassword !== confirmPassword ? 1 : 0)
                                        }]}
                                        secureTextEntry={!visible}

                                    />
                                    <TouchableOpacity
                                        onPress={() => setVisible(!visible)}
                                    >

                                        <Image source={visible ? icons.visible : icons.notVisible} style={{ position: 'absolute', right: 10, width: 25, height: 25, bottom: 10 }} />
                                    </TouchableOpacity>
                                </View>




                            </View>

                        </View>
                    </KeyboardAvoidingView>
                </ScrollView>
                <View style={{ paddingHorizontal: 20, }}>
                    <TouchableOpacity
                        disabled={createPassword !== confirmPassword}
                        onPress={handleResetPass}
                        style={[styles.btn, { backgroundColor: createPassword !== confirmPassword ? colors.lightYellow : colors.primary }]}
                    >
                        <Text style={styles.btnText}>Create</Text>
                    </TouchableOpacity>

                </View>

                <ModalWrapper modalOpen={modal} setModalOpen={setModal}>
                    <View style={{ ...style.center }}>
                        <Text style={{ ...fonts.LT_body2, color: colors.black, marginTop: 10, lineHeight: Platform.OS === 'ios' ? 0 : 25 }}> {title}</Text>
                        <TouchableOpacity
                            onPress={() => { setModal(false), navigation.navigate('Start Up') }}
                            style={{ backgroundColor: colors.primary, padding: 10, borderRadius: 5, width: 80, marginTop: 20 }}
                        >
                            <Text style={{ color: colors.lightWhite, ...fonts.LT_body4, textAlign: 'center', lineHeight: Platform.OS === 'ios' ? 0 : 20 }}> OK</Text>
                        </TouchableOpacity>
                    </View>

                </ModalWrapper>

            </ImageBackground>

        </SafeAreaView>
    )
}
export default CreatePassword

const styles = StyleSheet.create({
    container: { flex: 1 },
    img: { width: '100%', height: '100%' },
    content: { marginHorizontal: 20, flex: 1 },
    logoContainer: { height: 150, ...style.center, },
    icon: { width: 150, height: 150 },
    title: { ...fonts.LT_h1, color: colors.black },
    content1: { marginBottom: 20 },
    input: { ...style.textinput, ...style.shadow, backgroundColor: colors.lightWhite, ...fonts.LT_body4 },
    forgot: { marginVertical: 10, ...fonts.LT_body2, color: colors.black },
    btn: { ...style.button, marginVertical: 40 },
    btnText: { color: colors.lightWhite, ...fonts.LT_body1 },
    text: { marginHorizontal: 10, ...fonts.LT_body2, color: colors.black },

})