import React,{useState} from "react";
import {View,Text,SafeAreaView,StyleSheet, TouchableOpacity,Image,FlatList} from "react-native"
import icons from "../constant/icons";
import { style } from "../constant/style";
import { colors, fonts } from "../constant/theme";

const UserType = ({navigation}) => {

    const [selected,setSelected] = useState("Male")
    const [selected1,setSelected1] = useState()

    const gender =["Male","Female","Others"]
     
    const data =[
        {
            id:1,
            name:"Artist",
            img:icons.artis
        },
        {
            id:2,
            name:"Reseller",
            img:icons.reseller
        },
        {
            id:3,
            name:"User",
            img:icons.user
        }
    ]

    

    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.header}>Gender</Text>


                <View style={{padding:20}}>                
                <FlatList
                horizontal
                data={gender}
                renderItem={({item,index}) =>
                <TouchableOpacity 
                onPress={() => setSelected(item)}
                style={styles.gender}>
                    {
                        selected === item ?
                        <Image source={icons.cirChcek} style={styles.icon}/>
                        :
                        <Image source={icons.cirUncheck} style={{width:20,height:20}}/>
                    }
                    
                    <Text style={styles.genderText}>{item}</Text>

                </TouchableOpacity>
            }
                />
                </View>
                
        

                <Text style={styles.txt}>
                    You are in interacting as :
                </Text>

                <FlatList
                horizontal
                data={data}
                renderItem={({item,index}) =>
                <TouchableOpacity 
                onPress={() => setSelected1(item.id)}
                style={[styles.content1,{borderColor: selected1 === item.id ? colors.primary : colors.black}]}
                >
                    <Image source={item.img} style={{width:25,height:25,tintColor: selected1 === item.id ? colors.primary : null}}/>
                    <Text style={[styles.name,{color: selected1 === item.id ? colors.primary : colors.black}]}>{item.name}</Text>
                </TouchableOpacity>
            }
                />


                <TouchableOpacity
                        onPress={() => navigation.navigate('Home')}
                        style={styles.btn}
                        >
                            <Text style={styles.btnText}>Continue</Text>
                </TouchableOpacity>


            </View>

        </SafeAreaView>
    )
}

export default UserType

const  styles = StyleSheet.create({
    container:{flex:1,backgroundColor:colors.white},
    content:{padding:20,},
    header:{...fonts.h2,color:colors.primary,marginTop:20},
    genderContainer:{...style.flexRow,margin:15},
    genderText:{...fonts.body2,color:colors.black,marginLeft:5},
    icon:{width:25,height:25},
    txt:{...fonts.body1,color:colors.primary,marginBottom:20},
    content1:{padding:10,margin:10,borderRadius:20,borderWidth:1,backgroundColor:colors.lightWhite,...style.center,
                width:80,height:80,},
    btn:{...style.button,marginTop:80},
    btnText:{color:colors.lightWhite,...fonts.body2},
    gender:{...style.flexRow,marginRight:20}
})