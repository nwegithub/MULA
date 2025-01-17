import { Alert, FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { colors, fonts } from "../../../constant/theme";
import { style } from "../../../constant/style";
import icons from "../../../constant/icons";
import { useApolloClient, useMutation, useQuery } from "@apollo/client";
import { useContext, useState } from "react";
import { Context } from "../../../component/Context";
import { scaleWidth, scaleHeight } from "../../../utils/responsive";
import HeaderComponent from "./Component/HeaderComponent";
import { GET_CART_ITEM,GET_CART_ITEM_COUNT } from "../../../graphql/queries";
import { UPDATE_CART_ITEM,DELETE_CART_ITEM } from "../../../graphql/mutations";
import Loading from "../../../component/Loading";
import CartCard from "./Component/CartCard";
import AlertBox from "../../../component/AlertBox";
import CartButton from "../../../component/CartButton";

const Cart = ({ navigation }) => {

    const { user } = useContext(Context);
    const [modal,setModal] = useState(false)
    const [title,setTitle] = useState("")
    const [myaTitle,setMyaTitle] = useState("")
    const [callingApi, setCallingApi] = useState(false);
    
    const {data} = useQuery(GET_CART_ITEM,{variables:{
      userId:user.id
    },
    fetchPolicy:'cache-and-network'
  })
    const [updateCartItem] = useMutation(UPDATE_CART_ITEM,{refetchQueries:[GET_CART_ITEM,GET_CART_ITEM_COUNT]})
    const [deleteCartItem] = useMutation(DELETE_CART_ITEM,{refetchQueries:[GET_CART_ITEM,GET_CART_ITEM_COUNT]})


    const updateQuantity = async (cartItemId, quantity) => {
        await updateCartItem({
          variables: {
            cartItemId,
            quantity,
          },
        });
        
      };

      const removeCartItem = async (cartItemId) => {
        console.log("cartItemid",cartItemId)
        try {
            await deleteCartItem({ variables: { cartItemId } });
            setModal(true)
            setTitle("Removed Item From Cart")
            setMyaTitle("စျေးဝယ်ခြင်းထဲမှထုတ်လိုက်ပါပြီ")
        } catch (e) {
          console.log(e);
        }
      };


    if (!data) {
        return <Loading />;
      }
    

    return (
        <View style={{ flex: 1, backgroundColor: colors.lightWhite }}>
            <HeaderComponent name={"Add To Cart"} navigation={navigation} icon={<CartButton navigation={navigation}/>} />

            <FlatList
                data={data?.cart_items}
                contentContainerStyle={{
                    paddingTop: 10,
                    paddingBottom: 40,
                    paddingHorizontal: 10,
                }}
                ItemSeparatorComponent={() => <View
                    style={{ width: "100%", height: 1, marginVertical: 8, backgroundColor: colors.borderPrimary }} />}
                renderItem={({ item }) =>
                  <CartCard 
                item={item} 
                callingApi={callingApi}
                updateQuantity={updateQuantity}
                removeCartItem={removeCartItem}
                />
                }
                ListEmptyComponent={
                  <View style={{...style.center}}>
                      <Text style={{...fonts.LT_body2,color:colors.primary}}>Your Cart is Empty</Text>
                  </View>
              }
            />
            <View style={{
                paddingHorizontal: 10,
                paddingBottom: 20,
            }}>


                <TouchableOpacity
                    onPress={() => {
                        if (data.cart_items.length === 0) {
                          Alert.alert("", "your cart is empty");
                        } else {
                         
                            navigation.navigate("Checkout", {
                              products: data.cart_items,
                         
                            })
                        }
                      }}
                    style={{
                        ...style.button,
                        backgroundColor: colors.primary,
                        marginTop: 20,
                    }}>
                    <Text style={{
                        ...fonts.body2,
                        color: colors.lightWhite,
                    }}>
                        Checkout
                    </Text>
                </TouchableOpacity>
            </View>
            <AlertBox title={title} myaTitle={myaTitle} modal={modal} setModal={setModal}/>

        </View>
    );
};

export default Cart;
