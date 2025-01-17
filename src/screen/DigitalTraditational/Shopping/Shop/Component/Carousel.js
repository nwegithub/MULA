import React, { useEffect, useRef, useState } from "react";
import { Dimensions, FlatList, StyleSheet, Text, View } from "react-native";
import { scaleWidth } from "../../../../../utils/responsive";
import { colors } from "../../../../../constant/theme";
import { style } from "../../../../../constant/style";

const width = Dimensions.get("window").width;
const height = width * 0.6;

const Carousel = ({ data, renderItem, autoplay, type }) => {

  const [activeItem, setActiveItem] = useState(0);
  const scrollRef = useRef(null);

  const changeSlide = ({ nativeEvent }) => {
    const item = Math.ceil(nativeEvent.contentOffset.x / width);
    if (item !== activeItem) {
      setActiveItem(item);
    }
  };

  useEffect(() => {
    let interval;
    if (autoplay === true) {
      interval = setInterval(() => {
        const nextPage = (activeItem + 1) % data.length;
        setActiveItem(nextPage);
        scrollRef.current.scrollToIndex({
          index: nextPage,
          animated: true,
        });
      }, 3000);
    }

    return () => clearInterval(interval);
  }, [activeItem, data]);

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        pagingEnabled
        horizontal
	bounces={false}
        ref={scrollRef}
        showsHorizontalScrollIndicator={false}
        onScroll={changeSlide}
        style={styles.scroll}
        renderItem={({ item, index }) =>
          renderItem(item, index)
        }
      />
      {type === 2 ?
        <View style={{
          flexDirection: "row",
          position: "absolute",
          alignSelf: "center",
          top: 5,
          right: 5,
        }}>
          <View style={{
            backgroundColor: "rgba(0,0,0,.4)",
            paddingHorizontal: 5,
            borderRadius: 5,
            borderWidth: 1,
            borderColor: colors.borderPrimary,
          }}>
            <Text style={{ fontSize: 10, color: colors.lightWhite }}>
              {activeItem > data.length ? activeItem - 1 : activeItem + 1} / {data.length}
            </Text>
          </View>
        </View>
        :
        <View style={{
          flexDirection: "row",
          position: "absolute",
          alignSelf: "center",
          bottom: 0,
        }}>
          {data?.map((item, index) =>
            <View key={index}
                  style={index === activeItem ? {
                      fontSize: scaleWidth(8),
                      backgroundColor: colors.primary,
                      borderRadius: 5,
                      width: 20,
                      height: 3,
                      margin: 3,
                    }
                    : {
                      width: 10,
                      height: 3,
                      backgroundColor: colors.lightGray,
                      borderRadius: 10,
                      margin: 3,
                    }}
            />,
          )}
        </View>
      }
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
  },
  scroll: {
    width,
    height,
  },
});

export default Carousel;
