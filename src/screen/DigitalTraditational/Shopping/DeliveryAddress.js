import React, { useContext, useRef, useState } from "react";
import { Alert, FlatList, Image, Text, TouchableOpacity, View, StyleSheet, Modal, TextInput,ActivityIndicator } from "react-native";
import { style } from "../../../constant/style";
import { colors, fonts } from "../../../constant/theme";
import icons from "../../../constant/icons";
import { Context } from "../../../component/Context";
import { scaleWidth, scaleHeight } from "../../../utils/responsive";
import HeaderComponent from "./Component/HeaderComponent";
import ModalWrapper from "../../../component/ModalWrapper";
import { GET_ADDRESS ,GET_USER} from "../../../graphql/queries";
import { CREATE_ADDRESS,UPDATE_DEFAULT_ADDRESS } from "../../../graphql/mutations";
import { useQuery,useMutation } from "@apollo/client";
import AlertBox from "../../../component/AlertBox";


const DeliveryAddress = ({ navigation }) => {
  const modalRef = useRef();
  const {user} = useContext(Context)
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [isModalVisible, setModalVisible] = useState(false);
  const [modal,setModal] = useState(false)
  const [title,setTitle] = useState("")
  const [myaTitle,setMyaTitle] = useState("")
  const [loading,setLoading] = useState(false)
  const {data:addressData} = useQuery(GET_ADDRESS,{variables:{
    userId:user.id
  },
  fetchPolicy:'cache-and-network'
}) 
const { data: userData, loading: userDataLoading } = useQuery(GET_USER, {
  variables: { userId: user.id },
  fetchPolicy: "cache-and-network",
});
  const [updateDefaultAddress] = useMutation(UPDATE_DEFAULT_ADDRESS, { refetchQueries: [GET_USER] });
  const [createAddress] = useMutation(CREATE_ADDRESS,{refetchQueries:[GET_ADDRESS]})

  const saveNewAddress = async () => {
    setLoading(true)
    await createAddress({
      variables: {
        userId: user.id,
        name,
        phone,
        address,
      },
    });
    setModal(true)
    setTitle("Successful")
    setMyaTitle("အောင်မြင်ပါသည်")
    setName("");
    setPhone("");
    setAddress("");
    setModalVisible(false);
    setLoading(false)
  };

  const changeDefaultAddress = async (item) => {
    await updateDefaultAddress({
      variables: {
        userId: user.id,
        address: JSON.stringify(item),
      },
    });
  

  };

  const handleApplayAddress = () => {
    alert("Successfully selected delivery address");
    navigation.goBack();
  }


  return (
    <View style={{ flex: 1, backgroundColor: colors.lightWhite }}>

      <HeaderComponent name={"Delivery Address"} navigation={navigation} icon={<View style={{width:20,height:20}}/>}/>

      <Text style={{ ...fonts.body3, paddingLeft: 15 }}>
        Select your address
      </Text>


      <FlatList
        data={addressData?.address}
        renderItem={({ item }) =>
          <View
            style={{
              ...style.flexRowSpace,
              backgroundColor: colors.white,
              padding: 10,
              paddingHorizontal: 20,
              borderRadius: 5,
              ...style.shadow,
              marginBottom: 10,
            }}
          >
            <TouchableOpacity
              onPress={() => changeDefaultAddress(item)}
              style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                <Image
                  source={icons.location}
                  resizeMode="contain"
                  style={{ width: scaleWidth(20), height: scaleHeight(20), tintColor: colors.primary }}
                />
                <View style={{ paddingHorizontal: 10, flex: 1 }}>
                  <Text style={{ ...fonts.body1, color: colors.black }}>
                    {item.name}
                  </Text>
                  <Text style={{ ...fonts.body1, color: colors.black }}>
                    {item.phone}
                  </Text>
                  <Text  ellipsizeMode="tail" style={{ color: colors.gray }}>
                    {item.address}
                  </Text>
                </View>
              </View>
              <Image
                source={userData.users_by_pk.address && JSON.parse(userData.users_by_pk.address).id === item.id ? icons.cirChcek : icons.cirUncheck}
                resizeMode="contain"
                style={{ width: scaleWidth(20), height: scaleHeight(20),tintColor:colors.primary, }}
              />
            </TouchableOpacity>
          </View>

        }
        contentContainerStyle={{ padding: 10, paddingBottom: 100 }}
      />

      <View style={{ marginHorizontal: 15, marginBottom: 30 }}>
        <TouchableOpacity

          onPress={() => setModalVisible(true)}

          style={{
            ...style.button, backgroundColor: colors.lightWhite, borderRadius: 15, borderWidth: 0.6, borderColor: colors.primary,
            ...style.flexRow, ...style.center, borderStyle: 'dotted',
            borderWidth: 1,
          }}
        >
          <Image
            source={icons.plus}
            style={{ width: 15, height: 15, tintColor: colors.primary, }}
          />
          <Text style={{
            color: colors.black, paddingLeft: 15
          }}>
            Add New Address
          </Text>
        </TouchableOpacity>
      </View>

      <View style={{ marginHorizontal: 15, marginBottom: 30 }}>
        <TouchableOpacity

          onPress={handleApplayAddress}

          style={{
            ...style.button, backgroundColor: colors.primary, borderRadius: 30,
          }}
        >

          <Text style={{
            color: colors.lightWhite, paddingLeft: 15, ...fonts.LT_body4
          }}>
            Apply
          </Text>
        </TouchableOpacity>
      </View>






      
            <ModalWrapper modalOpen={isModalVisible} setModalOpen={setModalVisible}>
            <View style={styles.header}>
              <Text style={styles.title}>Add New Address</Text>

            </View>
            <View style={styles.separator} />


            <View style={styles.form}>
              <Text style={styles.label}>Name</Text>
              <TextInput
                value={name}
                onChangeText={text => setName(text)}
                style={styles.input}
              />
              <Text style={styles.label}>Phone</Text>
              <TextInput
                value={phone}
                onChangeText={text => setPhone(text)}
                keyboardType="phone-pad"
                style={styles.input}
              />
              <Text style={styles.label}>Address</Text>
              <TextInput
                value={address}
                onChangeText={text => setAddress(text)}
                style={styles.input}
              />

              <TouchableOpacity
                disabled={!(name || phone || address)}
                onPress={saveNewAddress}
                style={{ backgroundColor: colors.primary, ...style.button, marginTop: 20 }}
              >
                {
            loading ?
              <ActivityIndicator size="small" color="#ffffff" />
              :
              <Text style={styles.buttonText}>Add</Text>

                }
              </TouchableOpacity>
            </View>
            </ModalWrapper>
        <AlertBox title={title} setTitle={setTitle} modal={modal} setModal={setModal}/>

    </View>
  );
};

export default DeliveryAddress;


const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 15,
  },
  header: {
    alignItems: 'center',
  },
  title: {
    ...fonts.PT_h2,

    margin: 5,
    color: colors.primary,
  },
  separator: {
    width: '100%',
    height: 1,
    backgroundColor: 'gray',
    marginVertical: 20,
  },
  form:{
  },

  label: {
    ...fonts.LT_body4,
    color: 'black',
  },
  input: {
    paddingLeft: 10,
    color: '#000',
    borderRadius: 10,
    backgroundColor: 'lightgray',
    marginTop: 10,
    height: 45,
  },
  button: {
    marginTop: 20,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: colors.primary,
  },
  disabledButton: {
    backgroundColor: 'gray',
  },
  buttonText: {
    color: 'white',
  },
});

