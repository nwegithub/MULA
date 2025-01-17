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
import { GET_BANKING_TYPE, GET_CART_ITEM, GET_CART_ITEM_COUNT, GET_USER } from "../../../graphql/queries";
import { launchImageLibrary } from "react-native-image-picker";
import { CREATE_ORDER, GET_IMAGE_UPLOAD_URL } from "../../../graphql/mutations";
import icons from "../../../constant/icons";
import { Context } from "../../../component/Context";
import RenderHTML from "react-native-render-html";
import Loading from "../../../component/Loading";
import HeaderComponent from "./Component/HeaderComponent";
import ModalWrapper from "../../../component/ModalWrapper";
import { CommonActions } from '@react-navigation/native';


const width = Dimensions.get("screen").width;

const ScreenShotPayment = ({ navigation }) => {

  const { data } = useQuery(GET_BANKING_TYPE, { fetchPolicy: "network-only" });
  const [selectedPayment, setSelectedPayment] = useState("");
  const [showDialog, setShowDialog] = useState("");
  const [paymentPhoto, setPaymentPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [getImageUploadUrl] = useMutation(GET_IMAGE_UPLOAD_URL);

  const { user, langData } = useContext(Context);
  const { data: userData, loading: userDataLoading } = useQuery(GET_USER, {
    variables: { userId: user && user.id },
    fetchPolicy: "cache-and-network",
  });

  const [createOrder] = useMutation(CREATE_ORDER, { refetchQueries: [ GET_CART_ITEM_COUNT,GET_CART_ITEM,] });


  const uploadPaymentPhoto = async () => {
    const response = await launchImageLibrary({
      mediaType: "photo",
      selectionLimit: 1,
      includeExtra: true,
      quality: 0.3,
    });
    if (response.errorCode && response.errorCode === "permission") {
      Alert.alert("Please allow full access to photos permission", "", [{
        "text": "Cancel",
      }, { "text": "OK", onPress: () => Linking.openURL("app-settings:") }]);
    }
    if (!response.didCancel) {
      setPaymentPhoto(response.assets[0].uri);
    }
  };

  const uploadImage = async (photo) => {
    try {
      const imageUploadUrl = await getImageUploadUrl();
      const imageUri = await fetch(photo);
      const blobImage = await imageUri.blob();
      const uploadedImageUrl = await fetch(imageUploadUrl.data.getImageUploadUrl.imageUploadUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "image/*",
          "x-amz-acl": "public-read",
        },
        body: blobImage,
      });
      return uploadedImageUrl.url.split("?")[0];
    } catch (e) {
      console.log(e);
    }
  };

  const handleOrder = async (uploadedPaymentImageUrl) => {
    try {
      const response = await createOrder({
        variables: {
          paymentImageUrl: selectedPayment.payment_service_name === "Cash On Delivery" ? null : uploadedPaymentImageUrl,
          paymentMethod: selectedPayment.payment_service_name === "Cash On Delivery" ? "Cash On Delivery" : "Banking",
          paymentReceiverAccountNumber: selectedPayment.payment_service_name === "Cash On Delivery" ? null : selectedPayment.account_number,
          paymentReceiverName: selectedPayment.payment_service_name === "Cash On Delivery" ? null : selectedPayment.receiver_name,
          paymentServiceName: selectedPayment.payment_service_name === "Cash On Delivery" ? null : selectedPayment.payment_service_name,
          receiverAddress: JSON.stringify(userData.users_by_pk.address),
          receiverName: JSON.parse(userData.users_by_pk.address).name,
          receiverPhone: JSON.parse(userData.users_by_pk.address).phone,
          userId: user.id,
        },
      });
      console.log("data", response.data.AddOrder)
      if (response.data.AddOrder.error) {
        console.log("error", response.data.AddOrder.error);
        alert(response.data.AddOrder.message);
      } else {
        setShowDialog(true);
      }
    } catch (error) {
      console.error("Order creation failed:", error);
      alert("There was an error processing your order. Please try again.");
    }
  };



  const placeOrder = async () => {
    setLoading(true);
    try {
      if (!selectedPayment) {
        alert("select payment");
      } else if (selectedPayment.payment_service_name !== "Cash On Delivery" && !paymentPhoto) {
        alert("upload payment photo");
      } else {
        let uploadedPaymentImageUrl;
        if (selectedPayment.payment_service_name !== "Cash On Delivery") {
          uploadedPaymentImageUrl = await uploadImage(paymentPhoto);
        }
        await handleOrder(uploadedPaymentImageUrl);
      }
    } catch (e) {
      console.log(e);
      alert(e)
    }
    setLoading(false);
  };


  if (!data || !userData) {
    return <Loading />;
  }


  return (
    <View style={{ flex: 1, justifyContent: "space-between" }}>
      <HeaderComponent name={"Payment"} navigation={navigation} icon={<View style={{ width: 20, height: 20 }} />} />

      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 10 }}
      >


        <View style={{ marginVertical: 20 }}>
          <Text style={{ ...fonts.LT_body1, color: colors.primary }}>
            select payment</Text>
        </View>

        {/* Array */}

        <View style={{ flex: 1 }}>
          {data &&
            data.payments.map((item, index) => {
              return (
                <View
                  key={index}
                  style={{
                    borderRadius: 5,
                    backgroundColor: colors.white,
                    ...style.shadow,
                    marginBottom: 10,
                    padding: 15,
                  }}>
                  <TouchableOpacity
                    onPress={() => setSelectedPayment(item)}
                    onLongPress={() => {
                      Alert.alert("", `phone number ${item.account_number} copied to clipboard`);
                      Clipboard.setString(item.account_number);
                    }}
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
                      {/* radio button */}
                      {
                        selectedPayment.payment_service_name === item.payment_service_name ?
                          <Image source={icons.cirChcek}
                            style={{ width: 15, height: 15, tintColor: colors.primary }} />
                          :
                          <Image source={icons.cirUncheck}
                            style={{ width: 15, height: 15, tintColor: colors.primary }} />
                      }
                    </View>
                  </TouchableOpacity>
                  {
                    selectedPayment.payment_service_name === item.payment_service_name &&
                    selectedPayment.payment_service_name !== "Cash On Delivery" &&
                    <View style={{ marginVertical: 10 }}>
                      <View style={{
                        ...style.flexRow,
                        marginBottom: 10,
                      }}>
                        <Text selectable={true} style={{ ...fonts.body3, color: "blue" }}>
                          {item.account_number}
                        </Text>
                        <Text style={{ ...fonts.body3 }}>
                          {` - ${item.receiver_name}`}
                        </Text>
                      </View>
                      <RenderHTML
                        source={{
                          html: item.information,
                        }}
                        contentWidth={width}
                        tagsStyles={{
                          body: {
                            color: colors.black,
                          },
                        }}
                      />
                    </View>
                  }
                </View>
              );
            })
          }

          {selectedPayment && selectedPayment.payment_service_name !== "Cash On Delivery"
            &&
            <View style={{
              marginTop: 10,
            }}>
              <Text style={{
                ...fonts.body2, color: colors.black,

              }}>
                Upload receipt screenshot photo
              </Text>
              <TouchableOpacity
                onPress={uploadPaymentPhoto}
                style={{
                  width: "100%",
                  height: 250,
                  borderRadius: 10,
                  marginTop: 20,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: colors.white,
                  ...style.shadow,
                }}
              >
                {paymentPhoto
                  ?
                  <Image
                    source={{ uri: paymentPhoto }}
                    style={{
                      height: "100%",
                      width: "100%",
                    }}
                    resizeMode="contain"
                  />
                  :
                  <Image source={icons.image_upload} style={{ tintColor: colors.primary, }} />
                }
              </TouchableOpacity>
            </View>
          }

        </View>

        {/* Confirm payment */}
        <TouchableOpacity
          onPress={placeOrder}
          style={{
            ...style.button,
            marginVertical: 20, backgroundColor: colors.primary,
          }}
        >
          {
            loading ?
              <ActivityIndicator size="small" color="#ffffff" />
              :
              <Text style={{ ...fonts.body2, color: colors.white }}>Confirm Payment</Text>
          }
        </TouchableOpacity>
      </ScrollView>

      <Modal
        animationType="none"
        transparent={true}
        visible={showDialog}
      >
        <View style={{
          flex: 1
          , backgroundColor: "rgba(0,0,0,0.2)",
          ...style.center,
        }}>
          <View
            style={{
              width: "70%",
              padding: 20,
              backgroundColor: colors.white,
              borderRadius: 30,
            }}
          >
                    <View style={{ ...style.center }}>
          <Image source={icons.order_successful}
          resizeMode="contain"
            style={{
              width: 100, height: 100,
            }} />
              <Text
          style={{ ...fonts.body2, color: colors.black }}
        >
          Payment Successful
        </Text>
        <Text style={{...fonts.LT_body3,color:colors.black}}>
          Thanks for your order
        </Text>
        </View>
        <View style={{ marginTop: 20, width: "100%" }}>
          <TouchableOpacity
            onPress={() => {
              setShowDialog(false);
              navigation.pop(4);
              setTimeout(() => {
                  navigation.navigate("Order");

                },
                0,
              );
         
            }}
            style={{
              ...style.button,
              backgroundColor: colors.primary,
            }}
          >
            <Text style={{ color: colors.white }}>View Order</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setShowDialog(false);
              navigation.navigate('Shop')
            }}
            style={{
              ...style.button,
              marginTop: 10,
              backgroundColor: "#f5cbb5",
            }}
          >
            <Text style={{ color: colors.primary }}>Shop More</Text>
          </TouchableOpacity>
        </View>
        </View>

</View>
</Modal>
    </View>
  );
};

export default ScreenShotPayment;
