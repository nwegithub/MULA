import React, {useState} from 'react';
import {Dimensions, SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import {colors} from '../constant/theme';
import {style} from '../constant/style';

const width = Dimensions.get('window').width
const height = width * 0.6

const Carousel = ({scrollRef,data,renderItem}) => {

    const [activeItem,setActiveItem] = useState(0)
 
    const changeSlide = ({nativeEvent}) =>{

        const item = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width)
        if( item !== activeItem){
            setActiveItem(item)
        }
    }

    return(
        <View style={{flex:1}}>
            <View style={styles.container}>
            <ScrollView
                pagingEnabled
                horizontal
                ref={scrollRef}
                showsHorizontalScrollIndicator={false}
                onScroll={changeSlide}
                style={styles.scroll}
            >
                {
                data.map((item, index) =>
                    renderItem(item, index)
                )}
            </ScrollView>
            <View style={styles.pagination}>
                {
                data.map((item, index) =>

                <View
                    key={index}>
                        {
                            index === activeItem ?
                            // <View style={{}}>
                            // <Text style={styles.pagingActiveText}>⬤</Text>
                            // </View>
                            <View style={styles.pagingActiveText}/>
                            
                            :
                            <View style={styles.pagingText}/>
                            
                        }
                    </View>
                )}
            </View>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        width,
        height: '100%',
        backgroundColor: colors.lightWhite,
        ...style.shadow
    },
    scroll: {
        width,
        height
    },
    pagination: {
        flexDirection: 'row',
        position: 'absolute',
        alignSelf:'center',
        bottom:70
    },
    pagingText: {
        // fontSize: 15,
        // color: '#888',
       margin: 3,
        width:10,height:10,
        borderRadius:50,borderWidth:1,borderColor:colors.black,
        marginTop:9

    },
    pagingActiveText: {
        margin: 3,
        width:10,height:10,
        borderRadius:50,backgroundColor:colors.black,
        marginTop:9
    }
})

export default Carousel
