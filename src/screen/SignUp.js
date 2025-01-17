import React,{useState,useRef, useEffect,useContext} from "react";
import {
    View,
    Text,
    ImageBackground,
    SafeAreaView,
    StyleSheet,
    TextInput,
    Image,
    TouchableOpacity,
    Linking,
    KeyboardAvoidingView,
    ScrollView,
    Platform,
    StatusBar
} from "react-native"
import icons from "../constant/icons";
import { style } from "../constant/style";
import { colors, fonts } from "../constant/theme";
import { useMutation } from "@apollo/client";
import { REQUEST_OTP } from "../graphql/mutations";
import AlertBox from "../component/AlertBox";
import Loading from "../component/Loading";
import {Context} from "../component/Context";


const SignUp = ({navigation}) =>{

    const [phone,setPhone] = useState("")
    const [createPass,setCreatePass] = useState("")
    const [confirmPass,setConfirmPass] = useState("")
    const [visible,setVisible] = useState()
    const [visible1,setVisible1] = useState()
    const [check,setCheck] = useState()
    const [modal,setModal] = useState(false)
    const [title,setTitle] = useState()
    const [loading,setLoading] = useState(false)

    const {digital} = useContext(Context)

    const [requestOTP] = useMutation(REQUEST_OTP)

    const handleRequestOTP = async () => {
        try {
            setLoading(true)
            const response = await requestOTP({variables: {phone}});

            if(response.data.requestOTP.error){
                setModal(true)
                setTitle(response.data.requestOTP.message);
            }

            navigation.navigate('Otp',{
                userData:{
                    phone,
                    password:confirmPass
                }
            })
            setLoading(true)
        }catch (e) {
           console.log(e)
        }

    }

if(loading){
    return  <Loading/>
}


    return(
        <SafeAreaView style={styles.container}>
            <StatusBar
                barStyle={'dark-content'}
                animated={true}
                backgroundColor= {digital? colors.darkBlack : colors.primary}

            />
            <ImageBackground source={{uri:'https://axra.sgp1.digitaloceanspaces.com/Mula/signIn.png'}} resizeMode="cover" style={styles.img}>
            <ScrollView style={{flex:1,}}
            showsVerticalScrollIndicator={false}
             contentContainerStyle={{padding:20}}>
            <KeyboardAvoidingView style={{flex:1}} 
             //behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <View style={styles.content}>
                    <View style={styles.logoContainer}>
                        <Image source={icons.logo} resizeMode="contain" style={styles.icon}/>
                    </View>
                    <View style={styles.content1}>
                        <Text style={styles.title}>Sign Up</Text>
                        <TextInput
                        value={phone}
                        placeholder="Phone Number"
                        placeholderTextColor={colors.gray}
                        onChangeText={(text) => setPhone(text)}
                        keyboardType="phone-pad"
                        style={styles.input}
                        />

                        
                        <View>
                            <TextInput
                            value={createPass}
                            placeholder="Create Password"
                            placeholderTextColor={colors.gray}
                            onChangeText={(text) => setCreatePass(text)}
                            style={[styles.input,]}
                            secureTextEntry={!visible}
                        
                            />
                            <TouchableOpacity 
                            onPress={() => setVisible(!visible)}
                            >
                            
                            <Image source={ visible ? icons.visible : icons.notVisible } style={{position:'absolute',right:10,width:25,height:25,bottom:10}}/>
                            </TouchableOpacity>
                        </View>

                        <View>
                            <TextInput
                            value={confirmPass}
                            placeholder="Confirm Password"
                            placeholderTextColor={colors.gray}
                            onChangeText={(text) => setConfirmPass(text)}
                            style={[styles.input,{borderColor:colors.red,borderWidth: ( confirmPass && createPass !== confirmPass) ? 1:0,}]}
                            secureTextEntry={!visible1}
                        
                            />
                            <TouchableOpacity 
                            onPress={() => setVisible1(!visible1)}
                            >
                            
                            <Image source={ visible1 ? icons.visible : icons.notVisible } style={{position:'absolute',right:10,width:25,height:25,bottom:10}}/>
                            </TouchableOpacity>
                        </View>
                      

                    <View style={styles.content2}>
                        <TouchableOpacity 
                        onPress={() =>setCheck(!check)}
                        >
                            
                                <Image source={check? icons.recCheck : icons.recUncheck} style={{width:20,height:20}}/>
    
                        </TouchableOpacity>
                        <View style={{...style.flexRow}}>
                        <Text style={[styles.socialText,{color:colors.black}]}> Accept all of </Text>
                        <TouchableOpacity
                        onPress={() => Linking.openURL('https://www.mula.com.mm/privacypolicy')}
                        >
                        <Text style={styles.socialText}>privacy policy, </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                        onPress={() => Linking.openURL('https://www.mula.com.mm/terms&conditions')}
                        >
                        <Text style={styles.socialText}> term & conditions</Text>
                        </TouchableOpacity>
                        </View>
                        
                    </View>
                        <TouchableOpacity
                        disabled={!(phone && createPass && confirmPass && createPass=== confirmPass && check)}
                        onPress={handleRequestOTP}
                        style={[styles.btn,{backgroundColor: !check? colors.lightYellow : colors.primary }]}
                        >
                            <Text style={styles.btnText}>Sign Up</Text>
                        </TouchableOpacity>

                        

                        <View style={styles.qus}>
                            <Text style={styles.qusText}>Don’t you have an account ?</Text>
                            <TouchableOpacity
                            onPress={() => navigation.navigate('Sign In')}
                            >
                            <Text style={[styles.qusText,{color:colors.primary}]}> Sign In</Text>
                            </TouchableOpacity>
                        </View>


                    </View>
                    <AlertBox title={title} modal={modal} setModal={setModal}/>
                </View>
                </KeyboardAvoidingView>
                </ScrollView>
            </ImageBackground>

        </SafeAreaView>
    )
}
export default SignUp

const styles = StyleSheet.create({
    container:{flex:1},
    img:{width:'100%',height:'100%'},
    content:{},
    logoContainer:{height:150,...style.center,},
    icon:{width:150,height:150},
    title:{...fonts.LT_h1,color:colors.black},
    content1:{},
    input:{...style.textinput,...style.shadow,backgroundColor:colors.lightWhite,color:colors.black,fontFamily:'Lato-Regular'},
    forgot:{marginVertical:10,...fonts.body3,marginLeft:5,color:colors.black},
    btn:{...style.button,marginVertical:20},
    btnText:{color:colors.lightWhite,...fonts.LT_body1},
    text:{marginHorizontal:10,...fonts.body2,color:colors.black},
    icon1:{width:90,height:50},
    otherSignIn:{...style.flexRow,alignItems:'center',justifyContent:'center'},
    social:{borderRadius:10,backgroundColor:colors.lightWhite,padding:10},
    icon2:{...style.icon},
    qus:{alignItems:'center',flexDirection:'row',justifyContent:'center'},
    qusText:{...fonts.body2,color:colors.black,...fonts.LT_body1},
    content2:{...style.flexRow},
    socialText:{color:colors.primary,marginVertical:10,...fonts.LT_body6}
    
})