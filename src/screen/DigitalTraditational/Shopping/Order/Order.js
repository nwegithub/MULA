import React, { useContext, useState } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Completed from "./Completed";
import { colors, fonts } from "../../../../constant/theme";
import Active from "./Active";
import Rejected from "./Rejected";
import { Context } from "../../../../component/Context";
import { Text, View, TouchableOpacity, StyleSheet, ScrollView, Image, Platform } from "react-native";
import { style } from "../../../../constant/style";
import { scaleWidth, scaleHeight } from "../../../../utils/responsive";
import icons from "../../../../constant/icons";
import HeaderComponent from "../Component/HeaderComponent";
import CartButton from "../../../../component/CartButton";

const Tab = createMaterialTopTabNavigator();

const Order = ({ navigation }) => {
  const { setUser, user, langData } = useContext(Context);
  const [listSelected, setListSelected] = useState(1);

  const list = [
    { id: 1, name: "Active" },
    { id: 2, name: "Completed" },
    { id: 3, name: "Rejected" },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: colors.lightWhite }}>
   <HeaderComponent name={"My Orders"} navigation={navigation} icon={<View style={{width:20,height:20}}/>}/>
           

   <View style={{...style.flexRowSpace,paddingHorizontal:15}}>
   {list.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => setListSelected(item.id)}
            style={[
              styles.listContainer,
              {
                backgroundColor: listSelected === item.id ? colors.primary : colors.lightWhite,
                borderWidth: 1,
                borderColor: colors.primary,
                marginRight: 10,
                width: '30%',
              },
            ]}
          >
            <Text
              style={{
                ...fonts.LT_body4,
                color: listSelected === item.id ? colors.lightWhite : colors.primary,
                textAlign: "center",
                lineHeight: Platform.OS === "ios" ? 0 : 25,
              }}
            >
              {item.name}
            </Text>
            
          </TouchableOpacity>
        ))}
   </View>
        
     

      {/* Rendering tab content based on selection */}
      <View style={{ flex: 1 }}>
        {listSelected === 1 && <Active navigation={navigation} />}
        {listSelected === 2 && <Completed navigation={navigation} />}
        {listSelected === 3 && <Rejected navigation={navigation} />}
      </View>
    </View>
  );
};

export default Order;

const styles = StyleSheet.create({
  container: { flex: 1 },
  bgImg: { flex: 1, height: "100%" },
  listContainer: {
    borderRadius: 20,
    height: 38,
    alignItems: "center",
    justifyContent: "center",
  },
  headerContainer: { ...style.flexRowSpace, paddingHorizontal: 20, marginTop: 5 },
  icon: { width: scaleWidth(20), height: scaleHeight(20) },
  header: { ...style.flexRow, flex: 1 },
});
