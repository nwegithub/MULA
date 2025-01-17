import AsyncStorage from "@react-native-async-storage/async-storage";

const saveItem = async (key, value) => {
  return await AsyncStorage.setItem(key, value);
};


const getItem = async (key) => {
  return await AsyncStorage.getItem(key);
};

const clearItem = async (key) => {
  return await AsyncStorage.removeItem(key);
};

export default {
  saveItem,
  getItem,
  clearItem,
};
