import React from 'react';
import { Image, Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import icons from '../../../../constant/icons';
import SeekBar from './SeekBar';
import { fonts } from '../../../../constant/theme';
import { style } from '../../../../constant/style';
import { scaleWidth, scaleHeight } from '../../../../utils/responsive';

const VideoControl = ({ duration, skipForward, skipBackward, currentTime, setVid, handleOnSeek, pause, setPause, fullScreen, setFullScreen,handleReplay }) => {
    const isVideoEnded = currentTime >= duration - 0.5; 
    return (
        <View
            pointerEvents='auto'
            style={styles.container}>
            {/* {
                isVideoEnded ?
                    <View style={styles.content}>
                        <TouchableOpacity
                        onPress={handleReplay}
                        >
                            <Image source={icons.replay}
                                resizeMode='contain'
                                style={{ width: 20, height: 20 }} />
                        </TouchableOpacity>
                    </View>
                    : */}
                    <View style={styles.content}>

                        <TouchableOpacity
                            onPress={skipBackward}
                            style={styles.back}
                        >
                            <Image source={icons.video_bardward} style={styles.icon} />
                        </TouchableOpacity>


                        <TouchableOpacity
                            onPress={() => {
                                setPause(!pause);
                            }}>
                            <Image source={pause ? icons.play_video : icons.pause_video}
                                resizeMode='contain'
                                style={{ width: 20, height: 20 }} />
                        </TouchableOpacity>


                        <TouchableOpacity
                            onPress={skipForward}
                            style={styles.forward}
                        >
                            <Image source={icons.video_forward} style={styles.icon} />
                        </TouchableOpacity>


                    </View>
            {/* } */}







            <View
                style={{
                    position: 'absolute',
                    bottom: 30,
                    paddingHorizontal: fullScreen ? 50 : 15,
                    flexDirection: 'row',
                    alignItems: 'center',
                }}>
                <SeekBar handleOnSeek={handleOnSeek} duration={duration} currentTime={currentTime} />

                <TouchableOpacity
                    style={{
                        marginLeft: 15,
                    }}
                    onPress={() => {
                        setFullScreen(!fullScreen);
                    }}>
                    <Image source={fullScreen ? icons.minimize : icons.maximize} style={{ width: 20, height: 20 }} />
                </TouchableOpacity>
            </View>
        </View>

    );
};


export default VideoControl;

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        backgroundColor: 'rgba(0,0,0,0.5)',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    back: {
        position: 'absolute',
        left: -55,
    },
    forward: {
        position: 'absolute',
        right: -55,
    },
    icon: { width: scaleWidth(25), height: scaleHeight(25) }
})
