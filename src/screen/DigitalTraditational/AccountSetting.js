import React,{useContext, useState} from "react";
import {View,Text,SafeAreaView, StyleSheet,TouchableOpacity,Image,Alert,Platform} from "react-native"
import { Context } from "../../component/Context";
import { colors, fonts } from "../../constant/theme";
import HeaderComponent from "../../component/HeaderComponent";
import { style } from "../../constant/style";
import icons from "../../constant/icons";
import { scaleHeight, scaleWidth } from "../../utils/responsive";
import { useMutation } from "@apollo/client";
import { DISABLE_USER } from "../../graphql/mutations";
import QusAlertBox from "../../component/QusAlertBox";
import storage from "../../utils/storage";

const AccountSetting = ({navigation}) => {

    const {digital,user,setUser,langData,language} = useContext(Context)
    const [modal,setModal] = useState(false)
    
    const [disableUser] = useMutation(DISABLE_USER)
  

    const handleDeleteAccount = async () => {

            try{
                await disableUser({
                    variables: {userId: user.id},
                });
                navigation.pop(1);
                // alert('your account has been deleted');
                await storage.clearToken();
                setUser(null);
            }catch(e){
                console.log(e)
            }
              
            
    }
   

    return(
        <SafeAreaView style={[styles.container,{backgroundColor:digital? colors.darkBlack: colors.white}]}>
            <HeaderComponent title="Account Setting" myaTitle="အကောင့်ဆက်တင်များ" parentScreenName="Drawer" navigation={navigation}/>
            <View style={{padding:20}}>
            <View style={[styles.content,{backgroundColor:digital? colors.gray: colors.lightWhite}]}>

            <TouchableOpacity
            onPress={() => navigation.navigate('Change Password')}
                style={styles.innerView}
                >
                    <Image source={icons.digital_lock} resizeMode="contain"
                    style={[styles.icon,{tintColor:digital? null: colors.primary}]}/>
                    <Text style={[styles.txt,{color:digital? colors.lightWhite:colors.black}]}>
                        {langData.changePass}    
                    </Text>

                </TouchableOpacity>
                <View style={{backgroundColor:digital? colors.white:colors.gray,height:0.5,marginVertical:10}}/>
                <TouchableOpacity
                onPress={() => setModal(true)}
                style={styles.innerView}
                >
                    <Image source={icons.digital_delete} resizeMode="contain"
                    style={[styles.icon,{tintColor:digital? null: colors.primary}]}/>
                    <Text style={[styles.txt,{color:digital? colors.lightWhite:colors.black}]}>
                    {langData.deleteAcc}   
                    </Text>

                </TouchableOpacity>
            </View>
            {
                modal &&
                <QusAlertBox title={"Are you sure you want to delete this account?"} myaTitle={"သင်ဤအကောင့်က်ုဖျက်ပစ်ရန်သေချာပီလား"} modal={modal}
                setModal={setModal} handleOk={handleDeleteAccount}
                />
            }
            </View>
        </SafeAreaView>
    )
}

export default AccountSetting

const styles = StyleSheet.create({
    container:{flex:1},
    content:{padding:20,borderRadius:10,},
    innerView:{...style.flexRow},
    icon:{width:scaleWidth(25),height:scaleHeight(25)},
    txt:{...fonts.LT_body5,marginLeft:20,lineHeight:Platform.OS === 'ios' ? 0 : scaleHeight(25)}
})