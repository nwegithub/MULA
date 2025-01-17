import { View,Modal,Animated } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { colors } from "../../../../constant/theme";


const SwitchModal = ({open,animatedStyle,digital})  => {
    return(
        <Modal visible={open} transparent={true} animationType="fade">
        <View style={{ position: 'absolute', left: 0, right: 0, bottom: 0, top: 0 }}>
          <Animated.View style={[{ flex: 1, }, animatedStyle]}>
            {
              digital ?
                <View style={{ flex: 1, backgroundColor: colors.primary }} />
                :
                <LinearGradient
                  colors={['#09FBD3', '#FE53BB']}
                  start={{ x: 0, y: 1 }}
                  end={{ x: 1, y: 0 }}
                  style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
                />
            }



          </Animated.View>
        </View>
      </Modal>
    )
}

export default SwitchModal