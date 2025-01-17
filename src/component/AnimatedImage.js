import React, {useContext, useEffect, useRef} from 'react';
import {Animated} from 'react-native';
import { colors } from '../constant/theme';
import { Context } from './Context';

const AnimatedImage = ({uri, style}) => {
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const springValue = useRef(new Animated.Value(0)).current;
    const {digital} = useContext(Context)


    useEffect(() => {
        let fadeInAndOut = Animated.sequence([
            Animated.timing(fadeAnim, {
                toValue: 1, 
                duration: 700,
                useNativeDriver: true,
            }), 
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 700,
                useNativeDriver: true,
            }),
        ]);

        Animated.loop(
            Animated.parallel([
                fadeInAndOut,
                Animated.timing(springValue, {
                    toValue: 1,
                    friction: 3,
                    tension: 40,
                    duration: 700,
                    useNativeDriver: true,
                }),
            ]),
        ).start();
    }, []);

    return (
        <Animated.Image style={[style, {backgroundColor:digital? '#67676b' : '#e8bf89', opacity: fadeAnim,}]}
                        source={{uri}}
                        onLoadEnd={() => {
                            fadeAnim.setValue(1);
                            springValue.setValue(1);
                            fadeAnim.stopAnimation();
                            springValue.stopAnimation();
                        }}   
        />

    );
};


export default AnimatedImage;