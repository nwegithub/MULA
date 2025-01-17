import React, { useContext, useState, useEffect } from "react";
import { Image, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors, fonts } from "../../../../constant/theme";
import { style } from "../../../../constant/style";
import icons from "../../../../constant/icons";
import { GET_ORDER_BY_ID } from "../../../../graphql/queries";
import { useQuery } from "@apollo/client";
import Loading from "../../../../component/Loading";
import { Context } from "../../../../component/Context";
import HeaderComponent from "../Component/HeaderComponent";
import { DarkBreakLine } from "../../../../component/BreakLine";

const TrackOrder = ({ route, navigation }) => {
  const [selected, setSelected] = useState(null);

  const { langData } = useContext(Context);

  const { orderId } = route.params;

  const [totalPrice, setTotalPrice] = useState(0)
  const [totalQty, setTotalQty] = useState(0)


  const { data } = useQuery(GET_ORDER_BY_ID, { variables: { orderId }, fetchPolicy: "cache-and-network" });



  useEffect(() => {
    let tempTotal = 0;
    let tempTotalQty = 0;
    for (let i = 0; i < data?.orders[0]?.order_items.length; i++) {
      const itemTotal = data?.orders[0]?.order_items[i].total * data?.orders[0]?.order_items[i].quantity;
      tempTotal += itemTotal;
      const itemqty = data?.orders[0]?.order_items[i].quantity
      tempTotalQty += itemqty
    }
    setTotalPrice(tempTotal);
    setTotalQty(tempTotalQty)
  }, [data?.orders[0]?.order_items]);

  if (!data) {
    return <Loading />;
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.lightWhite }}>
      <HeaderComponent name={"Order Tracking"} navigation={navigation} icon={<View style={{width:20,height:20}} />} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ marginTop: 10, marginHorizontal: 10 }}
      >
        <Text style={{ ...fonts.LT_body1, color: colors.primary, textAlign: 'center' }}>
          Order No #{data.orders[0].order_number}
        </Text>

        {
          data.orders[0].order_items.map((item, index) =>
            <>
              <View style={{ ...style.flexRow, marginBottom: 10, backgroundColor: colors.white }}>
                <Image source={{ uri: item.product.product_image_url }}
                  style={{
                    width: 90, height: 80,
                    borderRadius: 5,

                  }}
                />
                <View style={{ paddingLeft: 10 }}>
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
            </>

          )
        }

        <View style={{
          backgroundColor: colors.white,
          padding: 10,
          paddingBottom: 20, borderTopLeftRadius: 9, borderTopRightRadius: 9
        }}>
          <Text style={{ ...fonts.LT_body3, color: colors.black }}>Order Details</Text>
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
          <View style={{ ...style.flexRowSpace, paddingTop: 10 }}>
            <Text style={{
              ...fonts.body2,
            }}>
              Total Quantity
            </Text>
            <Text style={{
              ...fonts.body2,
              color: colors.textError,
            }}>
              {totalQty}
            </Text>
          </View>





          <View style={{
            borderStyle: 'dotted',
            borderWidth: 1,
            borderColor: 'black',
            width: '100%', marginVertical: 19
          }} />



        </View>

        {data.orders[0].order_status === "reject"
          ? <View style={{ alignItems: "center", marginTop: 10 }}>
            <Image source={icons.orderReject} style={{
              width: 100, height: 100,
            }} resizeMode="contain" />
            <Text style={{ ...fonts.body3, color: "red" }}>
              reject order
            </Text>
          </View>
          :
          <>
            <View style={{ marginVertical: 20 }}>


              <View style={styles.order}>

                <Image source={icons.Order_package} style={[styles.orderPackageIcon, {
                  tintColor: colors.primary,
                }]} resizeMode="contain" />

                <Image source={icons.verified} style={[styles.icon, {
                  tintColor: data.orders[0].order_status
                  !== "pending" ? colors.primary : colors.gray,
                }]} resizeMode="contain" />

                <Image source={icons.Delivery_car} style={[styles.icon, {
                  tintColor: data.orders[0].order_status !== "pending" &&
                  data.orders[0].order_status !== "verified" ? colors.primary : colors.gray,
                }]} resizeMode="contain" />


                <Image
                  source={icons.receive_box}
                  style={{
                    width: 30, height: 30, marginLeft: 30,
                    tintColor: data.orders[0].order_status === "completed" ? colors.primary : colors.gray,
                  }} resizeMode="contain" />


              </View>

              <View style={[styles.order, { marginTop: 10 }]}>
                <Image source={icons.Order_check} style={[styles.orderCheck, {
                  tintColor: colors.primary,
                }]} resizeMode="contain" />
                <Image source={icons.hori_dotLine} style={styles.horDot} resizeMode="contain" />
                <Image source={icons.Order_check} style={[styles.orderCheck, {
                  tintColor: data.orders[0].order_status
                  !== "pending" ? colors.primary : colors.gray,
                }]} resizeMode="contain" />
                <Image source={icons.hori_dotLine} style={styles.horDot} resizeMode="contain" />
                <Image source={icons.Order_check} style={[styles.orderCheck, {
                  tintColor: data.orders[0].order_status !== "pending" &&
                  data.orders[0].order_status !== "verified" ? colors.primary : colors.gray,
                }]} resizeMode="contain" />
                <Image source={icons.hori_dotLine} style={styles.horDot} resizeMode="contain" />
                <Image source={icons.Order_check} style={[styles.orderCheck, {
                  tintColor: data.orders[0].order_status === "completed" ? colors.primary : colors.gray,
                }]} resizeMode="contain" />

              </View>
            </View>


            <View style={styles.orderStatusContainer}>
              <Text style={styles.statusText}>Order Status</Text>


              <View style={{ marginTop: 20 }}>
                <View style={styles.orderDetail}>
                  <Image source={icons.recCheck} style={[styles.orderStatusIcon, {
                    tintColor: colors.primary,
                  }]} />
                  <View style={{ paddingLeft: 10 }}>
                    <Text style={[styles.orderText1, {
                      color: colors.primary,
                    }]}>Order Placed</Text>

                  </View>
                </View>
                <Image source={icons.verti_dotLine} style={[styles.orderStatusIcon,
                  { marginVertical: 5, tintColor: colors.primary }]} resizeMode="contain" />
              </View>

              <View>
                <View style={styles.orderDetail}>
                  <Image source={icons.recCheck} style={[styles.orderStatusIcon, {
                    tintColor: data.orders[0].order_status
                    !== "pending" ? colors.primary : "#8f8f93",
                  }]} />
                  <View style={{ paddingLeft: 10 }}>
                    <Text style={[styles.orderText1, {
                      color: data.orders[0].order_status
                      !== "pending" ? colors.primary : colors.black,
                    }]}>In process</Text>

                  </View>
                </View>
                <Image source={icons.verti_dotLine} style={[styles.orderStatusIcon,
                  { marginVertical: 5, tintColor: colors.primary }]} resizeMode="contain" />
              </View>

              <View>
                <View style={styles.orderDetail}>
                  <Image source={icons.recCheck} style={[styles.orderStatusIcon, {
                    tintColor: data.orders[0].order_status !== "pending" &&
                    data.orders[0].order_status !== "verified" ? colors.primary : "#8f8f93",
                  }]} />
                  <View style={{ paddingLeft: 10 }}>
                    <Text style={[styles.orderText1, {
                      color: data.orders[0].order_status !== "pending" &&
                      data.orders[0].order_status !== "verified" ? colors.primary : colors.black,
                    }]}>Delivered</Text>

                  </View>
                </View>
                <Image source={icons.verti_dotLine} style={[styles.orderStatusIcon,
                  { marginVertical: 5, tintColor: colors.primary }]} resizeMode="contain" />
              </View>

              <View>
                <View style={styles.orderDetail}>
                  <Image source={icons.recCheck} style={[styles.orderStatusIcon, {
                    tintColor: data.orders[0].order_status === "completed" ? colors.primary : "#8f8f93",
                  }]} />
                  <View style={{ paddingLeft: 10 }}>
                    <Text style={[styles.orderText1, {
                      color: data.orders[0].order_status === "completed" ? colors.primary : colors.black,
                    }]}>Arrived</Text>

                  </View>
                </View>

              </View>

            </View>
          </>

        }

      </ScrollView>
    </View>
  );

};
export default TrackOrder;

const styles = StyleSheet.create({
  btn: {
    padding: 10,
    marginBottom: 10,
    ...style.flexRow,
    backgroundColor: colors.white,
    borderRadius: 5,
    ...style.shadow,
  },
  order: { ...style.flexRow, ...style.center },
  icon: { width: 30, height: 30, marginHorizontal: 30 },
  orderPackageIcon: { width: 30, height: 30, marginRight: 30 },
  horDot: { width: 55 },
  textContainer: { justifyContent: "center", alignItems: "center" },
  text: { ...fonts.body3, color: colors.black },
  statusText: { fontSize: 17, fontWeight: "bold", color: colors.primary },
  orderDetail: { ...style.flexRow },
  orderCheck: { width: 20, height: 20, marginHorizontal: 8 },
  line: { width: "100%", height: 1, backgroundColor: colors.gray, marginVertical: 20 },
  orderStatusContainer: { padding: 20 },
  orderStatusIcon: { width: 25, height: 25 },
  orderText1: { fontSize: 17, color: colors.black },
});
