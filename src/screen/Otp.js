import { useMutation } from "@apollo/client";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Dimensions, Modal, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import AlertBox from "../component/AlertBox";
import { Context } from "../component/Context";
import { style } from "../constant/style";
import { colors, fonts } from "../constant/theme";
import { CHECK_OTP, REQUEST_OTP } from "../graphql/mutations";
import ModalWrapper from "../component/ModalWrapper";

const width = Dimensions.get('screen').width

const Otp = ({navigation,route}) => {

    const {userData} = route.params
    const {digital,myanmar} = useContext(Context)
    const routes = navigation.getState()?.routes;
    const prevRoute = routes[routes.length - 2]; 

    
    const inputRef = useRef(null)
    const [code,setCode] = useState("")
    const [modal,setModal] = useState(false)
    const [errModal,setErrModal] = useState(false)
    const [title,setTitle] = useState()
    const [errTitle,setErrTitle] = useState()
    const [seconds, setSeconds] = useState(60);


  const showKeyboard = () => {
    //setIsKeyboardVisible(true);
    inputRef.current.focus();
  };

  const removeFocus = () => {
    inputRef.current.blur()
  }
    
  useEffect(() => {
    if (seconds !== 0) {
        const countdownTimer = setInterval(function () {
            setSeconds(seconds - 1);
        }, 1000);

        return () => {
            clearInterval(countdownTimer);
        };
    }
}, [seconds]);
    
  

    const [checkOTP] = useMutation(CHECK_OTP)
    const [requestOTP] = useMutation(REQUEST_OTP)


        
  

    const handleCheckOTP = async () => {
        const response = await checkOTP({variables:
             {
                otp:code,
                phone:userData.phone,

            }});
            if(response.data.checkOTP.error){
                setErrModal(true)
                setErrTitle(response.data.checkOTP.message)
                removeFocus()
            } else{
                if(prevRoute.name === "Forgot Password"){
                    navigation.navigate('Create Password',{
                        resetData:{
                            code,userData
                        }
                    })
                } else{
                    navigation.navigate('PersonalInfo',{
                        userData:{
                            userData,
                            otp:code
                        }
                    })
                }
               
            }
    }


    useEffect(() => {
        if(code.length === 6){
            handleCheckOTP()
        }
    },[code.length === 6])
 

    const handleResendOTP = async () => {
        setModal(false)
        setCode("")
        try{
            const response = await requestOTP({variables: {phone:userData.phone}});
            setSeconds(60)
        if(response.data.requestOTP.error){
             setModal(false)
             setErrModal(true)
             setErrTitle(response.data.requestOTP.message)
         }
        }catch(e){

            console.log(e)
        }
    }


    const pressResend = () => {
            setModal(true)
            setTitle("We will send you OTP code again")
            removeFocus()
    }


    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.header}>OTP Verification</Text>
                <View style={styles.content1}>
                <Text style={styles.body}>Enter the code from the sms we sent to</Text>
                <Text style={[styles.body,{color:colors.black,marginTop:10}]}>{userData.phone}</Text>
                </View>  

        <TouchableOpacity
                        onPress={showKeyboard}
                        style={{...style.flexRow, alignSelf: 'center', marginTop: 30, marginBottom:10}}>
                     
                        <View style={styles.inputContainer}>
                            {code[0]
                                ?
                                <Text style={styles.text}>
                                    {code[0]}
                                </Text>
                                :
                                <View style={styles.dot}>
                                </View>
                            }
                        </View>
                        <View style={styles.inputContainer}>
                            {code[1]
                                ?
                                <Text style={styles.text}>
                                    {code[1]}
                                </Text>
                                :
                                <View style={styles.dot}>
                                </View>
                            }
                        </View>
                        <View style={styles.inputContainer}>
                            {code[2]
                                ?
                                <Text style={styles.text}>
                                    {code[2]}
                                </Text>
                                :
                                <View style={styles.dot}>
                                </View>
                            }
                        </View>
                        <View style={styles.inputContainer}>
                            {code[3]
                                ?
                                <Text style={styles.text}>
                                    {code[3]}
                                </Text>
                                :
                                <View style={styles.dot}>
                                </View>
                            }
                        </View>
                        <View style={styles.inputContainer}>
                            {code[4]
                                ?
                                <Text style={styles.text}>
                                    {code[4]}
                                </Text>
                                :
                                <View style={styles.dot}>
                                </View>
                            }
                        </View>
                        <TouchableOpacity 
                        onPress={() => inputRef.current.focus()}
                        style={styles.inputContainer}>
                            {code[5]
                                ?
                                <Text 
                                
                                style={styles.text}>
                                    {code[5]}
                                </Text>
                                :
                                <View style={styles.dot}>
                                </View>
                            }
                        </TouchableOpacity>
                        
                    </TouchableOpacity>

          <TextInput
                        autoComplete="sms-otp" // android
                        textContentType="oneTimeCode" // ios
                        autoFocus={true}
                        ref={inputRef}
                        keyboardType="number-pad"
                        value={code}
                        onChangeText={text => setCode(text.replace(/[^0-9]/g, ''))}
                        maxLength={6}
                        style={{
                            width:0,height:0
                        }}
                    />

        <View style={styles.content3}>
                <Text style={[styles.body,{color:colors.black}]}>I didn't receive any code. </Text>
               {seconds===0
               ?
               <TouchableOpacity
               disabled={seconds!==0}
               onPress={pressResend}
               >
                   <Text style={[styles.body,{color:colors.primary}]}>RESEND</Text>
               </TouchableOpacity>
               :
               <Text style={{...fonts.LT_body4,color:colors.black}}>resend in {seconds}s</Text>

               }
        </View>

                       
                        

            </View>
            <ModalWrapper modalOpen={modal} setModalOpen={setModal}>
                <View style={{...style.center}}>
                <Text style={{...fonts.LT_body2,color:digital? colors.lightWhite:colors.black,marginTop:10,lineHeight:Platform.OS === 'ios'? 0:25}}> {title}</Text>
                            <TouchableOpacity
                            onPress={handleResendOTP}
                            style={{backgroundColor:colors.primary,padding:10,borderRadius:5,width:80,marginTop:20}}
                            >
                                <Text style={{color:colors.lightWhite,...fonts.LT_body4,textAlign:'center',lineHeight:Platform.OS === 'ios'? 0:20}}> OK</Text>
                            </TouchableOpacity>

                </View>
            
            </ModalWrapper>
           
            <AlertBox modal={errModal} setModal={setErrModal} title={errTitle} />
        </SafeAreaView>
    )
}

export default Otp

const  styles = StyleSheet.create({
    container:{flex:1},
    content:{padding:20,...style.center,flex:1},
    content1:{marginVertical:20,...style.center},
   
    content3:{...style.flexRow,alignItems:'center'},
    header:{...fonts.LT_h1,color:colors.black,},
    body:{...fonts.LT_body2,color:colors.black},
    dot: {
        height: 40, width: 40,

    },
    text:{
        fontSize:24,fontWeight:'bold',textAlign:'center',color:colors.black
      },
      inputContainer:{
        marginRight:10,borderWidth:1,borderColor:colors.primary,width:40,height:40,borderRadius:4,...style.center
      },
      btn:{...style.button,marginTop:140},
    btnText:{color:colors.lightWhite,...fonts.LT_body2},
    minute:{color:colors.primary,...fonts.LT_body2},


})
