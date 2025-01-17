import { scaleHeight } from "../../../../../utils/responsive";
import { Dimensions, Image, Linking, TouchableOpacity, View } from "react-native";
import { colors } from "../../../../../constant/theme";
import Carousel from "./Carousel";
import React from "react";
import { useQuery } from "@apollo/client";
import { GET_PRODUCT_ADS } from "../../../../../graphql/queries";

const width = Dimensions.get("window").width;

const Ads = () => {
  const { data } = useQuery(GET_PRODUCT_ADS, { fetchPolicy: "cache-and-network" });



  return (
    <View style={{
      height: scaleHeight(216),
      marginTop: 20,
    }}>
      {/* {data && data.home_ads.length > 0 && */}
        <Carousel
          autoplay={true}
          type={1}
          data={data?.product_ads}
          renderItem={(item, index) =>
            <TouchableOpacity
              key={index}
              onPress={() => Linking.openURL(item.linking_url)}
              style={{
                width,
                paddingHorizontal: 15,
                alignItems: "center",
                borderRadius: 10,
              }}>
              <Image
                source={{ uri: item.product_image_url }}
                style={{
                  width: "100%",
                  height: scaleHeight(200),
                  borderRadius: 10,
                  backgroundColor: colors.white,
                }}
              />
            </TouchableOpacity>
          }
        />
      {/* } */}
    </View>
  );
};

export default Ads;
