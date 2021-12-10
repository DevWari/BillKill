import React, {useState, useEffect} from 'react'
import {
    View,
    Text,
    TextInput,    
    TouchableOpacity
} from 'react-native'
import styled from 'styled-components/native'
import Check from 'src/components/Check'
import Global from '../global/Global'
import { gql, useQuery } from '@apollo/client'
import Spinner from 'react-native-loading-spinner-overlay'

const READ_PROFILE = gql`
{
    profile: readProfile {
        id,
        sid,
        firstname,
        lastname,        
        birthdate,
        email,
        emailCheck,               
        mobile,
        mobileCheck        
    }
  }
`;

const ProfileScreen = (props) => {   
    const [refetchLoading, setRefetchLoading] = useState (false)
    const { loading, data, refetch} = useQuery(READ_PROFILE, {
        context: {
            headers: {
                "Authorization": `Bearer ${Global.token}`
            }
        },   
        fetchPolicy: "network-only"     
    })      
    if (data) {        
        Global.profile = data.profile;
    } 
    
    useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', () => {  
            setRefetchLoading (true)                       
            if (refetch) {                
                refetch()
                .then (res=> setRefetchLoading (false))
              }              
        });        
        return unsubscribe;
    }, [props.navigation]);    

    return (        
        <Container>             
            
            <Spinner 
                visible={loading}                
                textStyle={{color:'#FFF'}} 
            />     
            <Spinner 
                visible={refetchLoading}                
                textStyle={{color:'#FFF'}} 
            />         
            <Input 
                placeholder = "First Name"
                editable = {false}  
                value = {data?.profile.firstname}                  
            />
            <Input 
                placeholder = "Last Name"    
                editable = {false}            
                value = {data?.profile.lastname}                  
            />
            <Input 
                placeholder = "Birthday"
                editable = {false}
                value = {data?.profile.birthdate}                  
            />
            <CheckContainer>
                <Input 
                    placeholder = "Email"
                    editable = {false}
                    style={{marginTop: 0, flex: 1}}
                    value = {data?.profile.email}                  
                />
                <Check value = {data?.profile.emailCheck}/>
            </CheckContainer>                
            <CheckContainer>
                <Input 
                    placeholder = "Mobile"
                    editable = {false}
                    style={{marginTop: 0, flex: 1}}
                    value = {data?.profile.mobile}
                />
                <Check value = {data?.profile.mobileCheck}/>
            </CheckContainer>                                
            <Button onPress = {()=>{
                console.log ("Global profile...", Global.profile)
                props.navigation.navigate ('Update')}
            }>
                <ButtonTitle>Update Email</ButtonTitle>
            </Button>         
        
        </Container>        
    )
}

export default ProfileScreen

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
    color: black;
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
const CheckContainer = styled (View)`
    flex-direction: row;
    background-color: white;
    width: 80%;
    height: 50px;
    align-items: center;    
    margin-top: 20px;
    border-radius: 8px; 
`