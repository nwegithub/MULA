import React,{useState,useContext} from "react";
import {
    View, Text, ImageBackground, SafeAreaView, StyleSheet, TextInput, Image, TouchableOpacity,
    Platform, KeyboardAvoidingView, ScrollView, Modal, TouchableWithoutFeedback, Dimensions, StatusBar
} from "react-native"
import icons from "../constant/icons";
import { style } from "../constant/style";
import { colors, fonts } from "../constant/theme";
import { AUTHENICATE } from "../graphql/mutations";
import { GET_USER } from "../graphql/queries";
import { useMutation } from "@apollo/client";
import { useLazyQuery } from "@apollo/client";
import jwt_decode from "jwt-decode"
import storage from "../utils/storage";
import { Context } from "../component/Context";
import Loading from "../component/Loading";
import AlertBox from "../component/AlertBox";
import ModalWrapper from "../component/ModalWrapper";

const width = Dimensions.get('screen').width

const SignIn = ({navigation,route}) =>{

    const [visible,setVisible] = useState()
    const [phone,setPhone] = useState("")
    const [password,setPassword] = useState("")
    const {setUser} = useContext(Context)
    const [loading,setLoading] = useState(false)
    const [modal,setModal] = useState(false)
    const [title,setTitle] = useState('')

    const [authorize] = useMutation(AUTHENICATE)
    const [getUserData] = useLazyQuery(GET_USER, {fetchPolicy: 'network-only'});

    const {digital} = useContext(Context)
    const redirectTo = route.params?.redirectTo

    const auth = async (accessToken) => {
        const {user_id} = jwt_decode(accessToken);
        await storage.saveToken(accessToken);
        const userData = await getUserData({variables: {userId: user_id}});
        setUser(userData.data.users_by_pk);
        if (redirectTo) {
            if (redirectTo === "BACK") {
                navigation.goBack()
            } else navigation.replace(redirectTo)
        }
    };


    const handleSignin = async () => {
        try {
           setLoading(true)
            const response = await authorize({variables: {phone, password}});
            
            if (response.data.Login.error) {
                setModal(true)
                setTitle(response.data.Login.message);
            } else {
                await auth(response.data.Login.accessToken);
            }
            setLoading(false)
           
        } catch (e) {
            console.log(e);
           setLoading(false)

        }
    };

    if(loading) {
        return <Loading/>
    }

    return(
        <SafeAreaView style={styles.container}>
            <StatusBar
                barStyle={ 'dark-content'}
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
                <View style={{}}>
                    <View style={styles.logoContainer}>
                        <Image source={icons.logo} resizeMode="contain" style={styles.icon}/>
                    </View>
                    <View style={styles.content1}>
                        <Text style={styles.title}>Sign In </Text>
                        <TextInput
                        value={phone}
                        onChangeText={(text) => setPhone(text)}
                        placeholderTextColor={colors.gray}
                        placeholder="Phone Number"
                        keyboardType="phone-pad"
                        style={styles.input}
                        />

                        
                        <View>
                            <TextInput
                            value={password}
                            placeholder="Password"
                            onChangeText={(text) => setPassword(text)}
                            placeholderTextColor={colors.gray}
                            style={styles.input}
                            secureTextEntry={!visible}
                        
                            />
                            <TouchableOpacity 
                            onPress={() => setVisible(!visible)}
                            >
                            
                            <Image source={ visible ? icons.visible : icons.notVisible } style={{position:'absolute',right:10,width:25,height:25,bottom:10}}/>
                            </TouchableOpacity>
                        </View>
                        
                        <TouchableOpacity
                        onPress={() => navigation.navigate('Forgot Password')}
                        >
                        <Text style={styles.forgot}>
                        
                            Forgot Password?
                        </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                        disabled={!(phone && password)}
                        onPress={handleSignin}
                        style={[styles.btn,{backgroundColor:!(phone && password) ? colors.lightYellow: colors.primary}]}
                        >
                            
                                <Text style={styles.btnText}>Sign In </Text>

                        </TouchableOpacity>

                        {/* <View style={styles.otherSignIn}>
                            <Image source={icons.line} resizeMode="contain" style={styles.icon1}/>
                            <Text style={styles.text}>or sign in with</Text>
                            <Image source={icons.line} resizeMode="contain" style={styles.icon1}/>
                        </View> */}

                        {/* <View style={[styles.otherSignIn,{marginTop:30}]}>
                            <TouchableOpacity
                            style={styles.social}
                            >
                                <Image source={icons.google} resizeMode="contain" style={styles.icon2}/>
                            </TouchableOpacity>
                            <TouchableOpacity
                            style={[styles.social,{marginHorizontal:15}]}
                            >
                                <Image source={icons.apple} resizeMode="contain" style={styles.icon2}/>
                            </TouchableOpacity>
                            <TouchableOpacity
                            style={styles.social}
                            > 
                                <Image source={icons.facebook} resizeMode="contain" style={styles.icon2}/>
                            </TouchableOpacity>
                        </View> */}

                        <View style={styles.qus}>
                            <Text style={styles.qusText}>Don’t you have an account ?</Text>
                            <TouchableOpacity
                            onPress={() => navigation.navigate('Sign Up')}
                            >
                            <Text style={[styles.qusText,{color:colors.primary}]}> Sign Up</Text>
                            </TouchableOpacity>
                        </View>

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
                  
                </View>
                
                </KeyboardAvoidingView>
                </ScrollView>
            </ImageBackground>

        </SafeAreaView>
    )
}
export default SignIn

const styles = StyleSheet.create({
    container:{flex:1},
    img:{width:'100%',height:'100%'},
    content:{marginHorizontal:20},
    logoContainer:{height:150,...style.center,},
    icon:{width:150,height:150},
    title:{...fonts.LT_h1,color:colors.black},
    content1:{},
    input:{...style.textinput,...style.shadow,backgroundColor:colors.lightWhite,color:colors.black,
    fontFamily:'Lato-Regular'},
    forgot:{marginVertical:10,...fonts.LT_body6,color:colors.primary},
    btn:{...style.button,marginVertical:20},
    btnText:{color:colors.lightWhite,...fonts.LT_body1},
    text:{marginHorizontal:10,...fonts.lato_body2,color:colors.black},
    icon1:{width:90,height:50},
    otherSignIn:{...style.flexRow,alignItems:'center',justifyContent:'center'},
    social:{borderRadius:10,backgroundColor:colors.lightWhite,padding:10},
    icon2:{width:25,height:25},
    qus:{alignItems:'center',justifyContent:'center',flexDirection:'row'},
    qusText:{...fonts.LT_body1,color:colors.black},
    
})