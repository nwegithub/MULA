import React, {useContext, useEffect} from 'react';
import storage from '../utils/storage';
import {Context} from '../component/Context';

const SignOut = () => {

    const {setUser} = useContext(Context);

    useEffect(() => {
        setUser(null);
        storage.clearToken();
    }, []);

    return (
        <>
        </>
    );
};

export default SignOut;
