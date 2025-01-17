import React, { useState,useEffect } from "react";
import { View, Text, TouchableOpacity, TextInput, Image } from "react-native";
import icons from "../../../../../constant/icons";
import { fonts, colors } from "../../../../../constant/theme";
import { style } from "../../../../../constant/style";
import { scaleWidth, scaleHeight } from "../../../../../utils/responsive";
import FilterModal from "../../Product/Component/FilterModal";


const ProductFilter = ({
    searchText,
    setSearchText,
    filterModal,
    setFilterModal,
    searchValue,
    setSearchValue,
    selectedCategory,
    setSelectedCategory,

}) => {


   

    return (
        <>


            <View style={{
                paddingHorizontal: 15, ...style.flexRowSpace
            }}>


                <View style={{
                    ...style.flexRowSpace,
                    marginHorizontal: 10,
                    flex: 1, borderWidth: 0.5, borderColor: colors.primary,
                    height: 35, borderRadius: 6,
                }}>
                    <TextInput
                        placeholder="Search"
                        placeholderTextColor={colors.gray}
                        value={searchText}
                        onChangeText={text => setSearchText(text)}
                        onEndEditing={e => setSearchValue(e.nativeEvent.text)}
                        style={{
                            ...style.input,
                            paddingLeft: 40,
                            borderWidth: 0,
                        }}
                    />
                    <View style={{ position: "absolute", left: 10 }}>
                        <Image source={icons.search} resizeMode="contain" style={{ width: scaleWidth(20), height: scaleHeight(20), tintColor: colors.secondary }} />
                    </View>
                    {searchText &&
                        <TouchableOpacity
                            onPress={() => {
                                setSearchText("");
                                setSearchValue("");
                            }}
                            style={{ position: "absolute", right: 10 }}>
                            <Image source={icons.remove} resizeMode="contain" style={{ width: scaleWidth(20), height: scaleHeight(20), tintColor: colors.secondary }} />
                        </TouchableOpacity>
                    }
                </View>
                <TouchableOpacity onPress={() => setFilterModal(true)}
                    style={{
                        width: 45,
                        justifyContent: "center",
                        alignItems: "center",
                        height: 45,
                    }}
                >
                    {(selectedCategory)
                        ?
                        <Image source={icons.filter_fill} style={{ width: scaleWidth(25), height: scaleHeight(25), }} />
                        :
                        <Image source={icons.filter} style={{ width: scaleWidth(35), height: scaleHeight(35), }} />
                    }
                </TouchableOpacity>
            </View>
            <FilterModal
                modal={filterModal} 
                setModal={setFilterModal}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                
            />
        </>
    )
}
export default ProductFilter