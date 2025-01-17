import 'react-native-gesture-handler';
import React,{useState,useEffect} from "react";
import {TouchableOpacity,Text,View,Image} from "react-native"
import { Context } from "./src/component/Context";
import StactNavigation from "./src/navigation/StackNavigation";
import {DefaultTheme, NavigationContainer} from "@react-navigation/native";
import icons from "./src/constant/icons";
import { GET_USER } from "./src/graphql/queries";
import { useLazyQuery } from "@apollo/client";
import storage from "./src/utils/storage";
import jwt_decode from 'jwt-decode'
import { navigationRef } from "./src/navigation/rootNavigation";
import appStorage from "./src/utils/appStorage";
import Loading from "./src/component/Loading";
import eng from "./src/utils/Language/English.json"
import mm from "./src/utils/Language/Myanmar.json"
import { colors } from './src/constant/theme';




const App = () =>{ 
   
  const [digital,setDigital] = useState(false)
  const [language,setLanguage] = useState("eng")
  const [loading, setLoading] = useState(false);
  const [user,setUser] = useState(null)
  const [firstTime,setFirstTime] = useState(false)
   

    const [getUserData] = useLazyQuery(GET_USER, {fetchPolicy: 'network-only'});

    const theme = {
      mainColor: digital? colors.lightWhite : colors.primary,
      secColor: digital? colors.lightWhite : colors.black,
      thirdColor: digital? colors.gray : colors.black,
      bgColor : digital? colors.darkBlack : colors.white
    }

    let langData

    (language === 'eng') ? 
      langData = eng 
      :
      langData = mm

      !language && appStorage.saveItem('Language', 'eng')

    useEffect(() => {
      const start = async () => {

          setLoading(true);
          const value = await appStorage.getItem("firstTime")
        if (value === "false") {
            setFirstTime(false)
        } else {
            setFirstTime(true) 
        }

        const lanValue = await appStorage.getItem("Language")
        if(lanValue){
          setLanguage(lanValue)
        }

        const artworkType = await appStorage.getItem("ArtworkType")
        if(artworkType == "false"){
          setDigital(false)
        }else{
          setDigital(true)
        }
        
          const token = await storage.getToken();


          if (token) {
              if (token.length < 8) {
                  await storage.clearToken();
                  setLoading(false);
              } else {
                  const {user_id} = jwt_decode(token);
                  const userData = await getUserData({variables: {userId: user_id}});

                  setUser(userData.data.users_by_pk);
                  setLoading(false);
              }
          }
          setLoading(false);
      };
      start();
  }, []);


  if(loading){
    return <Loading/>
  }

  return(
    <Context.Provider value={{digital,setDigital,user,setUser,firstTime,setFirstTime,langData,language,setLanguage,theme}}>
   <NavigationContainer
   ref={navigationRef}
   theme={{
       ...DefaultTheme,

       colors: {
           ...DefaultTheme.colors,
           background:colors.white,
       },
   }}
   >
      
      
      <StactNavigation/> 
      
   
   </NavigationContainer>
   </Context.Provider>
  
  )
}
export default App