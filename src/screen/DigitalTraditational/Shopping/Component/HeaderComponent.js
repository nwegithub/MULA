import { View,Text,TouchableOpacity,Image } from "react-native";
import icons from "../../../../constant/icons";
import { style } from "../../../../constant/style";
import { fonts,colors } from "../../../../constant/theme";
import { scaleWidth,scaleHeight } from "../../../../utils/responsive";
import CartButton from "../../../../component/CartButton";

const HeaderComponent = ({name,icon,navigation}) => {


    return(
        <View style={{
            ...style.flexRowSpace,paddingTop:20
            
        }}>
            <TouchableOpacity onPress={() => navigation.goBack()}
                style={{
                    width: 40,
                    justifyContent: "center",
                    alignItems: "center",
                    height: 40,
                }}
            >
                <Image source={icons.back_arrow} resizeMode="contain" style={{ width: scaleWidth(20), height: scaleHeight(20), tintColor: colors.primary }} />
            </TouchableOpacity>
            <View>
                <Text style={{ ...fonts.PT_h2, color: colors.primary }}>
                    {name}
                </Text>
            </View>
        
        

           {icon? icon : null}


        </View>
    )
}
export default HeaderComponent