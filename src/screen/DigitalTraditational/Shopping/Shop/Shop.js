import { SafeAreaView, ScrollView, Text, TouchableOpacity, View, StyleSheet, Image } from "react-native";
import { colors, fonts } from "../../../../constant/theme";
import React, { useContext, useState } from "react";
import { Context } from "../../../../component/Context";
import { style } from "../../../../constant/style";
import icons from "../../../../constant/icons";
import { useApolloClient } from "@apollo/client";
import { scaleWidth, scaleHeight } from "../../../../utils/responsive";
import Ads from "./Component/Ads";
import Categories from "./Component/Categories";
import MerchandiseArtwork from "./Component/MerchandiseArtwork";
import PaintingAccessory from "./Component/PaintingAccessory";
import { GET_PRODUCT_CATEGORY,GET_PRODUCT } from "../../../../graphql/queries";
import { useQuery } from "@apollo/client";
import CartButton from "../../../../component/CartButton";



const Shop = ({ navigation }) => {
  const { user } = useContext(Context);
  const [categoryName,setCategoryName] = useState("")

  const {data} = useQuery(GET_PRODUCT_CATEGORY,{fetchPolicy:'cache-and-network'})
  const {data:productData} = useQuery(GET_PRODUCT,{variables:{
    where: {
      product_category: {title: {_ilike: categoryName}}}
  },
fetchPolicy:'cache-and-network'
}
) 


  return (
    <View style={{ flex: 1, backgroundColor: colors.lightWhite }}>
      <SafeAreaView />

      <View style={styles.headerContainer}>


        <TouchableOpacity
          onPress={() => navigation.openDrawer()}
          style={{ flex: 1 }}
        >
          <Image source={icons.drawer} style={{ tintColor: colors.primary, width: scaleWidth(20), height: scaleHeight(20) }} />
        </TouchableOpacity>


        <Image source={icons.mula_logo_name} style={{ width: 100, height: 50, }} />



        <TouchableOpacity
          style={{ flex: 1, alignItems: "flex-end" }}
          
        >
{
                                user ?
                                    <CartButton navigation={navigation} />
                                    :
                                    <TouchableOpacity
                                        onPress={() => navigation.navigate('Sign In', { redirectTo: "BACK" })
                                        }
                                    >
                                        <Image source={icons.cart} resizeMode="contain" style={{ width: scaleWidth(20), height: scaleHeight(20), tintColor: colors.primary }} />

                                    </TouchableOpacity>

                            }
        </TouchableOpacity>

      </View>

      <ScrollView contentContainerStyle={{

        paddingBottom: 50,
      }}
        showsVerticalScrollIndicator={false}
      >



        <View style={{
          paddingHorizontal: 15, ...style.flexRowSpace
        }}>


          <TouchableOpacity
            onPress={() => navigation.navigate("Product")}
            style={{
              ...style.input,
              borderWidth: 0,

              width: '85%', height: 35,
              borderWidth: 0.5, borderColor: colors.primary, padding: 5
              , borderRadius: 5, ...style.flexRow


            }}>
            <Image source={icons.search} resizeMode="contain" style={{ width: scaleWidth(20), height: scaleHeight(20), tintColor: colors.secondary }} />
            <Text
              style={{ color: colors.gray, ...fonts.LT_body5, paddingLeft: 5 }}
            >
              Search item here
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('Product')}
          >
            <Image source={icons.filter} style={{ width: scaleWidth(35), height: scaleHeight(35), }} />

          </TouchableOpacity>
        </View>

        <Ads />
        <Categories data={data} navigation={navigation}/>
        <MerchandiseArtwork navigation={navigation} data={productData} setCategoryName={setCategoryName}categoryName={categoryName}/>
        <PaintingAccessory navigation={navigation} data={productData} setCategoryName={setCategoryName} categoryName={categoryName}/>




      </ScrollView>
    </View>
  );
};

export default Shop;

const styles = StyleSheet.create({
  container: { flex: 1, },
  bgImg: { flex: 1, height: '100%', },


  listContainer: {
    borderRadius: 20, height: 38, alignItems: 'center', justifyContent: 'center'
  },
  headerContainer: { ...style.flexRowSpace, paddingHorizontal: 20, },
  icon: { width: scaleWidth(20), height: scaleHeight(20) },
  header: { ...style.flexRow, flex: 1 }
})
