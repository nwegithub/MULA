import React, { useEffect,useContext,useRef } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {Animated, View, Dimensions, StyleSheet, TouchableOpacity, Image, Text, Platform} from "react-native";
import { colors,fonts } from "../constant/theme"
import icons from "../constant/icons";
import {style} from "../constant/style"
import Svg,{Path} from "react-native-svg";
import { scaleHeight,scaleWidth } from "../utils/responsive";
import { Context } from "../component/Context";
import Home from "../screen/DigitalTraditational/Home";
import Video from "../screen/DigitalTraditational/Video/Video";
import Article from "../screen/DigitalTraditational/Article/Article";
import Event from "../screen/DigitalTraditational/Event/Event";
import Shop from "../screen/DigitalTraditational/Shopping/Shop/Shop";

const { width, height } = Dimensions.get("window");

const MIN_HEIGHT = 667;
const isMinHeight = height <= MIN_HEIGHT;

const BottomTab = createBottomTabNavigator();



const TabNavigator = ({state,descriptors,navigation,route}) => {

    const {theme,digital,language} = useContext(Context)

    const translateX = useRef(new Animated.Value(0)).current;
    const iconY = useRef(new Animated.Value(0)).current;
    const tabWidth =width/5;

    const translateTab = (index) => {
        Animated.spring(translateX, {
            toValue: index * (tabWidth),
            useNativeDriver: true,
            speed: 2,
        }).start();

        iconY.setValue(0);
        Animated.timing(iconY, {
            toValue: isMinHeight ? -16 : -20,
            duration: 400,
            useNativeDriver: true,
        }).start();
    };

    const tabIcons = {
        [language === "mm" ? "ပင်မစာမျက်နှာ" : "Home"]: icons.digital_home,
        [language === "mm" ? "ဗီဒီယို" : "Video"]: icons.video,
        [language === "mm" ? "စျေးဝယ်" : "Shop"]: icons.shop, 
        [language === "mm" ? "ဆောင်းပါး" : "Article"]: icons.article,
        [language === "mm" ? "ပွဲအစီအစဥ်" : "Event"]: icons.digital_event,
    };
    
    useEffect(() => {
        translateTab(state.index);
    }, [state.index]);

    return (
        <View style={[styles.container,{backgroundColor:digital? '#494d4a' : '#edeae6',
            height:Platform.OS === 'ios'? 70: 60,
        }]} deviceMinHeight={isMinHeight}>
            <Animated.View
                style={{
                    position: "absolute",
                    bottom: 0,
                    width: tabWidth,
                    height: Platform.OS === 'ios'?  92 : 82 ,
                    alignItems: 'center',
                    transform: [{ translateX }],
                }}
            >
                <View style={{
                    //   shadowColor: 'black',
                    // shadowOffset: {width: 0, height: 2},
                    // shadowOpacity: 0.6,
                    // shadowRadius: 10,
                    // elevation: 10,
                }}>
                    <Svg
                        width={92}
                        height={82}
                        fill={digital? '#494d4a' : '#edeae6'}
                        viewBox="0 0 92 114"

                    >
                        <Path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M1.19 30c5.372 0 9.796-3.987 12.019-8.878C18.87 8.663 31.424 0 46 0c14.576 0 27.13 8.663 32.791 21.122C81.014 26.012 85.438 30 90.811 30H91a1 1 0 011 1v82a1 1 0 01-1 1H1a1 1 0 01-1-1V31a1 1 0 011-1h.19z"
                        />
                    </Svg>
                </View>
                <View style={[styles.content1,{backgroundColor:digital? '#494d4a' : '#edeae6'}]}  deviceMinHeight={isMinHeight}/>
            </Animated.View>

            {state.routes.map((route, index) => {

                const active = index === state.index;
                return (
                    <TouchableOpacity
                        key={index}
                        onPress={() => {
                            const event = navigation.emit({
                                type: "tabPress",
                                target: route.key,
                                canPreventDefault: true,
                            });
                            if (state.index !== index && !event.defaultPrevented)
                                navigation.navigate(route.name);
                        }}
                    >
                        <View style={{ alignItems: "center", opacity: active ? 1 : 0.7,
                            width:tabWidth, }}>
                            <Animated.View
                                style={{ transform: [{ translateY: active ? iconY : 10, }] }}
                            >
                                <Image source={tabIcons[route.name]} 
                                resizeMode="contain"
                                active={active}  style={{...style.icon,tintColor:active&& !digital? colors.primary : !digital ? colors.primary :null,
                                }}/>
                            </Animated.View>
                            <Text style={{...fonts.LT_body6,color:theme.mainColor,lineHeight: Platform.OS === 'ios'?
                                    0: 25,}}>{active? route.name :""}</Text>

                        </View>

                    </TouchableOpacity>
                );
            })}
        </View>
    );
};

const  BottomTabNavigator = () => {

    const {theme,digital,language} = useContext(Context)


    return (
        <BottomTab.Navigator

            tabBar={(props) => <TabNavigator {...props} />}
            screenOptions={{
                tabBarStyle:{backgroundColor:'transparent',position:'absolute'},
                tabBarActiveTintColor: '#edeae6',
                headerShown:false,
                
                
            }}
        >
            <BottomTab.Screen
                name={language === "mm" ? "ပင်မစာမျက်နှာ" :"Home"}
                component={Home}

            />
            <BottomTab.Screen
                name={language === "mm" ? "ဗီဒီယို" : "Video"}
                component={Video}

            />
             <BottomTab.Screen
                name={language === "mm" ? "စျေးဝယ်" : "Shop"}  
                component={Shop}
            />
            <BottomTab.Screen
                name={language === "mm"? "ဆောင်းပါး" : "Article"}
                component={Article}

            />
            <BottomTab.Screen
                name={language === "mm"? "ပွဲအစီအစဥ်" : "Event"}
                component={Event}

            />
           

        </BottomTab.Navigator>
    );
}

export default BottomTabNavigator;

const styles = StyleSheet.create({
    container:{
        ...style.flexRowSpace,
        backgroundColor:'#edeae6',
        width:'100%',
       
    },
    content:{
        width: 92,
        height: 114,
        fill: "tomato",
    },

    content1:{
        width: 40,
        height: 56,
        borderRadius: 100,
        backgroundColor:'#edeae6',
        position: 'absolute',

    }
})