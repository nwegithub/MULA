import React,{useContext} from "react";
import { Modal,View,Text,StyleSheet ,TouchableWithoutFeedback} from "react-native";
import { style } from "../constant/style";
import { Context } from "./Context";
import { colors,fonts } from "../constant/theme";

const ModalWrapper = ({modalOpen,setModalOpen,children}) => {
    const { digital, } = useContext(Context)

    return(
        <Modal visible={modalOpen} transparent={true} animationType="fade">
          <TouchableWithoutFeedback onPress={() => setModalOpen(false)}>
            <View style={{ flex: 1 ,}}>
              <View style={styles.sucModalContainer}>
                <View style={{ width: '70%', alignItems: 'center', backgroundColor: digital ? 'rgba(255, 255, 255, 0.90)' : colors.white, borderRadius: 15, }}>

                  <View style={{
                    borderRadius: 10, padding: 20,width:'100%',
                  }}>

                   {children}


                  </View>
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>

        </Modal>
    )
}
export default ModalWrapper

const styles = StyleSheet.create({
    sucModalContainer: {
        position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, ...style.center,
        backgroundColor: 'rgba(0,0,0,0.5)',
      },
})