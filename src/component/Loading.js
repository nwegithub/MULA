import React, { useContext } from 'react';
import { Image, View, ImageBackground } from 'react-native';
import images from '../constant/images';
import { Context } from './Context';
import { colors } from '../constant/theme';


const Loading = ({digital}) => {

    return (
        <View style={{

            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            alignItems: 'center',
            justifyContent: 'center',backgroundColor:colors.lightWhite
        }}>

                <Image
                    style={{
                        width: 120,
                        height: 120,
                    }}
                    source={require('../assets/images/loading.gif')} />
       

        </View>
    );
};

export default Loading;
