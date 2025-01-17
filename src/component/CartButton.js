import React,{useContext} from "react";
import { TouchableOpacity,Image,StyleSheet,View,Text } from "react-native";
import icons from "../constant/icons";
import { scaleWidth,scaleHeight } from "../utils/responsive";
import { GET_CART_ITEM_COUNT } from "../graphql/queries";
import { useQuery } from "@apollo/client";
import { colors,fonts } from "../constant/theme";
import { Context } from "./Context";


const CartButton = ({navigation}) => {

  const {user} = useContext(Context)


    const {data} = useQuery(GET_CART_ITEM_COUNT,{variables:{
      userId: user.id
    },
    fetchPolicy:'cache-and-network'
  })


    return(
        
        <TouchableOpacity
        onPress={() => navigation.navigate("Cart", {
            redirectTo: "Cart",
        })
        }
        style={{
            width: 45,
            height: 45,
            justifyContent: "center",
            alignItems: "center",
        }}>
        <Image source={icons.cart} resizeMode="contain" style={{ width: scaleWidth(20), height: scaleHeight(20), tintColor: colors.primary }} />
        {data?.cart_items_aggregate.aggregate.sum.quantity &&
        <View style={styles.CartButton}>
          <Text style={{
            ...fonts.label3,
            color: colors.textWhite,
          }}>
            {data?.cart_items_aggregate.aggregate.sum.quantity}
          </Text>
        </View>
      }
    </TouchableOpacity>
    )
}
export default CartButton

const styles = StyleSheet.create({
CartButton:{
    position: "absolute",
    top: 0,
    zIndex: 1,
    right: 0,
    width: 22, height: 22,
    backgroundColor: colors.red,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    color: colors.textWhite,
  }
})