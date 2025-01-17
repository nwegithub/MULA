import 'react-native-gesture-handler';
import React, { useEffect, useState,useContext } from "react";
import { View, Platform } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Onboarding from "../screen/DigitalTraditational/Onboarding";
import VisitGallary from "../screen/DigitalTraditational/VisitGallary";
import Artwork from '../screen/DigitalTraditational/Artwork/Artwork';
import ArtworkDetail from "../screen/DigitalTraditational/Artwork/ArtworkDetail";
import BottomTab from "./BottomTabNavigation";
import FullImg from "../screen/DigitalTraditational/Artwork/FullImg";
// import Checkout from "../screen/DigitalTraditational/MyCart/Checkout";
// import Address from "../screen/DigitalTraditational/MyCart/Address";
// import Payment from "../screen/DigitalTraditational/MyCart/Payment";
// import Confirmation from "../screen/DigitalTraditational/MyCart/Confirmation";
import Event from "../screen/DigitalTraditational/Event/Event";
import EventDetail from "../screen/DigitalTraditational/Event/EventDetail";
import ArtistDetail from "../screen/DigitalTraditational/Artist/ArtistDetail";
import ExploreArtwork from "../screen/DigitalTraditational/ExploreArtwork/ExploreArtwork";
import ComingSoon from "../screen/ComingSoon";
import Profile from "../screen/DigitalTraditational/Profile/Profile";
import AboutUs from '../screen/DigitalTraditational/AboutUs';
import Testing from "../screen/DigitalTraditational/Testing";
import DrawerScreen from "../component/Drawer";
import AccountSetting from "../screen/DigitalTraditational/AccountSetting";
import Language from "../screen/DigitalTraditational/Language";
import ChangePassword from "../screen/DigitalTraditational/ChangePassword";
import ContactUS from "../screen/DigitalTraditational/ContactUs";
import ArtworkSeries from "../screen/DigitalTraditational/Artwork/ArtworkSeries";
import ArtworkSeriesByName from "../screen/DigitalTraditational/Artwork/ArtworkSeriesByName";
import Searching from "../screen/DigitalTraditational/Searching";
import appStorage from "../utils/appStorage";
import ArtworkCollection from "../screen/DigitalTraditational/Collection/ArtworkCollection";
import ArtworkCollectionByName from "../screen/DigitalTraditational/Collection/ArtworkCollectionByName";
import Switch from '../screen/Switch';
import StartUp from '../screen/StartUp';
import SignIn from '../screen/SignIn';
import SignUp from '../screen/SignUp';
import Otp from '../screen/Otp';
import PersonalInfo from '../screen/PersonalInfo';
import ForgotPassword from '../screen/Password/ForgotPassword';
import CreatePassword from '../screen/Password/CreateNewPassword';
import Article from '../screen/DigitalTraditational/Article/Article';
import VideoDetail from '../screen/DigitalTraditational/Video/VideoDetail';
import ArticleDetail from '../screen/DigitalTraditational/Article/ArticleDetail';
import Notification from '../screen/Notification';
import Feedback from '../screen/Feedback';
import VideoListByCreater from '../screen/DigitalTraditational/Video/VideoListByCreater';
import VideoSearching from '../screen/DigitalTraditational/Video/VideoSearching';
import { Context } from '../component/Context';
import ArticleSearching from '../screen/DigitalTraditational/Article/ArticleSearching';
import Cart from '../screen/DigitalTraditational/Shopping/Cart'
import Product from '../screen/DigitalTraditational/Shopping/Product/Product';
import ProductDetail from '../screen/DigitalTraditational/Shopping/Product/ProductDetail';
import Checkout from '../screen/DigitalTraditational/Shopping/Checkout';
import DeliveryAddress from '../screen/DigitalTraditational/Shopping/DeliveryAddress';
import Payment from '../screen/DigitalTraditational/Shopping/Payment';
import PaySlip from '../screen/DigitalTraditational/Shopping/PaySlip';
import AutoPayment from '../screen/DigitalTraditational/Shopping/AutoPayment';
import Order from '../screen/DigitalTraditational/Shopping/Order/Order';
import PaymentSuccessful from '../screen/DigitalTraditational/Shopping/PaymentSuccessful';
import TrackOrder from '../screen/DigitalTraditational/Shopping/Order/TrackOrder';
import ScreenShotPayment from '../screen/DigitalTraditational/Shopping/ScreenShotPayment';
import Shop from '../screen/DigitalTraditational/Shopping/Shop/Shop';


const Stack = createNativeStackNavigator()

const StactNavigation = () => {

    const {firstTime} = useContext(Context)

    // useEffect(() => {
    //     const start = async () => {
    //         const value = await appStorage.getItem("firstTime")
    //         if (value === "false") {
    //             setFirstTime(false)
    //         } else {
    //             setFirstTime(true)
    //         }

    //     }
    //     start()
    // })



    return (
        <Stack.Navigator
            screenOptions={
                Platform.OS === 'android' ? {
                    headerShown: false,
                    cardStyleInterpolator: ({ current, closing }) => ({
                        cardStyle: {
                            opacity: current.progress,
                        },
                    }),
                }
                    :
                    { headerShown: false }
            }
        >

            {
                firstTime ?
                    <>
                        <Stack.Screen name="Switch" component={Switch} />
                        <Stack.Screen name="Onboarding" component={Onboarding} />
                        <Stack.Screen name="VisitGallary" component={VisitGallary} />

                    </>
                    :
                    <>
                        <Stack.Screen name="Start Up" component={StartUp} />
                        <Stack.Screen name="Drawer" component={DrawerScreen} />
                        <Stack.Screen name="Sign In" component={SignIn} />
                        <Stack.Screen name="Sign Up" component={SignUp} />
                        <Stack.Screen name="Otp" component={Otp} />
                        <Stack.Screen name="PersonalInfo" component={PersonalInfo} />
                        <Stack.Screen name="Forgot Password" component={ForgotPassword} />
                        <Stack.Screen name="Create Password" component={CreatePassword} />
                        <Stack.Screen name="Gallary" component={Artwork} />
                        <Stack.Screen name="Home Detail" component={ArtworkDetail} />
                        <Stack.Screen name="Full Imgage" component={FullImg} />
                        <Stack.Screen name="BottomTab" component={BottomTab} />
                        {/* <Stack.Screen name="Checkout" component={Checkout} /> */}
                        {/* <Stack.Screen name="Address" component={Address} /> */}
                        {/* <Stack.Screen name="Payment" component={Payment} /> */}
                        {/* <Stack.Screen name="Confirmation" component={Confirmation} /> */}
                        <Stack.Screen name="Event" component={Event} />
                        <Stack.Screen name="EventDetail" component={EventDetail} />
                        <Stack.Screen name="ArtistDetail" component={ArtistDetail} />
                        <Stack.Screen name="ExploreArtwork" component={ExploreArtwork} />
                        <Stack.Screen name="ComingSoon" component={ComingSoon} />
                        <Stack.Screen name="Profile" component={Profile} />
                        <Stack.Screen name="About Us" component={AboutUs} />
                        <Stack.Screen name="Testing" component={Testing} />
                        <Stack.Screen name="Account Setting" component={AccountSetting} />
                        <Stack.Screen name="Language" component={Language} />
                        <Stack.Screen name="Change Password" component={ChangePassword} />
                        <Stack.Screen name="Contact Us" component={ContactUS} />
                        <Stack.Screen name="Artwork Series" component={ArtworkSeries} />
                        <Stack.Screen name="Artwork Series By Name" component={ArtworkSeriesByName} />
                        <Stack.Screen name="Searching" component={Searching} />
                        <Stack.Screen name="Artwork Collection" component={ArtworkCollection} />
                        <Stack.Screen name="Artwork Collection By Name" component={ArtworkCollectionByName} />
                        <Stack.Screen name='Video Detail' component={VideoDetail}/>
                        <Stack.Screen name='Article Detail' component={ArticleDetail}/>
                        <Stack.Screen name='Notification' component={Notification}/>
                        <Stack.Screen name='Feedback' component={Feedback}/>
                        <Stack.Screen name='Video List By Creater' component={VideoListByCreater}/>
                        <Stack.Screen name='Video Searching' component={VideoSearching}/>
                        <Stack.Screen name='Article Searching' component={ArticleSearching}/>
                        <Stack.Screen name='Cart' component={Cart}/>
                        <Stack.Screen name='Product' component={Product}/>
                        <Stack.Screen name='Product Detail' component={ProductDetail}/>
                        <Stack.Screen name='Checkout' component={Checkout}/>
                        <Stack.Screen name='Delivery Addresss' component={DeliveryAddress}/>
                        <Stack.Screen name='Payment' component={Payment}/>
                        <Stack.Screen name='Pay With Slip' component={PaySlip}/>
                        <Stack.Screen name='Auto-Payment' component={AutoPayment}/>
                        <Stack.Screen name='Order' component={Order}/>
                        <Stack.Screen name='Payment Successful' component={PaymentSuccessful}/>
                        <Stack.Screen name='Track Order' component={TrackOrder}/>
                        <Stack.Screen name='Screen Shot Payment' component={ScreenShotPayment}/>
                        <Stack.Screen name='Shopping' component={Shop}/>


                    </>
            }




        </Stack.Navigator>
    )
}
export default StactNavigation