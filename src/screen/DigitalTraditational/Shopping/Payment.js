import React, { useContext, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  Image,
  Linking,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { style } from "../../../constant/style";
import { colors, fonts } from "../../../constant/theme";
import { useMutation, useQuery } from "@apollo/client";
import { launchImageLibrary } from "react-native-image-picker";
import icons from "../../../constant/icons";
import { Context } from "../../../component/Context";
import RenderHTML from "react-native-render-html";
import HeaderComponent from "./Component/HeaderComponent";
import ModalWrapper from "../../../component/ModalWrapper";

const width = Dimensions.get("screen").width;

const Payment = ({ navigation }) => {

  const [selectedPayment, setSelectedPayment] = useState("");
  const [showDialog, setShowDialog] = useState("");
  const [paymentPhoto, setPaymentPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [paymentDialog, setPaymentDialog] = useState(false)


  const data = [
    {
      payment_service_name: "KBZ pay",
      account_number: 23420342934,
      payment_logo_url: "https://play-lh.googleusercontent.com/cnKJYzzHFAE5ZRepCsGVhv7ZnoDfK8Wu5z6lMefeT-45fTNfUblK_gF3JyW5VZsjFc4=w240-h480-rw",
      receiver_name: "Nwe",
      information: "sdkflekwewlewl"
    },
    {
      payment_service_name: "KBZ pay",
      account_number: 23420342934,
      payment_logo_url: "https://play-lh.googleusercontent.com/t4ur8SEt6O2RgZCDC1l62lB6elFPxYySoh-bZqozC8O38xP9WQBhnXt-H0W4w9MyN2I",
      receiver_name: "Nwe",
      information: "sdkflekwewlewl"


    },
    {
      payment_service_name: "KBZ pay",
      account_number: 23420342934,
      payment_logo_url: "https://play-lh.googleusercontent.com/rPq4GMCZy12WhwTlanEu7RzxihYCgYevQHVHLNha1VcY5SU1uLKHMd060b4VEV1r-OQ",
      receiver_name: "Nwe",
      information: "sdkflekwewlewl"


    },
  ]
  const card = [
    {
      image_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7q_tIAZNwi4rzvFfiIj3vuUO85kVYJg8bPw&s'
    },
    {
      image_url: 'https://w7.pngwing.com/pngs/667/172/png-transparent-logo-brand-visa-font-visa-blue-text-trademark-thumbnail.png'
    },
    {
      image_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPMEm-efiVHsW0NsLe3lZ7lixMo3vJhGhO0w&s'
    },

  ]


  return (
    <View style={{ flex: 1, justifyContent: "space-between", backgroundColor: colors.lightWhite, }}>
      <HeaderComponent name={"Payment Methods"} navigation={navigation} />

      <ScrollView
        contentContainerStyle={{ padding: 10 }}
      >
        <Text style={{ ...fonts.LT_body4, color: colors.black, }}>
          Cash
        </Text>
        <TouchableOpacity
          style={{ backgroundColor: colors.white, ...style.flexRow, borderRadius: 5, ...style.shadow, padding: 10, marginTop: 5 }}
        >
          <Image source={icons.location}
            style={{ width: 15, height: 15, tintColor: colors.primary }} />
          <Text style={{ ...fonts.LT_body4, color: colors.black, paddingLeft: 5 }}>
            Cash On Delivery
          </Text>

        </TouchableOpacity>


        <Text style={{ ...fonts.LT_body4, color: colors.black, marginTop: 20 }}>
          Credit/Debit Card
        </Text>
        <View
          style={{ backgroundColor: colors.white, ...style.flexRowSpace, borderRadius: 5, ...style.shadow, padding: 10, marginTop: 5 }}

        >
          {
            card.map((item, index) => (
              <React.Fragment key={index}>
                <View style={{ backgroundColor: colors.white, borderRadius: 5, ...style.shadow }}>
                  <Image
                    source={{ uri: item.image_url }}
                    style={{ width: 50, height: 30, borderRadius: 5 }}
                  />
                </View>
                {index === card.length - 1 && (
                  <View style={{
                    backgroundColor: colors.white, borderRadius: 5, ...style.flexRow, height: 30, paddingHorizontal: 10, borderColor: colors.primary,
                    borderStyle: 'dotted', borderWidth: 0.5
                  }}>
                    <Image
                      source={icons.plus}
                      style={{ width: 10, height: 10, borderRadius: 5 }}
                    />
                    <Text style={{ ...fonts.LT_body5, color: colors.primary }}>Add Card</Text>
                  </View>
                )}
              </React.Fragment>
            ))
          }



        </View>

        <View style={{ marginVertical: 20 }}>
          <Text style={{ ...fonts.body2, color: colors.black }}>
            Wallet Payment
          </Text>
        </View>



        <View style={{
          flex: 1, borderRadius: 5,
          backgroundColor: colors.white,
          ...style.shadow,

          padding: 15,
        }}>
          {data &&
            data.map((item, index) => {
              return (
                <View
                  key={index}
                >
                  <TouchableOpacity
                    onPress={() => setSelectedPayment(item)}

                  >
                    <View style={{
                      ...style.flexRowSpace,

                    }}>
                      <Image source={{ uri: item.payment_logo_url }}
                        style={{ width: 40, height: 40 }}
                      />
                      <View style={{ paddingLeft: 10, flex: 1 }}>
                        <Text style={{ ...fonts.body2, color: colors.black }}>
                          {item.payment_service_name}
                        </Text>
                      </View>

                      <Image source={icons.radio_unchecked}
                        style={{ width: 25, height: 25, tintColor: colors.primary }} />
                      {/* } */}
                    </View>
                  </TouchableOpacity>
                  <View style={{ height: 0.5, backgroundColor: colors.lightGray, marginVertical: 5, }} />

                </View>
              );
            })
          }



        </View>

        {/* Confirm payment */}

      </ScrollView>

      <View style={{ paddingHorizontal: 10 }}>
        <TouchableOpacity
          onPress={() => setPaymentDialog(true)}
          style={{
            ...style.button,
            marginVertical: 20, backgroundColor: colors.primary,
          }}
        >
          {
            loading ?
              <ActivityIndicator size="small" color="#ffffff" />
              :
              <Text style={{ ...fonts.body2, color: colors.lightWhite }}>Confirm Payment</Text>
          }
        </TouchableOpacity>
      </View>


      <ModalWrapper modalOpen={paymentDialog} setModalOpen={setPaymentDialog}>
      <View
            style={{ padding: 10, borderRadius: 10, ...fonts.LT_body4, backgroundColor: colors.primary, paddingVertical: 15 }}
          >

            <Text style={{ ...fonts.LT_body4, color: colors.lightWhite, textAlign: 'center' }}>
              Auto-payment System
            </Text>
            <TouchableOpacity
              style={{ ...style.flexRow, marginTop: 5 }}>
              <Image source={{ uri: 'https://www.kbzbank.com/wp-content/uploads/2019/08/Image-8_-KBZPay-Logo_Credit-to-KBZ.jpg' }} style={{ width: 30, height: 30, }} />
              <Text style={{ ...fonts.LT_body2, color: colors.lightWhite, paddingLeft: 10, }}>KBZPAY</Text>
              <TouchableOpacity
                onPress={() => { navigation.navigate('Auto-Payment'), setPaymentDialog(false) }}

                style={{ borderRadius: 20, backgroundColor: colors.lightGray, marginLeft: 10, flex: 1, paddingVertical: 5 }}>
                <Text style={{ ...fonts.LT_body4, color: colors.black, textAlign: 'center' }}>
                  Proceed
                </Text>
              </TouchableOpacity>
            </TouchableOpacity>

          </View>
          <View
            style={{ padding: 10, borderRadius: 10, ...fonts.LT_body4, backgroundColor: colors.lightWhite, paddingVertical: 15, marginTop: 20 }}
          >
            <Text style={{ ...fonts.LT_body4, color: colors.black, textAlign: 'center' }}>
              Pay With Slip
            </Text>
            <TouchableOpacity style={{ ...style.flexRow, marginTop: 5 }}>
              <Image source={{ uri: 'https://www.kbzbank.com/wp-content/uploads/2019/08/Image-8_-KBZPay-Logo_Credit-to-KBZ.jpg' }} style={{ width: 30, height: 30, }} />
              <Text style={{ ...fonts.LT_body2, color: colors.black, paddingLeft: 10, }}>KBZPAY</Text>
              <TouchableOpacity
                onPress={() => { navigation.navigate('Pay With Slip'), setPaymentDialog(false) }}
                style={{ borderRadius: 20, backgroundColor: colors.lightGray, marginLeft: 10, flex: 1, paddingVertical: 5 }}>
                <Text style={{ ...fonts.LT_body4, color: colors.black, textAlign: 'center' }}>
                  Proceed
                </Text>
              </TouchableOpacity>
            </TouchableOpacity>

          </View>
      </ModalWrapper>
     



    </View>
  );
};

export default Payment;
