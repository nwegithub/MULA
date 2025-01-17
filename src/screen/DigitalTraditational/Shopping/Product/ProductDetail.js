import {
  ActivityIndicator,
  Alert,
  Dimensions,
  FlatList,
  Image,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View, Linking
} from "react-native";
import { style } from "../../../../constant/style";
import { colors, fonts } from "../../../../constant/theme";
import React, { useContext, useState } from "react";
import { scaleWidth, scaleHeight } from "../../../../utils/responsive";
import { Context } from "../../../../component/Context";
import { useMutation, useQuery } from "@apollo/client";
import Carousel from "../Shop/Component/Carousel";
import RenderHTML from "react-native-render-html";
import icons from "../../../../constant/icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import HeaderComponent from "../Component/HeaderComponent";
import { GET_PRODUCT_BY_ID, GET_CART_ITEM_COUNT, GET_CART_ITEM } from "../../../../graphql/queries";
import { ADD_CART_ITEM } from "../../../../graphql/mutations";
import Loading from "../../../../component/Loading";
import AlertBox from "../../../../component/AlertBox";
import CartButton from "../../../../component/CartButton";
import ImageViewer from "../../../../component/ZoomSlider";

const width = Dimensions.get("window").width;

const ProductDetail = ({ navigation, route }) => {

  const { productId } = route.params
  const [variationModal, setVariationModal] = useState(false);
  const { user } = useContext(Context);
  const [quantity, setQuantity] = useState(1);
  const [callingApi, setCallingApi] = useState(false);
  const [modal, setModal] = useState(false)
  const [title, setTitle] = useState("")
  const [myaTitle, setMyaTitle] = useState("")
  const [imageShow, setImageShow] = useState(null);


  const { data } = useQuery(GET_PRODUCT_BY_ID, {
    variables: {
      productId
    },
    fetchPolicy: 'cache-and-network'
  })

  const [addCartItem] = useMutation(ADD_CART_ITEM, { refetchQueries: [GET_CART_ITEM_COUNT, GET_CART_ITEM] })

  const handleAddToCart = async () => {
    try {
      setCallingApi(true);
      await addCartItem({
        variables: {
          productId,
          userId: user.id,
          quantity,
        },
      });
      setModal(true)
      setTitle("Added to Cart")
      setMyaTitle("စျေးဝယ်ခြင်းထဲသို့ထည့်လိုက်ပါပြီ")
      setCallingApi(false)
    } catch (e) {
      setCallingApi(false);
      alert(e);
      console.log(e);
    }
  };


  if (!data) {
    return <Loading />;
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.lightWhite }}>
      <HeaderComponent name={"Details"} navigation={navigation} icon={


        user ?
          <CartButton navigation={navigation} />
          :
          <TouchableOpacity
            onPress={() => navigation.navigate('Sign In', { redirectTo: "BACK" })
            }
            style={{ paddingRight: 20 }}
          >
            <Image source={icons.cart} resizeMode="contain" style={{ width: scaleWidth(20), height: scaleHeight(20), tintColor: colors.primary }} />

          </TouchableOpacity>


      } />

      <ScrollView>


        <View style={{
          height: scaleHeight(216),
        }}>
          <Carousel
            autoplay={true}
            type={1}
            data={data.products_by_pk.product_medias}
            renderItem={(item, index) =>
              <TouchableOpacity
              key={index}
              onPress={() => setImageShow(index)}
                style={{
                  width,
                  paddingHorizontal: 15,
                  alignItems: "center",
                  borderRadius: 10,
                }}>
                <Image
                  source={{ uri: item.media_url }}
                  style={{
                    width: "100%",
                    height: scaleHeight(200),
                    borderRadius: 10,
                    backgroundColor: colors.white,
                  }}
                />
              </TouchableOpacity>
            }
          />
        </View>


        <View style={{ marginHorizontal: 15, marginTop: 5 }}>



          <Text style={{
            ...fonts.LT_body4,
            marginBottom: 10,
          }}>
            {data.products_by_pk.title}
          </Text>
          <Text style={{
            ...fonts.LT_body4, color: colors.primary,
            marginBottom: 10,
          }}>
            {data.products_by_pk.price}MMK
          </Text>

          <Text style={{
            ...fonts.PT_h3,color:colors.black,
            marginBottom: 10,
          }}>
            Description
          </Text>

          <RenderHTML
            source={{
              html: data.products_by_pk.description_html,
            }}
            contentWidth={width}
            tagsStyles={{
              body: {
                color: colors.black,
              },
            }}
          />







        </View>


      </ScrollView>

      <View style={{
        backgroundColor: colors.white,
        ...style.shadow,
        padding: 15,
      }}>

        <View style={{
          ...style.flexRowSpace,
        }}>
          <Text style={{
            ...fonts.LT_body2,color:colors.black
          }}>
            Quantity
          </Text>
          <View style={style.flexRow}>
            <TouchableOpacity
              disabled={quantity === 1}
              onPress={() => setQuantity(quantity - 1)}
              style={{
                justifyContent: "center",
                alignItems: "center",
                width: 30, height: 30,
                borderRadius: 40,
                borderWidth: 1,
                borderColor: colors.borderPrimary,
              }}>
              <Image source={icons.minus} resizeMode="contain" style={{ width: scaleWidth(20), height: scaleHeight(20), tintColor: colors.primary }} />
            </TouchableOpacity>
            <View
              style={{
                width: 50,
                alignItems: "center",
                justifyContent: "center",
              }}>
              <Text style={{
                ...fonts.body2,color:colors.black
              }}>
                {quantity}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => setQuantity(quantity + 1)}
              style={{
                justifyContent: "center",
                alignItems: "center",
                width: 30, height: 30,
                borderRadius: 40,
                borderWidth: 1,
                borderColor: colors.borderPrimary,
              }}>
              <Image source={icons.plus} resizeMode="contain" style={{ width: scaleWidth(20), height: scaleHeight(20), tintColor: colors.primary }} />
            </TouchableOpacity>
          </View>
        </View>


        <View style={{
          ...style.flexRowSpace,
          marginVertical: 10,
        }}>
          <Text style={{ ...fonts.title3 ,color:colors.black}}>
            Total
          </Text>

          <Text style={{
            ...fonts.body1,
            color: colors.black,
            marginLeft: "auto",
            marginRight: 10,
          }}>
            {(data.products_by_pk.price * quantity).toLocaleString()} MMK
          </Text>


        </View>


        <TouchableOpacity
          disabled={callingApi}
          onPress={() => {
            if (user) {
              handleAddToCart()

            } else {
              navigation.navigate('Sign In', { redirectTo: "BACK" })
            }
          }}
          style={{
            ...style.button,
            backgroundColor: colors.primary,
          }}>
          {callingApi
            ? <ActivityIndicator size="small" color={colors.lightWhite} />
            : <Text style={{
              ...fonts.body2,
              color: colors.lightWhite,
            }}>
              Add To Cart
            </Text>
          }
        </TouchableOpacity>
      </View>

      {imageShow !== null &&
                <Modal
                    onRequestClose={() => setImageShow(null)}
                >

                    <TouchableOpacity
                        style={{
                            position: 'absolute',
                            top: Platform.OS === 'ios' ? 35 : 30,
                            zIndex: 1,
                            right: 20,
                        }}
                        onPress={() => setImageShow(null)}>
                        <Text style={{
                            fontSize: 25,
                            color: '#fff',
                        }}>
                            ✕
                        </Text>
                    </TouchableOpacity>

                    <ImageViewer useNativeDriver={true}
                                 index={imageShow}
                                 imageUrls={data.products_by_pk.product_medias.map(item => ({url: item.media_url}))}
                    />
                </Modal>
            }


      <AlertBox title={title} myaTitle={myaTitle} modal={modal} setModal={setModal} />

    </View>

  );
};

export default ProductDetail;
