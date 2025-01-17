import AsyncStorage from "@react-native-async-storage/async-storage";

const saveHistory = async (key,value)  => {
    try {
        return await AsyncStorage.setItem(key, value);
    } catch (e) {
        return e;
    }
}