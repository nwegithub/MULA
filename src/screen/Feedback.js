import React,{useState,useContext} from "react";
import { View,Text,TouchableOpacity,TextInput,SafeAreaView ,StyleSheet,ImageBackground} from "react-native";
import { colors } from "../constant/theme";
import { fonts } from "../constant/theme";
import { Context } from "../component/Context";
import BackHeaderComponent from "../component/BackHeaderComponent";
import { scaleHeight } from "../utils/responsive";
import images from "../constant/images";
import { DigitalBotton,TradidionalButton } from "../utils/helper";
import { ADD_FEEDBACK } from "../graphql/mutations";
import { useMutation } from "@apollo/client";
import Loading from "../component/Loading";
import AlertBox from "../component/AlertBox";

const Feedback = ({navigation})  => {

    const {theme,digital,langData,user} = useContext(Context)

    const [subject,setSubject] = useState("")
    const [message,setMessage] = useState("")
    const [loading,setLoading] = useState(false)
    const [modal,setModal] = useState(false)
    const [title,setTitle] = useState("")
    const [myaTitle,setMyaTitle] = useState("")


    const [addFeedback] = useMutation(ADD_FEEDBACK)

    const handleSendFeedback = async () => {
        setLoading(true)
        await addFeedback({variables:{
            userId:user.id,
            subject,
            message
        }})

        setLoading(false)
        setModal(true)
        setTitle("Sent feedback")
        setMyaTitle("တုံ့ပြန်ချက်ကိုပေးပို့ ပြီးပါပြီ")

        setSubject("")
        setMessage("")
    }
if(loading){
    return <Loading/>
}
    return(
        
        <ImageBackground
        source={digital ? images.digital_bg : images.tradi_bg
        }
        style={styles.container}
        >
        <SafeAreaView style={[styles.container]}>
            <BackHeaderComponent navigation={navigation} />
            <View style={styles.content}>

                <Text style={[styles.title,{color:theme.secColor}]}>Feedback Form</Text>

                <View style={styles.content1}>
                <Text style={[styles.body,{color:theme.secColor}]}>Subjects</Text>
                <TextInput
                value={subject}
                onChangeText={(text) => setSubject(text)}
                placeholder="Enter Subjects"
                placeholderTextColor={colors.gray}
                style={[styles.input,{color:colors.black,}]}
                />
                </View>

                <View style={styles.content1}>
                <Text style={[styles.body,{color:theme.secColor}]}>Message</Text>
                <TextInput
                value={message}
                onChangeText={(text) => setMessage(text)}
                placeholder="Enter Message"
                placeholderTextColor={colors.gray}
                multiline={true}
                style={[styles.input,{color:colors.black,height:scaleHeight(120),textAlignVertical:'top',paddingTop:15}]}
                />
                </View>

                

            </View>
            <View style={{padding:20}}>
                {
                    digital? 
                    <TouchableOpacity 
                    disabled={!(subject || message)}
                    onPress={handleSendFeedback}
                    >
                        <DigitalBotton text={langData.sendFeedback}/>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity
                    disabled={!(subject || message)}
                    onPress={handleSendFeedback}
                    >
                        <TradidionalButton text={langData.sendFeedback}/>
                    </TouchableOpacity>
                }

            </View>
            <AlertBox title={title} myaTitle={myaTitle} modal={modal} setModal={setModal}/>

        </SafeAreaView>
        </ImageBackground>
    )
}
export default Feedback

const styles = StyleSheet.create({
    container:{flex:1,},
    content:{padding:16,flex:1,},
    content1:{marginTop:20},
    title:{...fonts.LT_h2,textAlign:'center'},
    body:{...fonts.LT_body2},
    input:{height:scaleHeight(45),paddingLeft:20,borderRadius:10,marginTop:8,backgroundColor:colors.white}
})