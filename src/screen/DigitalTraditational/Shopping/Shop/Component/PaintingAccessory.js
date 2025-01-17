import React,{useEffect} from "react";
import { FlatList, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { style } from "../../../../../constant/style";
import { colors,fonts } from "../../../../../constant/theme";
import ProductCard from "../../Component/ProductCard";
import { scaleWidth } from "../../../../../utils/responsive";
import { useQuery } from "@apollo/client";

const PaintingAccessory = ({ navigation,data,setCategoryName }) => {

  useEffect(() =>{
    setCategoryName("painting")
  },[])


  return (
    <>
      <View style={{
        ...style.flexRowSpace,
        paddingHorizontal: 15,
        marginTop: 10,
      }}>
        <Text style={{
          ...fonts.PT_h3,color:colors.primary
        }}>
            Painting Accessories
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("Product",{
            categoryName:"painting"
          })}
          style={style.flexRow}>
          <Text style={{ ...fonts.body2, marginRight: 3, color: colors.textMessage }}>
            See All
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        directionalLockEnabled={true}
        contentContainerStyle={{ paddingLeft: 15, marginTop: 10 }}
        alwaysBounceVertical={false}
      >
        <FlatList
          bounces={false}
          horizontal
          contentContainerStyle={{ alignSelf: "flex-start" }}
          keyExtractor={item => item.id.toLocaleString()}
          showsHorizontalScrollIndicator={false}
          data={data?.products}
          renderItem={({ item }) => <ProductCard data={item} styles={{
            marginBottom: 10,
            width: scaleWidth(156),
            marginRight: 7,
          }} />}
        />
      </ScrollView>
    </>
  );
};

export default PaintingAccessory;
