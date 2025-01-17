import { ActivityIndicator, FlatList, Text, TextInput, TouchableOpacity, View, Image } from "react-native";
import { style } from "../../../../constant/style";
import { colors, fonts } from "../../../../constant/theme";
import React, { useContext, useEffect, useState } from "react";
import ProductCard from "../Component/ProductCard";
import { Context } from "../../../../component/Context";
import { useQuery } from "@apollo/client";
import FilterModal from "../Product/Component/FilterModal";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import icons from "../../../../constant/icons";
import { scaleWidth, scaleHeight } from "../../../../utils/responsive";
import HeaderComponent from "../Component/HeaderComponent";
import ProductFilter from "./Component/ProductFilter";
import { GET_PRODUCT } from "../../../../graphql/queries";

const Product = ({ navigation, route }) => {
  const { userId } = useContext(Context);
  const {categoryName} = route?.params|| {}
  const [filterModal, setFilterModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchText, setSearchText] = useState("");
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    if(categoryName){
      setSelectedCategory(categoryName)
    }
  },[])

  const {data:productData} = useQuery(GET_PRODUCT,{variables:{
    where:{
      ...(searchValue? {title: {_ilike: `%${searchValue}%`}} : {}),
      ...(selectedCategory? {product_category: {title: {_ilike: `%${selectedCategory}%`}}}: {})
    }
  }})


  return (
    <View style={{ flex: 1, backgroundColor: colors.lightWhite }}>
      <HeaderComponent name={"Search"}  navigation={navigation} icon={<View style={{width:20,height:20}}/>}/>

      <ProductFilter 
      data={productData}
      searchText={searchText}
      setSearchText={setSearchText}
      filterModal={filterModal}
      setFilterModal={setFilterModal}
      selectedCategory={selectedCategory}
      setSelectedCategory={setSelectedCategory}
      searchValue={searchValue}
      setSearchValue={setSearchValue}

      />

    <View style={{paddingHorizontal:15}}> 
    <FlatList
        data={productData?.products}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        contentContainerStyle={{ paddingTop: 10}}
        renderItem={({ item }) =>
          <ProductCard data={item} styles={{
            marginBottom: 10,
            width: scaleWidth(156),
            marginRight: 7,
          }} />
        }

      />
    </View>

     

      
    </View>
  );
};

export default Product;
