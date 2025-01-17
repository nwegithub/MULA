import {
    ActivityIndicator,
    Alert,
    Image,
    KeyboardAvoidingView,
    Modal,
    Platform,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,FlatList
} from "react-native";
import { colors, fonts } from "../../../constant/theme";
import { style } from "../../../constant/style";
import { useContext, useEffect, useState } from "react";
import { useApolloClient, useMutation } from "@apollo/client";
import { Context } from "../../../component/Context";
import { scaleHeight, scaleWidth } from "../../../utils/responsive";
import icons from "../../../constant/icons";
import HeaderComponent from "./Component/HeaderComponent";
import CartCard from "./Component/CartCard";
import { useQuery } from "@apollo/client";
import { UPDATE_CART_ITEM, DELETE_CART_ITEM } from "../../../graphql/mutations";
import { GET_CART_ITEM, GET_CART_ITEM_COUNT, GET_USER } from "../../../graphql/queries";
import AlertBox from "../../../component/AlertBox";
import CartButton from "../../../component/CartButton";

const Checkout = ({ navigation, route }) => {

    const { user } = useContext(Context);

    const client = useApolloClient();
    const [totalPrice,setTotalPrice] = useState(0)
    const [modal,setModal] = useState(false)
    const [title,setTitle] = useState("")
    const [myaTitle,setMyaTitle] = useState("")
    const [callingApi, setCallingApi] = useState(false);
    const [callingApi3, setCallingApi3] = useState(false);
   


    const { data: products } = useQuery(GET_CART_ITEM, {variables:{
        userId:user.id
    }, fetchPolicy: 'cache-and-network' })
    const { data: userData } = useQuery(GET_USER, {
        variables: { userId: user.id },
        fetchPolicy: "cache-and-network",
    });


    const [updateCartItem] = useMutation(UPDATE_CART_ITEM, { refetchQueries: [GET_CART_ITEM, GET_CART_ITEM_COUNT] })
    const [deleteCartItem] = useMutation(DELETE_CART_ITEM, { refetchQueries: [GET_CART_ITEM, GET_CART_ITEM_COUNT] })


    const updateQuantity = async (cartItemId, quantity) => {
        await updateCartItem({
            variables: {
                cartItemId,
                quantity,
            },
        });
    };

    const removeCartItem = async (cartItemId) => {
        try {
            await deleteCartItem({ variables: { cartItemId } });
            setModal(false)
            setTitle("Remove Item from Cart")
            setMyaTitle("စျေးဝယ်ခြင်းထဲမှထုတ်လိုက်ပါပြီ")

        } catch (e) {
            console.log(e);
        }
    };






    useEffect(() => {
        let tempTotal = 0;
        for (let i = 0; i < products?.cart_items.length; i++) {
            const itemTotal = products?.cart_items[i].product.price * products?.cart_items[i].quantity;
            tempTotal += itemTotal;
        }
        setTotalPrice(tempTotal);
    }, [products?.cart_items]);





    return (
        <View style={{ flex: 1, backgroundColor: colors.lightWhite }}>
<HeaderComponent name={"Checkout"} navigation={navigation} icon={<CartButton navigation={navigation}/>} />

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingHorizontal: 10,
                    marginTop: 10,
                    paddingBottom: 40,

                }}>

                <Text style={{ ...fonts.LT_body3 }}>
                    Delivery Address
                </Text>


                <TouchableOpacity
                                    onPress={() => navigation.navigate('Delivery Addresss')}
                                    style={{
                        marginVertical: 10,
                        paddingVertical: 15,
                        paddingHorizontal: 10,
                        ...style.flexRowSpace,
                        backgroundColor: colors.white,
                        borderRadius: 5,
                        ...style.shadow,
                    }}
                >
                    {
                        (userData.users_by_pk?.fullname || userData.users_by_pk?.phone || userData.users_by_pk?.address) ?
                            <>
                                <View style={{
                                    width: 40, height: 40
                                    , borderRadius: 40, ...style.center,
                                }}>
                                    <Image source={icons.location} resizeMode="contain"
                                        style={{ width: 20, height: 20, tintColor: colors.primary }} />
                                </View>
                                {
                                    userData.users_by_pk.address? 
                                    ( <View style={{ flex: 1, paddingLeft: 10 }}>
                                        <Text style={{ ...fonts.body1, color: colors.black }}>
                                            {JSON.parse(userData.users_by_pk.address).name}
                                        </Text>
                                        <Text style={{ ...fonts.body1, color: colors.black }}>
                                            {JSON.parse(userData.users_by_pk.address).phone}                                    </Text>
                                        <Text style={{ ...fonts.body1, color: colors.black }}>
                                            {JSON.parse(userData.users_by_pk.address).address}                                    </Text>
                                    </View>) 
                                    :
                                    (<View>
                                        <Text style={{ ...fonts.body2, color: colors.black }}>
                                          Select delivery address
                                        </Text>
                                      </View>)
                                }

                               

                                <TouchableOpacity
                                    onPress={() => navigation.navigate('Delivery Addresss')}
                                >
                                    <Image source={icons.edit}
                                        resizeMode="contain"
                                        style={{ width: 20, height: 20, tintColor: colors.primary }} />

                                </TouchableOpacity>
                            </>
                            :
                            <Text style={{ color: colors.red, marginTop: 5 }}>
                                You have no delivery address
                            </Text>

                    }


                </TouchableOpacity>

                <Text style={{ ...fonts.LT_body3, color: colors.black, paddingTop: 15, paddingBottom: 10 }}>Order Lists</Text>
              
                <FlatList
                data={products?.cart_items}
                contentContainerStyle={{
                    paddingTop: 10,
                    paddingBottom: 40,
                    paddingHorizontal: 10,
                }}
                ItemSeparatorComponent={() => <View
                    style={{ width: "100%", height: 1, marginVertical: 8, backgroundColor: colors.borderPrimary }} />}
                renderItem={({ item }) =>
                    <CartCard item={item} callingApi={callingApi} updateQuantity={updateQuantity}
                removeCartItem={removeCartItem} />
                }
                />

            </ScrollView>

            <View style={{
                backgroundColor: colors.white,
                padding: 10,
                paddingBottom: 20, borderTopLeftRadius: 9, borderTopRightRadius: 9
            }}>
                <Text style={{ ...fonts.LT_body3, color: colors.black }}>Order Summary</Text>
                <View style={{ ...style.flexRowSpace, paddingTop: 10 }}>
                    <Text style={{
                        ...fonts.body2,
                    }}>
                        Total
                    </Text>
                    <Text style={{
                        ...fonts.body2,
                        color: colors.textError,
                    }}>
                        {totalPrice} Ks
                    </Text>
                </View>



                

                <View style={{
                    borderStyle: 'dotted',
                    borderWidth: 1,
                    borderColor: 'black',
                    width: '100%', marginVertical: 19
                }} />
               

                <View style={style.flexRowSpace}>
               
                    <TouchableOpacity
                        disabled={callingApi3}
                        onPress={() => navigation.navigate('Screen Shot Payment')}
                        style={{
                            flex: 1,
                            ...style.button,
                            backgroundColor: colors.primary,
                            marginTop: 20,
                        }}>
                        {callingApi3
                            ? <ActivityIndicator size="small" color={colors.lightWhite} />
                            : <Text style={{
                                ...fonts.body2,
                                color: colors.lightWhite,
                            }}>
                                Continue to Payment
                            </Text>
                        }

                    </TouchableOpacity>
                </View>
            </View>


            <AlertBox title={title} myaTitle={myaTitle} modal={modal} setModal={setModal}/>


        </View>
    );
};

export default Checkout;
