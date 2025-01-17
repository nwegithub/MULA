import { useQuery } from "@apollo/client";
import { useNavigation } from "@react-navigation/native";
import React, { useContext, useState, useEffect } from "react";
import {
  Image,
  ImageBackground,
  Linking,
  Modal,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import icons from "../constant/icons";
import images from "../constant/images";
import { style } from "../constant/style";
import { colors, fonts } from "../constant/theme";
import { GET_NOTI_COUNT, GET_USER } from "../graphql/queries";
import { scaleHeight, scaleWidth } from "../utils/responsive";
import storage from "../utils/storage";
import { Context } from "./Context";
import StatusBarScreen from "./StatusBar";
import Loading from "./Loading";
import localStorage from "../utils/localStorage";
import ModalWrapper from "./ModalWrapper";



const DrawerComponent = (props) => {

  const navigation = useNavigation()

  const { digital, setUser, user, langData, language, theme } = useContext(Context)

  const [logoutModal, setLogoutModal] = useState(false)
  const [notiCount, setNotiCount] = useState(0)

  const [backgroundSource, setBackgroundSource] = useState(digital ? images.digital_bg : images.tradi_bg);

  useEffect(() => {
    setBackgroundSource(digital ? images.digital_bg : images.tradi_bg);
  }, [digital]);

  const { data, loading, error } = useQuery(GET_USER, {
    variables: {
      userId: user && user.id
    }, fetchPolicy: 'network-only'
  })

  const { data: notiCountData } = useQuery(GET_NOTI_COUNT, { fetchPolicy: "cache-and-network" })



  useEffect(() => {
    const getNoti = async () => {
      if (notiCountData) {
        const count = await localStorage.getItem("notiCount");

        if (count) {
          setNotiCount(notiCountData.notification_history_aggregate.aggregate.count - count);
        } else {
          await localStorage.saveItem("notiCount", notiCountData.notification_history_aggregate.aggregate.count.toString());
        }
      }
    };
    getNoti();
  }, [notiCountData]);

  const handleLogout = async () => {
    await storage.clearToken()
    setUser(null)
    setLogoutModal(false)
  }


  if (!notiCountData) {
    return <Loading />
  }

  return (

    <ImageBackground
      source={backgroundSource
      }
      blurRadius={10}
      style={{ flex: 1, opacity: digital ? 0.83 : null, backgroundColor: colors.gray }}
    >
      <SafeAreaView style={{ flex: 1, }}>

        <StatusBarScreen />


        <View style={{ flex: 1, }}>


          <View style={[styles.header, { backgroundColor: !digital ? colors.primary : null }]}>


            {user ?
              <TouchableOpacity
                onPress={() => navigation.navigate('Profile')}
                style={{ ...style.flexRow, margin: 10 }}>
                {
                  data?.users_by_pk.profile_image_url !== null ?
                    <Image source={{
                      uri: data?.users_by_pk.profile_image_url
                    }}
                      style={styles.profileImg}
                    />
                    :
                    <Image source={icons.profile}

                      style={[{ tintColor: digital ? null : colors.white, width: scaleWidth(50), height: scaleHeight(50) }]} />
                }

                <Text style={[styles.name, { color: colors.white }]}>{data?.users_by_pk.fullname}</Text>
              </TouchableOpacity>
              :
              <TouchableOpacity
                onPress={() => navigation.navigate('Sign In', { redirectTo: "BACK" })}
                style={{
                  ...style.flexRow, margin: 10

                }}
              >
                <Image source={icons.digital_profile} style={[styles.icon, { tintColor: digital ? null : colors.white }]} />
                <Text style={[styles.txt, { marginLeft: 20, color: colors.white }]}>{langData.SignIn}</Text>
              </TouchableOpacity>
            }
          </View>
          {
            digital && <View style={{ width: '80%', height: 0.5, backgroundColor: colors.white, alignSelf: 'center' }} />
          }
          <View style={{ margin: 10, paddingHorizontal: 20, }}>



            <TouchableOpacity
              onPress={() => props.navigation.navigate('Notification', { notiCount, setNotiCount })

              }
              style={styles.body}>
              <View>
                <Image source={icons.digital_notification} style={[styles.icon, { tintColor: digital ? null : colors.primary }]} />

                {notiCount > 0 &&
                  <View style={styles.notiCount} />

                }
              </View>
              <Text style={[styles.txt, { color: theme.secColor }]}>

                {langData.notification}


              </Text>
            </TouchableOpacity>
            {
              user &&
              <TouchableOpacity
                onPress={() => props.navigation.navigate('Feedback')

                }
                style={styles.body}>
                <Image source={icons.feedback} style={[styles.icon, { tintColor: digital ? null : colors.primary }]} />
                <Text style={[styles.txt, { color: theme.secColor }]}>

                  {langData.feedback}


                </Text>
              </TouchableOpacity>
            }


            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Language')

              }}
              style={styles.body}>
              <Image source={icons.language} style={[styles.icon, { tintColor: digital ? null : colors.primary }]} />
              <Text style={[styles.txt, { color: theme.secColor }]}>
                {langData.language}
              </Text>
            </TouchableOpacity>

            {user && <TouchableOpacity
              onPress={() => {
                navigation.navigate('Account Setting')

              }}
              style={styles.body}>
              <Image source={icons.setting} style={[styles.icon, { tintColor: digital ? null : colors.primary }]} />
              <Text style={[styles.txt, { color: theme.secColor }]}>
                {langData.accountSetting}
              </Text>
            </TouchableOpacity>
            }
            <View style={{ width: '100%', height: 0.5, backgroundColor: digital ? colors.white : colors.primary, marginVertical: 10 }} />


            <TouchableOpacity
              onPress={() => Linking.openURL('https://www.mula.com.mm/privacypolicy')

              }
              style={styles.body}>
              <Image source={icons.question} style={[styles.icon, { tintColor: digital ? null : colors.primary }]} />
              <Text style={[styles.txt, { color: theme.secColor }]}>
                {langData.privacy}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => Linking.openURL('https://www.mula.com.mm/terms&conditions')

              }
              style={styles.body}>
              <Image source={icons.digital_term} style={[styles.icon, { tintColor: digital ? null : colors.primary }]} />
              <Text style={[styles.txt, { color: theme.secColor }]}>
                {langData.term}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate("About Us")}
              style={styles.body}>
              <Image source={icons.digital_about} resizeMode="contain" style={[styles.icon, { tintColor: digital ? null : colors.primary }]} />
              <Text style={[styles.txt, { color: theme.secColor }]}>
                {langData.about}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate("Contact Us")

              }
              style={styles.body}>
              <Image source={icons.digital_phone} resizeMode="contain" style={[styles.icon, { tintColor: digital ? null : colors.primary }]} />
              <Text style={[styles.txt, { color: theme.secColor }]}>
                {langData.contact}
              </Text>
            </TouchableOpacity>

            <View style={{ width: '100%', height: 0.5, backgroundColor: digital ? colors.white : colors.primary, marginVertical: 10 }} />

          </View>



        </View>



        {user && <View style={{ padding: 25, justifyContent: 'flex-end', paddingBottom: 60 }}>
          <TouchableOpacity
            onPress={() => setLogoutModal(true)
            }
            style={[styles.body, {}]}>
            <Image source={icons.digital_logout} style={[styles.icon, { tintColor: digital ? null : colors.primary }]} />
            <Text style={[styles.txt, { color: theme.secColor }]}>
              {langData.logout}
            </Text>
          </TouchableOpacity>
        </View>}

        <ModalWrapper modalOpen={logoutModal} setModalOpen={setLogoutModal}>

          <Text style={{ ...fonts.LT_body5, color: digital ? colors.black : colors.black, marginTop: 10, lineHeight: Platform.OS === 'ios' ? 0 : 23 }}>
            {langData.qusToLogout}

          </Text>
          <View style={{ ...style.flexRowSpace, marginTop: 15, margin: 5 }}>
            {
              digital ?
                <>
                  <LinearGradient
                    colors={colors.linearBtn}
                    start={{ x: 0, y: 1 }}
                    end={{ x: 1, y: 0 }}
                    style={{
                      height: 35, width: 100,
                      borderRadius: 5, ...style.center, margin: 5, marginRight: 10
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => setLogoutModal(false)}
                      style={{
                        width: '98%', height: '98%', borderRadius: 5, ...style.center, backgroundColor: colors.black
                      }}
                    >
                      <Text style={{
                        color: digital ? colors.white : colors.primary, ...fonts.LT_body6, textAlign: 'center', lineHeight: Platform.OS === 'ios' ? 0 : 23,
                      }}>
                        {langData.cancel}

                      </Text>
                    </TouchableOpacity>

                  </LinearGradient>

                  <TouchableOpacity
                    onPress={handleLogout}
                  >
                    <LinearGradient
                      colors={colors.linearBtn}
                      start={{ x: 0, y: 1 }}
                      end={{ x: 1, y: 0 }}
                      style={{
                        height: 35, width: 100,
                        borderRadius: 5, ...style.center, margin: 5, marginLeft: 10
                      }}
                    >
                      <View

                      >
                        <Text style={{
                          color: digital ? colors.white : colors.primary, ...fonts.LT_body6, textAlign: 'center', lineHeight: Platform.OS === 'ios' ? 0 : 23,
                        }}>
                          {langData.ok}

                        </Text>
                      </View>

                    </LinearGradient>
                  </TouchableOpacity>
                </>
                :
                <>
                  <TouchableOpacity
                    onPress={() => setLogoutModal(false)}
                    style={[styles.btn, { borderWidth: 1, borderColor: colors.primary }]}
                  >
                    <Text style={{
                      color: colors.primary, ...fonts.LT_body6, textAlign: 'center', lineHeight: Platform.OS === 'ios' ? 0 : 23,
                    }}>
                      {langData.cancel}

                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={handleLogout}
                    style={[styles.btn, { backgroundColor: colors.primary }]}
                  >
                    <Text style={{ color: colors.white, ...fonts.LT_body6, textAlign: 'center', lineHeight: Platform.OS === 'ios' ? 0 : 23 }}>
                      {langData.ok}

                    </Text>
                  </TouchableOpacity>
                </>
            }

          </View>

        </ModalWrapper>




      </SafeAreaView>
    </ImageBackground>

  )
}
export default DrawerComponent

const styles = StyleSheet.create({
  body: { ...style.flexRow, marginVertical: scaleHeight(10) },
  icon: { ...style.icon },
  txt: { marginLeft: 20, ...fonts.LT_body5, lineHeight: Platform.OS == 'ios' ? 0 : 25, },
  sucModalContainer: {
    position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, ...style.center,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  btn: { borderRadius: 5, paddingVertical: 5, margin: 5, marginHorizontal: 10, width: 100 },
  header: {
    height: scaleHeight(180), paddingTop: Platform.OS == 'ios' ? 40 : 20, padding: 20,
    justifyContent: 'flex-end'
  },
  profileImg: { width: scaleWidth(60), height: (60), borderRadius: 50 },
  name: { ...fonts.LT_body2, marginLeft: 20 },
  notiCount: {
    position: "absolute",
    top: -3,
    right: 0,
    borderRadius: 20,
    width: 6, height: 6,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "red",
  }
})