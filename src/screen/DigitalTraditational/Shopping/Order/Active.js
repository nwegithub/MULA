import React, { useContext } from "react";
import { FlatList, Text, TouchableOpacity, View, Image } from "react-native";
import { colors, fonts } from "../../../../constant/theme";
import { useQuery } from "@apollo/client";
import { style } from "../../../../constant/style";
import icons from "../../../../constant/icons";
import { scaleWidth, scaleHeight } from "../../../../utils/responsive";
import { Context } from "../../../../component/Context";
import { GET_ACTIVE_ORDER } from "../../../../graphql/queries";
import Loading from "../../../../component/Loading";

const Active = ({ navigation }) => {

  const { user } = useContext(Context)

  const { data, loading, refetch } = useQuery(GET_ACTIVE_ORDER, {
    variables: { userId: user.id }, fetchPolicy: "cache-and-network",
  });



  if (!data) {
    return <Loading />;
  }

  return (
    <View style={{ flex: 1 }}>

      {data && data.orders.length === 0 &&
        <Text style={{
          marginTop: 50,
          textAlign: "center",
          ...fonts.h3,
        }}>
          Nothing Here
        </Text>
      }
      <FlatList
        data={data && data.orders}
        contentContainerStyle={{ paddingHorizontal: 10, marginVertical: 5 }}
        renderItem={({ item }) =>{
          console.log("item",item)
          return(
            <TouchableOpacity
            onPress={() => navigation.navigate("Track Order", {
              orderId: item.order_number,
            })}
            style={{
              padding: 10,
              marginBottom: 10,

              backgroundColor: colors.white,
              borderRadius: 5,
              ...style.shadow,
            }}
          >
            <View style={{ ...style.flexRowSpace }}>
              <Text style={{ ...fonts.body3, color: colors.black }}>Order No
                #{item.order_number}</Text>

              <View style={{
                borderRadius: 20, backgroundColor: colors.primary,
                padding: 5, ...style.center,
              }}
              >
                <Text style={{ color: colors.white, ...fonts.LT_body4 }}>Track Order</Text>
              </View>
            </View>
              {
                item.order_items.map((item,index) => 
                  <View style={{ ...style.flexRow }}>
                  <Image source={{ uri: item.product.product_image_url }}
                    style={{
                      width: 90, height: 80,
                      borderRadius: 5,
    
                    }}
                  />
                  <View style={{paddingLeft:10}}>
                    <Text style={{ ...fonts.body3, color: colors.black }}>
                    {
                      item.product.title
                    }
                    </Text>
                    <Text style={{
                      ...fonts.body3,
                      color: colors.primary, marginVertical: 5
                    }}>{item.total} Ks</Text>
    
                    <Text style={{ ...fonts.body2, color: colors.black, }}>
                    Qty - {item.quantity}
                    </Text>
                  </View>
                </View>
                )
              }

          </TouchableOpacity>
          )
        }
         
        }
      />

    </View>

  );
};

export default Active;
