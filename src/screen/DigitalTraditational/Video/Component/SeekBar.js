import React from 'react';
import { Text, View } from 'react-native';
import Slider from '@react-native-community/slider';

const SeekBar = ({ handleOnSeek, duration, currentTime }) => {

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        const leadingZero = remainingSeconds < 10 ? '0' : '';
        return `${minutes}:${leadingZero}${remainingSeconds}`;
    };

    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
            <Text style={{ color: '#FFFFFF', marginRight: 10 }}>{formatTime(currentTime)}</Text>
            <View style={{ flex: 1 }}>
                <Slider
                    style={{ width: '100%' }}
                    minimumValue={0}
                    maximumValue={duration}
                    value={currentTime}
                    minimumTrackTintColor="#FFFFFF"
                    maximumTrackTintColor="lightgray"
                    thumbTintColor="#fff"
                    onSlidingComplete={handleOnSeek}
                />
            </View>
            <Text style={{ color: '#FFFFFF', marginLeft: 10 }}>{formatTime(duration)}</Text>
        </View>
    );
};

export default SeekBar;
