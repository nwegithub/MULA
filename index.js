/**
 * @format
 */

import {AppRegistry, StatusBar} from 'react-native';
import {name as appName} from './app.json';
import {ApolloProvider} from '@apollo/client';
import createApolloClient from './src/graphql/apolloClient';
import React, {useEffect} from 'react';
import App from './App';



const apolloClient = createApolloClient();

const Index = () => {

   

    return (
      
            <ApolloProvider client={apolloClient}>
                <App/>
            </ApolloProvider>
       
    );
};

AppRegistry.registerComponent(appName, () => Index);
