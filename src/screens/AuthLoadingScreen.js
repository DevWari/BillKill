import React, {useState, useEffect} from 'react'
import {
    View,    
} from 'react-native'
import { gql, useMutation } from '@apollo/client'
import Spinner from 'react-native-loading-spinner-overlay'
import Global from '../global/Global'

const CREATE_ACCESS_TOKEN = gql`  
    mutation {access: createAccessTest(role: user) {
        token,
        refreshToken
    }}
`;

const AuthLoadingScreen = (props) => {

    const [mutateFunction, { data, loading, error }] = useMutation(CREATE_ACCESS_TOKEN);   

    useEffect (()=> {                
        mutateFunction ()        
        .then (res=> {       
            if (res.data.access.token) {
                Global.token = res.data.access.token
                console.log ("aaaaaaaa", Global.token)     
                props.navigation.navigate ("Profile")            
            }             
        });       
    }, [])           
    
    return (
        <View>
            {loading &&            
                <Spinner 
                    visible={loading}                
                    textStyle={{color:'#FFF'}}
                />
            }            
        </View>
    )
}

export default AuthLoadingScreen