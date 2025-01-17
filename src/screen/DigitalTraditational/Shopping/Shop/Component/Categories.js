import { View, Text, Image, FlatList, TouchableOpacity } from 'react-native'
import { colors, fonts } from '../../../../../constant/theme'
import { style } from '../../../../../constant/style'
import { scaleWidth, scaleHeight } from '../../../../../utils/responsive'

const Categories = ({ data, navigation }) => {


    return (
        <View style={{ padding: 20 }}>
            <Text style={{
                ...fonts.PT_h3, color: colors.primary
            }}>Categories</Text>
            <FlatList
                horizontal
                data={data?.product_categories}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingTop: 16 }}
                renderItem={({ item, index }) => {
                    return (
                        <View key={index}
                            style={{ marginRight: 16 }}>
                            <TouchableOpacity
                                onPress={() => navigation.navigate("Product",{categoryName:item.title})}
                                style={{
                                    width: scaleWidth(55), height: scaleHeight(80), borderWidth: 2, borderColor: colors.primary,
                                    borderRadius: 30,
                                }}
                            >
                                <Image
                                    source={{ uri: item.image_url }}
                                    style={{ width: '100%', height: '100%', borderRadius: 40 }}
                                />
                            </TouchableOpacity>
                            <Text style={{
                                ...fonts.LT_body6, color: colors.black,
                            }}>{item.title}</Text>
                        </View>
                    )
                }}
            />
        </View>
    )
}

export default Categories
