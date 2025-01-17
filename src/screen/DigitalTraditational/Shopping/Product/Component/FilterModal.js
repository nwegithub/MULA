import {
    Animated,
    Modal,
    ScrollView,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { colors, fonts } from "../../../../../constant/theme";
import { style } from "../../../../../constant/style";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { GET_PRODUCT_CATEGORY } from "../../../../../graphql/queries";
import { useQuery } from "@apollo/client";



const FilterModal = ({
    modal,
    setModal,
    selectedCategory,
    setSelectedCategory,

}) => {
    const [tempCategory, setTempCategory] = useState("");


    const {data} = useQuery(GET_PRODUCT_CATEGORY,{fetchPolicy:'cache-and-network'})


    const slideAnimation = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (modal) {
            Animated.timing(slideAnimation, {
                toValue: 1,
                duration: 400,
                useNativeDriver: true,
            }).start();
        }
    }, [modal]);

    const closeModal = () => {
        Animated.timing(slideAnimation, {
            toValue: 0,
            duration: 400,
            useNativeDriver: true,
        }).start(() => setModal(false));
    };

    const handleResetFilter = () => {
        setTempCategory("");

    };

    const handleApplyFilter = () => {
        setSelectedCategory(tempCategory);
        closeModal();
    };

    useEffect(() => {
        setTempCategory(selectedCategory);

    }, [ selectedCategory]);

    return (
        <Modal visible={modal} onRequestClose={closeModal} transparent={true}>
            <TouchableWithoutFeedback onPress={closeModal}>
                <View
                    style={{
                        flex: 1,
                        backgroundColor: "rgba(34,34,34, 0.5)",
                        justifyContent: "flex-end",
                    }}
                >
                    <Animated.View
                        style={{
                            backgroundColor: colors.white,
                            width: "100%",
                            borderTopLeftRadius: 20,
                            borderTopRightRadius: 20,
                            overflow: "hidden",
                            transform: [
                                {
                                    translateY: slideAnimation.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [300, 0],
                                    }),
                                },
                            ],
                        }}
                    >
                        <ScrollView
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={{ padding: 20 }}
                        >
                            <Text style={{ ...fonts.title3, color: colors.textPrimary }}>
                                Categories
                            </Text>
                            <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginVertical: 15 }}>
                                {data?.product_categories.map((item, index) => (
                                    <TouchableOpacity
                                        key={index}
                                        onPress={() => setTempCategory(item.title)}
                                        style={{
                                            backgroundColor:
                                                item.title === tempCategory ? colors.primary : colors.white,
                                            borderWidth: 0.8,
                                            borderColor: colors.primary,
                                            borderRadius: 20,
                                            paddingHorizontal: 15,
                                            paddingVertical: 10,
                                            margin: 5,
                                        }}
                                    >
                                        <Text
                                            style={{
                                                ...fonts.label1,
                                                color: item.title === tempCategory ? colors.lightWhite : colors.gray,
                                            }}
                                        >
                                            {item.title}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </ScrollView>

                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                padding: 10,
                                borderTopWidth: 1,
                                borderColor: colors.gray,
                                backgroundColor: colors.white,
                            }}
                        >
                            <TouchableOpacity
                                onPress={handleResetFilter}
                                style={{
                                    flex: 1,
                                    marginRight: 10,
                                    borderWidth: 1,
                                    borderColor: colors.primary,
                                    borderRadius: 9,
                                    paddingVertical: 10,
                                    alignItems: "center",
                                }}
                            >
                                <Text style={{ ...fonts.body1, color: colors.textPrimary }}>
                                    Clear All
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={handleApplyFilter}
                                style={{
                                    flex: 1,
                                    backgroundColor: colors.primary,
                                    borderRadius: 9,
                                    paddingVertical: 10,
                                    alignItems: "center",
                                }}
                            >
                                <Text style={{ ...fonts.body1, color: colors.lightWhite }}>
                                    Apply
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </Animated.View>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
};

export default FilterModal;
