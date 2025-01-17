import React from "react";
import { View,Text,TouchableOpacity,Image, } from "react-native";
import { colors,fonts } from "../../../../constant/theme";
import icons from "../../../../constant/icons";
import { style } from "../../../../constant/style";
import { scaleWidth,scaleHeight } from "../../../../utils/responsive";

const CartCard = ({item,callingApi,updateQuantity,removeCartItem}) => {
    return( 
        <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            backgroundColor: colors.white,
                            ...style.shadow,
                            borderRadius: 5,
                        }}
                    >
                        
                            <Image source={{ uri: item.product.product_image_url }}
                                style={{
                                    width: 90, height:'auto',
                                    borderRadius: 5,
                                    backgroundColor: colors.emptyImageColor,
                                }}
                            />
                        <TouchableOpacity
                            // onPress={() => navigation.navigate("Product Detail", { productId: item.product.id })}
                            style={{ flex: 1, padding: 10, }}>
                            <View style={{ ...style.flexRowSpace }}>


                                <Text numberOfLines={2} style={{
                                    ...fonts.body2,
                                }}>
                                    {item.product.title}
                                </Text>
                                <TouchableOpacity
                                    disabled={callingApi}
                                  onPress={() => removeCartItem(item.id)}
                                >
                                    <Image source={icons.digital_delete} resizeMode="contain" style={{ width: scaleWidth(25), height: scaleHeight(25), tintColor: colors.primary }} />
                                </TouchableOpacity>
                            </View>



                            <View style={{
                                ...style.flexRowSpace,
                                marginTop: 10,
                            }}>
                                <View>
                                    <Text style={{
                                        ...fonts.label1,
                                        color: colors.textError,
                                    }}>
                                        {
                                            item.product.price.toLocaleString()
                                        } Ks
                                    </Text>

                                </View>

                            </View>

                            <View
                                style={{
                                    ...style.flexRowSpace
                                }}>
                                <Text>
                                    Qty
                                </Text>
                                <View style={{
                                    flexDirection: "row",
                                }}>
                                    <TouchableOpacity
                                        disabled={callingApi || item.quantity === 1}
                                          onPress={() => updateQuantity(item.id, item.quantity - 1)}
                                        style={{
                                            justifyContent: "center",
                                            alignItems: "center",
                                            width: 25, height: 25,
                                            borderRadius: 40,
                                            borderWidth: 1,
                                            borderColor: colors.borderPrimary,
                                        }}>
                                        <Image source={icons.minus} resizeMode="contain" style={{ width: scaleWidth(20), height: scaleHeight(20), tintColor: colors.primary }} />
                                    </TouchableOpacity>
                                    <View style={{
                                        width: 50,
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}>
                                        <Text style={{
                                            ...fonts.body2,
                                        }}>
                                            {item.quantity}
                                        </Text>
                                    </View>
                                    <TouchableOpacity
                                        disabled={callingApi}
                                          onPress={() => updateQuantity(item.id, item.quantity + 1)}
                                        style={{
                                            justifyContent: "center",
                                            alignItems: "center",
                                            width: 25, height: 25,
                                            borderRadius: 40,
                                            borderWidth: 1,
                                            borderColor: colors.borderPrimary,
                                        }}>
                                        <Image source={icons.plus} resizeMode="contain" style={{ width: scaleWidth(20), height: scaleHeight(20), tintColor: colors.primary }} />
                                    </TouchableOpacity>

                                </View>
                            </View>

                        </TouchableOpacity>


                    </View>
    )
}

export default CartCard