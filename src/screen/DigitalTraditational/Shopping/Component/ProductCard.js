import { Image, Text, TouchableOpacity, View } from "react-native";
import { scaleWidth } from "../../../../utils/responsive";
import { colors,fonts } from "../../../../constant/theme";
import { Context } from "../../../../component/Context";
import { style } from "../../../../constant/style";
import { useNavigation } from "@react-navigation/native";
import { useApolloClient } from "@apollo/client";
import { useContext } from "react";



const ProductCard = ({ data, styles }) => {
  const navigation = useNavigation();

  const { userId } = useContext(Context);

  const client = useApolloClient();
  // const userData = client.readQuery({ query: GET_USER_PROFILE, variables: { userId } });

  return (
    <TouchableOpacity
      onPress={() => navigation.push("Product Detail", {
        productId:data.id
      })}
      style={{
        width: scaleWidth(170),
        
        borderRadius: 5,
        ...styles,borderTopLeftRadius:70,
        borderTopRightRadius:70,
        margin:5,...style.shadow,
        backgroundColor:colors.white
      }}>
      <Image source={{ uri: data.product_image_url }}
             style={{
               width: "100%",
               height: scaleWidth(155),
               backgroundColor: colors.emptyImageColor,
               borderTopLeftRadius:70,
               borderTopRightRadius:70,
             }}
      />
      <Text numberOfLines={2} style={{
        ...fonts.LT_body4,
        padding: 5,textAlign:'center',color:colors.black
       
      }}>
        {data.title}
      </Text>
      <View style={{
        ...style.flexRow,justifyContent:'center'
      }}>
        <Text style={{
          ...fonts.LT_body4,
          padding: 5,color:colors.primary,textAlign:'center'
        }}>
         {data.price}
          Ks
        </Text>
        
      </View>
    </TouchableOpacity>
  );
};

export default ProductCard;
