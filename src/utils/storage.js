import * as Keychain from 'react-native-keychain';

const saveToken = async (token) =>{
    try{
        //store the credentials
        return await Keychain.setGenericPassword("token",token)
    } catch (e) {
        return e
    }
}

const getToken = async () => {
    try{
        // Retrieve the credentials
        const credentials = await Keychain.getGenericPassword()
        if(credentials){
            return credentials.password
        }else{
            console.log('no token');
        }

    }catch (error) {
        console.log('cant get token', error)
    }
}

const clearToken = async () =>{
    //remove the credentials
    await Keychain.resetGenericPassword();
};
 export default {
    getToken,
    saveToken,
    clearToken,
 };
