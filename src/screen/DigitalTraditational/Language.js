import React,{useContext, useState} from "react";
import {View,Text,SafeAreaView, StyleSheet,TouchableOpacity,Image,Alert,Platform} from "react-native"
import { Context } from "../../component/Context";
import { colors,fonts } from "../../constant/theme";
import { style } from "../../constant/style";
import icons from "../../constant/icons";
import { scaleWidth,scaleHeight } from "../../utils/responsive";
import HeaderComponent from "../../component/HeaderComponent";
import appStorage from "../../utils/appStorage";

const Language = ({navigation}) => {

    const {digital,language,setLanguage,langData} = useContext(Context)

    const saveLanguage = async (selectedLanguae) => {
        await appStorage.saveItem("Language",selectedLanguae)
        setLanguage(selectedLanguae)
        
    } 

    

    return(
        <SafeAreaView style={[styles.container,{backgroundColor:digital? colors.darkBlack: colors.white}]}>
            <HeaderComponent title="Language" parentScreenName="Drawer" myaTitle="ဘာသာစကား" navigation={navigation}/>

             <View style={{padding:20}}>

            <View style={[styles.content,{backgroundColor:digital? colors.gray: colors.lightWhite}]}>

            <TouchableOpacity
            onPress={() => saveLanguage('eng')}
                style={styles.innerView}
                >
                    <Text style={[styles.txt,{color:digital? colors.lightWhite:colors.black}]}>
                      {langData.english}  
                    </Text>
                    <Image source={language === 'eng' ? icons.cirChcek : icons.cirUncheck} resizeMode="contain"
                    style={[styles.icon,{tintColor:digital? null: colors.primary}]}/>
                    

                </TouchableOpacity>
                <View style={{backgroundColor:digital?colors.lightWhite : colors.gray,height:1,marginVertical:10}}/>
                <TouchableOpacity
                onPress={() => saveLanguage('mm')}
                style={styles.innerView}
                >
                    <Text style={[styles.txt,{color:digital? colors.lightWhite:colors.black}]}>
                        {langData.myanmar}
                       
                    </Text>
                    <Image source={language !== 'eng'? icons.cirChcek : icons.cirUncheck} resizeMode="contain"
                    style={[styles.icon,{tintColor:digital? null: colors.primary}]}/>
                    

                </TouchableOpacity>
            </View>
            {/* {
                modal &&
                <QusAlertBox title={"Are you sure you want to delete this account?"} modal={modal}
                setModal={setModal} handleOk={handleDeleteAccount}
                />
            } */}
            </View>
        </SafeAreaView>
    )
}

export default Language

const styles = StyleSheet.create({
    container:{flex:1},
    content:{padding:20,borderRadius:10,},
    innerView:{...style.flexRowSpace},
    icon:{width:scaleWidth(23),height:scaleHeight(23)},
    txt:{...fonts.LT_body5,lineHeight:Platform.OS === 'ios'?0: scaleHeight(25)}
})