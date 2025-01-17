import React,{useState,useContext} from "react";
import {View,Text,SafeAreaView,StyleSheet,TextInput,TouchableOpacity, Image,Modal,
    KeyboardAvoidingView,ScrollView,TouchableWithoutFeedback,Dimensions} from "react-native"
import icons from "../constant/icons";
import { style } from "../constant/style";
import { colors, fonts } from "../constant/theme";
import DatePicker from "../component/DatePicker";
import { useMutation } from "@apollo/client";
import { CREATE_USER } from "../graphql/mutations";
import AlertBox from "../component/AlertBox";
import { Context } from "../component/Context";
import ModalWrapper from "../component/ModalWrapper";

const width = Dimensions.get('screen').width

const PersonalInfo = ({navigation,route}) => {

    const [open,setOpen] = useState(false)
    const [genderVisible,setGenderVisible] = useState(false)
    const [date,setDate] = useState(new Date())
    const [dob,setDob] = useState("Date Of Birth")
    const [genderData,setGenderData] = useState("Gender")
    const [fullname,setFullName] = useState("")
    const [modal,setModal] = useState(false)
    const [title,setTitle] = useState('')
   

    const gender = ["Male","Female","Other"]

    const {digital,myanmar} = useContext(Context)

    const {userData} = route.params

    

    const [createUser] = useMutation(CREATE_USER)

    const handleSubmit = async() => {

        const response = await createUser({
            variables:{
                otp:userData.otp,
                password:userData.userData.password,
                phone:userData.userData.phone,
                dob:dob,
                gender:genderData,
                fullname:fullname,
                
            }
        })
        if(response.data.SignUp.error){
            setModal(true)
            setTitle(response.data.SignUp.message)
        }else {
            setModal(true)
            setTitle(response.data.SignUp.message);
            navigation.pop(3)
            
        }
    }

    return(
        <SafeAreaView style={styles.container}>
            <ScrollView style={{flex:1,}}
            showsVerticalScrollIndicator={false}
             >
            <KeyboardAvoidingView style={{}} 
             behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
            <View style={styles.content}>

                <View style={styles.content1}>

                <Text style={styles.header}>Please Fill</Text>
                <Text style={styles.header}>Your Personal Information</Text>
                </View>

                <View style={styles.content2}>
                        <TextInput
                        value={fullname}
                        placeholder="Full Name"
                        placeholderTextColor={colors.gray}
                        onChangeText={(text) => setFullName(text)}
                        style={styles.input}
                        />

                        
                       

                       
                    

                            <TouchableOpacity
                                onPress={() => setOpen(true)}
                                style={{marginTop:15,...styles.input, alignItems:'center', ...style.flexRowSpace,}}>

                                    <DatePicker open={open} setOpen={setOpen} date={date} setDate={setDate} dob={dob} setDob={setDob}/>

                                    <Text style={{color:colors.black}}>
                                {dob}
                                </Text>
                                            <Image source={icons.calendar} style={styles.icon}/>
                                        </TouchableOpacity>
                     

                        
                        <TouchableOpacity
                        style={[styles.input,{padding:10,marginBottom:50,justifyContent:'center'}]}
                        onPress={() => setGenderVisible(true)}
                        >

                            <Text style={styles.gender}>{genderData}</Text>

                            {
                                genderVisible &&
                                <View style={styles.genderContainer}>
                                 {
                                    gender.map((item,index) => {
                                        return(
                                            <TouchableOpacity 
                                            onPress={() => {setGenderData(item),
                                            setGenderVisible(false)}}
                                            key={index}
                                            style={styles.genderContent}
                                            >
                                                <Text style={{color:colors.black}}>{item}</Text>
                                
                                            </TouchableOpacity>
                                        )
                                    }
                                    )
                                }
                                </View>

                        
                            }

                        </TouchableOpacity>
                           
                      

                </View>

            </View>
                 
               

            </KeyboardAvoidingView>
          
            </ScrollView>

            <View style={{padding:20,marginBottom:20,}}>
            <TouchableOpacity
                        onPress={handleSubmit}
                        style={[styles.btn,{backgroundColor: !(fullname && dob && genderData)? colors.lightYellow: colors.primary}]}
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

export default PersonalInfo

const  styles = StyleSheet.create({
    container:{flex:1,},
    content:{padding:20,},
    header:{...fonts.h2,color:colors.primary},
    content1:{margin:10,},
    content2:{margin:5,},
    input:{...style.textinput,...style.shadow,backgroundColor:colors.lightWhite,color:colors.black},
    btn:{...style.button,},
    btnText:{color:colors.lightWhite,...fonts.body2},
    icon:{width:25,height:25},
    iconPos:{position:'absolute',right:10,top:35},
    genderContainer:{position:'absolute',top:0,left:0,right:0,backgroundColor:colors.lightWhite,
borderRadius:20,},
genderContent:{padding:10,paddingLeft:20},
gender:{color:colors.black},

    
})