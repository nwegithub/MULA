import React,{useContext,useEffect,useMemo,useState} from "react";
import {
    View,
    Text,
    SafeAreaView,
    StyleSheet,
    ImageBackground,
    Image,
    TouchableOpacity,
    Alert,
    Platform
} from "react-native";
import { Context } from "../../../component/Context";
import { colors, fonts } from "../../../constant/theme";
import { launchImageLibrary } from "react-native-image-picker";
import { style } from "../../../constant/style";
import icons from "../../../constant/icons";
import MyCollection from "./Component/MyCollection";
import Favourite from "./Component/Favourite";
import images from "../../../constant/images";
import { GET_IMAGE_UPLOAD_URL,UPDATE_USER_IMAGE } from "../../../graphql/mutations";
import { useMutation,useQuery,useLazyQuery } from "@apollo/client";
import { GET_USER } from "../../../graphql/queries";
import AlertBox from "../../../component/AlertBox";
import Loading from "../../../component/Loading";
import { scaleHeight, scaleWidth } from "../../../utils/responsive";


const Profile = ({navigation}) =>{

    const {digital,language,langData,user,theme} = useContext(Context)
    const [uploadProfile,setUploadProfile] = useState(null)
    const [modal,setModal] = useState(false)
    const [title,setTitle] = useState("")
    const [myaTitle,setMyaTitle] = useState("")

    const [tab,setTab] = useState(1)
    

    const [getImageUploadUrl] = useMutation(GET_IMAGE_UPLOAD_URL)
    const [updateUserImgae] = useMutation(UPDATE_USER_IMAGE,{refetchQueries:[GET_USER]})

    const {data,loading,error} = useQuery(GET_USER,{variables:{
        userId:user.id
    },fetchPolicy:'network-only'})

    
    const imageUpload = async () =>{
        const response = await launchImageLibrary({
            mediaType: 'photo',
            selectionLimit: 1,
            includeExtra: true,
            quality: 0.3,
            
        })
        if (!response.didCancel) {
            let img = await uploadImage(response.assets[0].uri)
      
            await handleUpdateUserImage(img)
        }

       

    }

    const uploadImage = async (photo) => {
        try {
            const imageUploadUrl = await getImageUploadUrl();
            const imageUri = await fetch(photo);
            const blobImage = await imageUri.blob();
            const uploadedImageUrl = await fetch(imageUploadUrl.data.getImageUploadUrl.imageUploadUrl, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'image/*',
                    'x-amz-acl': 'public-read',
                },
                body: blobImage,
            });
            return uploadedImageUrl.url.split('?')[0];
        } catch (e) {
            console.log(e);
        }
    };

   
    const handleUpdateUserImage = async (img) => {
         
        await updateUserImgae ({
            variables:{
                userId:user.id,
            profile_image_url: img
            }
        })
       setModal(true)
       setTitle("Image Uploaded")
       setMyaTitle("ပုံတင်ပြီးပါပြီ") 
    }

    
   
    if(!data){
        return <Loading/>
    }

    return(
        <>
        
            <ImageBackground source={ digital? images.digital_bg : images.tradi_bg
        } style={{flex:1,height:'100%'}}>
            <SafeAreaView style={styles.container}>

                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                   style={{paddingLeft:16,paddingTop:Platform.OS === 'android'? 20 : 0 }}
                >
                    <Image source={icons.digital_back_arrow}
                           resizeMode="contain"
                           style={{width:scaleWidth(25),height:scaleHeight(25),tintColor:digital? null : colors.primary}}/>
                </TouchableOpacity>

             
           <View style={{padding:20}}>

                <View style={styles.profile}>
                <TouchableOpacity
                onPress={() => {imageUpload()}}
                >
                    {
                        data?.users_by_pk.profile_image_url !== null ?
                            <Image source={{
                                uri:  data?.users_by_pk.profile_image_url
                            }}
                                   style={styles.profileImg}
                            />
                            :
                            <Image source={icons.profile}
                                   resizeMode="contain"
                                   style={[{tintColor:digital? colors.lightWhite : colors.primary,width:scaleWidth(50),height:scaleHeight(50)}]}/>
                    }
                    <View style={styles.cameraContainer}>
                        <Image source={icons.camera} style={{width:'100%',height:'100%',tintColor:digital? null: colors.primary}}/>
                    </View>
               
                </TouchableOpacity>
                    <Text style={[styles.name,{color:theme.secColor}]}>{data?.users_by_pk.fullname}</Text>
                    
                </View>
            </View>
             
            <View style={{
        height: 48,  flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
      }}>


             <TouchableOpacity
             onPress={() => setTab(1)}
            //  style={{borderBottomColor:theme.secColor,borderBottomWidth:2,}}
             >
                    <Text style={[styles.tabTitle,{color:theme.secColor}]}>{language === 'mm'? "ကျွန်ုပ်၏စုဆောင်းမှု" :"My Collected Artwork"}</Text>
             </TouchableOpacity>
             <TouchableOpacity
             onPress={() => setTab(2)}
             >
                    <Text style={[styles.tabTitle,{color:theme.secColor}]}>{language === 'mm'? "အနှစ်သက်ဆုံး" :"Favourites"}</Text>
             </TouchableOpacity>

             </View>

             {
                tab === 1 ?
                <MyCollection navigation={navigation}/>
                :
                <Favourite navigation={navigation}/>
             }
             
        
        <AlertBox modal={modal} setModal={setModal} title={title} myaTitle={myaTitle}/>

        </SafeAreaView>
            </ImageBackground>

       
        
        </>
    )
}
export default Profile

export const styles = StyleSheet.create({
    container:{flex:1},
    edit:{alignItems:'flex-end',...style.flexRow,justifyContent:'flex-end'},
    iconSize:{width:20,height:20,margin:5},
    profile:{...style.center,marginTop:20},
    profileImg:{width:80,height:80,borderRadius:50},
    name:{...fonts.LT_body2,marginTop:5},
    cameraContainer:{position:'absolute',right:0,bottom:5,backgroundColor:colors.lightWhite,borderRadius:20,width:30,height:30},
    backContainer:{position:"absolute",left:16,top:16,},
    tabTitle:{
    textTransform:'capitalize',fontSize:15,fontFamily:'Lato-Semibold'}
})