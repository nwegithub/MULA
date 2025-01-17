import React,{useState,useContext,useEffect} from "react";
import { View,Text,TouchableOpacity,SafeAreaView ,ImageBackground,StyleSheet,Image,ScrollView,FlatList} from "react-native";
import { Context } from "../component/Context";
import images from "../constant/images";
import BackHeaderComponent from "../component/BackHeaderComponent";
import { style } from "../constant/style";
import { scaleHeight, scaleWidth } from "../utils/responsive";
import { colors, fonts } from "../constant/theme";
import { GET_NOTIFICATION } from "../graphql/queries";
import { useQuery } from "@apollo/client";
import Loading from "../component/Loading";
import localStorage from "../utils/localStorage";


const Notification = ({navigation,route})  => {

const {digital,theme} = useContext(Context)

const {notiCount,setNotiCount} = route.params

const {data} = useQuery(GET_NOTIFICATION)

useEffect(() => {
    const start = async () => {
      if (data) {
        await localStorage.saveItem("notiCount", data.notification_history_aggregate.aggregate.count.toString());
      }
    };
    start();
    return () => setNotiCount(0);
  }, [data]);


if(!data){
    return <Loading/>
}

    return(
        <ImageBackground
        source={digital ? images.digital_bg : images.tradi_bg
        }
        style={styles.container}
        >
        <SafeAreaView style={styles.container}>
            <BackHeaderComponent navigation={navigation}
            />
            <ScrollView
            contentContainerStyle={[styles.container,styles.content]}
            showsVerticalScrollIndicator={false}
            >
                <Text style={[styles.title,{color:theme.secColor}]}>Recent</Text>
                <FlatList
                data={data?.notification_history}
                renderItem={({item,index}) =>
                <View 
                style={[styles.boxContainer,{backgroundColor:theme.bgColor}]}
                key={index}
                >
                    <View style={{borderRadius:50}}>
                    <Image
                     source={{uri:item.notification_image_url
                     }}resizeMode="contain" style={styles.image}/>
                    </View>
                   
                     <View style={{flex:1,paddingLeft:5}}>
                        <Text style={[styles.body,{color:theme.mainColor}]}>{item.notification_data.title}</Text>
                        <Text style={[styles.body,{color:theme.mainColor}]}>{item.notification_data.body}</Text>
                     </View>

                </View>
            }
                />

            </ScrollView>

        </SafeAreaView>
        </ImageBackground>
    )
}
export default Notification 

const styles = StyleSheet.create({
    container:{flex:1,},
    content:{padding:16},
    boxContainer:{...style.flexRow,padding:10,borderRadius:5,marginVertical:5},
    image:{width:scaleWidth(50),height:scaleHeight(50),borderRadius:10},
    body:{...fonts.LT_body3},
    title:{...fonts.LT_h2,marginVertical:10}
})