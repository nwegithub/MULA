import { ApolloClient,createHttpLink,InMemoryCache } from "@apollo/client";
import {setContext} from '@apollo/client/link/context'
import {onError} from '@apollo/client/link/error';
import storage from "../utils/storage"; 
import * as RootNavigation from '../navigation/rootNavigation';

const httpLink = createHttpLink({
    uri: 'https://api.mula.com.mm/v1/graphql',
});

const errorLink = onError(({graphQLErrors,networkError}) =>{

    if(graphQLErrors){
        console.log(graphQLErrors);
        graphQLErrors.forEach(async ({extensions}) =>{
            if(extensions.code === 'invalid-jwt'){
                await storage.clearToken();
                // alert('Session Expired, Please Login Again')
                 //RootNavigation.navigate('Sign Out')
            }
        })
    }
    if (networkError){
        console.log(`[Network error] : ${networkError}`);
        alert('network connection error');
    }
});

const createApolloClient = () =>{

    const authLink = setContext(async(_, {headers}) =>{
        try{
            const accessToken = await storage.getToken();
            if(accessToken){

                return{
                    headers:{
                        ...headers,
                        Authorization: accessToken ? `Bearer ${accessToken}` : null,
                    },
                };
            }
        }
        catch(e){
            return{
                headers,
            };
        }
    });

    return new ApolloClient({
        link : errorLink.concat(authLink).concat(httpLink),
        cache: new InMemoryCache(),
    });
};

export default createApolloClient;
