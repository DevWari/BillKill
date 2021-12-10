import React, {useState, useEffect} from 'react'
import {
    View,
    Text,
    TextInput,    
    TouchableOpacity
} from 'react-native'
import Global from 'src/global/Global'
import styled from 'styled-components/native'
import { gql, useMutation } from '@apollo/client'
import Spinner from 'react-native-loading-spinner-overlay'

const UPDATE_PROFILE_EMAIL = gql`  
  mutation ($email: String!) {
    profile: updateProfileEmail (email: $email) {
        firstname,
        lastname,
        email,
        emailCheck,
        mobile,
        mobileCheck,
        birthdate,
    }
  }
`;
const UpdateScreen = (props) => {    

    const [updateEmailMutation, { data, loading, error }] = useMutation(UPDATE_PROFILE_EMAIL, {
        context: {
            headers: {
                "Authorization": `Bearer ${Global.token}`
            }
        }
    });  
    const [email, setEmail] = useState (null) 

    const updateEmail = () => {
        updateEmailMutation({ variables: { email: email } })
        .then (res=> {                  
            props.navigation.pop()  
        })        
    }

    useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', () => {                    
            console.log ("profile.....", Global.profile)
            setEmail (Global.profile?.email)
        });   
        
        return unsubscribe;
    }, [props.navigation]);

    return (        
        <Container>            
            <Spinner 
                visible={loading}                
                textStyle={{color:'#FFF'}}
            />            
            <Input 
                placeholder = "Email"    
                onChangeText = {text=>setEmail(text)}  
                value={email}              
            />                            
            <Button 
                onPress = {()=>updateEmail()}
                disabled = {Global.profile?.email == email}
                style={{backgroundColor: Global.profile?.email == email? "red": "yellow"}}
            >
                <ButtonTitle>Update</ButtonTitle>
            </Button>
        </Container>        
    )
}

export default UpdateScreen

const Container = styled (View)`
    width: 100%;
    height: 100%;
    background-color: #3e3e3f;
    align-items: center;
    justify-content: center;
`
const Input = styled (TextInput)`
    width: 80%;
    height: 50px;
    border-radius: 8px;
    background-color: white;
    margin-top: 20px;
    padding-left: 20px;
    font-size: 16px;
`
const Button = styled (TouchableOpacity)`
    height: 50px;
    width: 200px;
    border-radius: 8px;
    background-color: yellow;
    justify-content: center;
    align-items: center;
    margin-top: 50px;
`
const ButtonTitle = styled (Text)`
    font-size: 20px;
    color: #3e3e3f;
`
