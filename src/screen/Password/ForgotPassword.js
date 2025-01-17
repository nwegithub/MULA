import React,{useState} from "react";
import {View,Text,SafeAreaView,TextInput,StyleSheet,TouchableOpacity,TouchableWithoutFeedback,Dimensions,Modal} from "react-native"
import { fonts } from "../../constant/theme";
import {style}  from "../../constant/style"
import { colors } from "../../constant/theme";
import { useMutation } from "@apollo/client";
import { REQUEST_OTP_FOR_FORGOTPASS } from "../../graphql/mutations";
import AlertBox from "../../component/AlertBox";
import Loading from "../../component/Loading";
import ModalWrapper from "../../component/ModalWrapper";

const width = Dimensions.get('screen').width

const ForgotPassword = ({navigation}) => {

    const [phone,setPhone] = useState("")
    const [modal,setModal] = useState(false)
    const [title,setTitle] = useState()
    const [loading,setLoading] = useState(false)

    const [forgetPassword] = useMutation(REQUEST_OTP_FOR_FORGOTPASS)

    const handleforgetPassword = async () => {
         try{

         setLoading(true)
        const response = await forgetPassword({variables: {phone}});
            console.log(response)
        if(response.data.forgetPassword.error){
            setModal(true)
            setTitle(response.data.forgetPassword.message)
        } else {
        
        navigation.navigate('Otp',{
            userData:{
                phone,
            }
        })
    }
    setLoading(false)
    }catch(e){
        console.log(e)
    }
    }
    if(loading){
        return <Loading/>
    }

    return(
        <SafeAreaView style={{flex:1,}}>
            
            <View style={[styles.content,{marginTop:30,flex:1}]}>
                
                <Text style={{...fonts.LT_h1,color:colors.primary,marginTop:20}}>
                Please Fill 
                
                </Text>
                <Text style={{...fonts.LT_h1,color:colors.primary,marginTop:10}}>
                
                Your Phone Number:
                </Text>

                <TextInput
                        value={phone}
                        onChangeText={(text) => setPhone(text)}
                        placeholder="Phone Number"
                        placeholderTextColor={colors.gray}
                        keyboardType="phone-pad"
                        style={[styles.input,{color:colors.black}]}
                        />
             <TouchableOpacity
             disabled={!phone}
                        onPress={handleforgetPassword}
                        style={[styles.btn,{backgroundColor: !phone ? colors.lightYellow: colors.primary}]}
                        >
                            <Text style={styles.btnText}>Submit</Text>
            </TouchableOpacity>
          
            </View>
            <ModalWrapper modalOpen={modal} setModalOpen={setModal}>
            <View style={{...style.center}}>
            <Text style={{...fonts.LT_body2,color:colors.black,marginTop:10,lineHeight:Platform.OS === 'ios'? 0:25,
                        textAlign:'center'}}> {title}</Text>
                            <TouchableOpacity
                            onPress={() =>{ setModal(false)}}
                            style={{backgroundColor:colors.primary,padding:10,borderRadius:5,width:80,marginTop:20}}
                            >
                                <Text style={{color:colors.lightWhite,...fonts.LT_body4,textAlign:'center',lineHeight:Platform.OS === 'ios'? 0:20}}> OK</Text>
                            </TouchableOpacity>
            </View>
            
            </ModalWrapper>

     
                
        </SafeAreaView>
    )
}

export default ForgotPassword

const styles = StyleSheet.create({
    input:{...style.textinput,...style.shadow,backgroundColor:colors.lightWhite,marginTop:40,
    fontFamily:'Lato-Regular'},
    content:{padding:20,},
    btn:{...style.button,marginTop:60},
    btnText:{color:colors.lightWhite,...fonts.LT_body1},

})