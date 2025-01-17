import React, { useContext, useState } from "react";
import {
    View, Text, SafeAreaView, StyleSheet, TextInput, TouchableOpacity, Image,
    ScrollView, KeyboardAvoidingView, Alert
} from "react-native"
import { Context } from "../../component/Context";
import icons from "../../constant/icons";
import { style } from "../../constant/style";
import { colors, fonts } from "../../constant/theme";
import HeaderComponent from "../../component/HeaderComponent";
import LinearGradient from "react-native-linear-gradient";
import { useMutation } from "@apollo/client";
import { CHANGE_PASSWORD } from "../../graphql/mutations";
import AlertBox from "../../component/AlertBox";
import { DigitalBotton,TradidionalButton } from "../../utils/helper";


const ChangePassword = ({ navigation }) => {

    const { digital, user,langData,language} = useContext(Context)
    const [oldPassword, setOldPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [oldVisible, setOldVisible] = useState(false)
    const [newVisible, setNewVisible] = useState(false)
    const [confirmVisible, setConfirmVisible] = useState(false)
    const [modal, setModal] = useState(false)
    const [title, setTitle] = useState("")
    const [mmTitle, setMmTitle] = useState("")

    const [changePassword] = useMutation(CHANGE_PASSWORD)



    const handleChangePassword = async () => {
        try {
            const response = await changePassword({
                variables: {
                    newPassword: confirmPassword,
                    oldPassword: oldPassword,
                    phone: user.phone
                }
            })
            if (response.data.changePassword.error) {
                setModal(true)
                setTitle("Old password wrong")
                setMmTitle("စကားဝှက်မှားနေပါသည်")
                setNewPassword("")
                setOldPassword("")
                setConfirmPassword("")
            } else {
                setModal(true)
                setTitle("Your Password Updated Successfully")
                setMmTitle("စကားဝှက်ပြင်ခြင်းအောင်မြင်ပါသည်")
                setNewPassword("")
                setOldPassword("")
                setConfirmPassword("")
            }

        } catch (e) {
            console.log(e)
        }
    }

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: digital ? colors.darkBlack : colors.white }]}>
            <HeaderComponent title="Change Password" myaTitle="စကားဝှက်ပြောင်းရန်" parentScreenName="Drawer" navigation={navigation} />
            <ScrollView style={{ flex: 1, }} contentContainerStyle={{ padding: 20 }}>
                <KeyboardAvoidingView style={{ flex: 1 }}
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                >
                    <View style={{ flex: 1 }}>

                        <View>
                            <TextInput
                                value={oldPassword}
                                placeholder={langData.oldPass}
                                onChangeText={(text) => setOldPassword(text)}
                                secureTextEntry={!oldVisible}
                                placeholderTextColor={digital ? colors.lightWhite : colors.gray}
                                style={[styles.input, {
                                    backgroundColor: digital ? colors.gray : colors.lightWhite,
                                    color: digital ? colors.lightWhite : colors.black
                                }]}
                            />
                            <TouchableOpacity
                                onPress={() => setOldVisible(!oldVisible)}
                            >

                                <Image source={oldVisible ? icons.digital_visible : icons.digital_notVisible}
                                    resizeMode="contain" style={[styles.icon, {
                                        tintColor: digital ? null : colors.black
                                    }]} />
                            </TouchableOpacity>
                        </View>
                        <View>
                            <TextInput
                                value={newPassword}
                                placeholder={langData.newPass}
                                onChangeText={(text) => setNewPassword(text)}
                                secureTextEntry={!newVisible}
                                placeholderTextColor={digital ? colors.lightWhite : colors.gray}
                                style={[styles.input, {
                                    backgroundColor: digital ? colors.gray : colors.lightWhite,
                                    color: digital ? colors.lightWhite : colors.black
                                }]}

                            />
                            <TouchableOpacity
                                onPress={() => setNewVisible(!newVisible)}
                            >

                                <Image source={newVisible ? icons.digital_visible : icons.digital_notVisible}
                                    resizeMode="contain" style={[styles.icon, {
                                        tintColor: digital ? null : colors.black
                                    }]} />
                            </TouchableOpacity>
                        </View>
                        <View> 
                            <TextInput
                                value={confirmPassword}
                                placeholder={langData.confirmPass}
                                onChangeText={(text) => setConfirmPassword(text)}
                                secureTextEntry={!confirmVisible}
                                placeholderTextColor={digital ? colors.lightWhite : colors.gray}
                                style={[styles.input, {
                                    backgroundColor: digital ? colors.gray : colors.lightWhite,
                                    color: digital ? colors.lightWhite : colors.black,
                                    borderColor: colors.red, borderWidth: (confirmPassword && newPassword !== confirmPassword ?
                                        1 : 0)
                                }]}

                            />
                            <TouchableOpacity
                                onPress={() => setConfirmVisible(!confirmVisible)}
                            >

                                <Image source={confirmVisible ? icons.digital_visible : icons.digital_notVisible}
                                    resizeMode="contain" style={[styles.icon, {
                                        tintColor: digital ? null : colors.black
                                    }]} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </ScrollView>
            <View style={{ padding: 20, }}>
                {
                    digital ?
                        <TouchableOpacity
                        disabled={(newPassword !== confirmPassword) || !(newPassword && oldPassword && confirmPassword)}
                            onPress={handleChangePassword}
                        >
                            <DigitalBotton text={langData.updatePass}/>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity
                            disabled={(newPassword !== confirmPassword) || !(newPassword && oldPassword && confirmPassword)}
                            onPress={handleChangePassword}
                        >
                            <TradidionalButton text={langData.updatePass}/>
                        </TouchableOpacity>
                }

            </View>

            {
                modal &&
                <AlertBox title={title} myaTitle={mmTitle} modal={modal} setModal={setModal} />
            }

        </SafeAreaView>
    )
}

export default ChangePassword

const styles = StyleSheet.create({
    container: { flex: 1 },
    input: { ...style.textinput, ...style.shadow, fontFamily: 'Lato-Regular' },
    forgot: { marginVertical: 10, ...fonts.LT_body2, color: colors.black },
    icon: { position: 'absolute', right: 10, width: 25, height: 25, bottom: 10 },
  

})