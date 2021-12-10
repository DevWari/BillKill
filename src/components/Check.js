import React from 'react'
import {
    View,    
} from 'react-native'
import styled from 'styled-components/native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const Check = (props)=> {
    return (
        <Container>
            {props.value?
                <Icon name="check" size={20} color="green" />:
                <Icon name="close" size={20} color="red" />
            }           
        </Container>
    )
}

export default Check

const Container = styled (View)`
    width: 50px;
    height: 50px;    
    justify-content: center;
    align-items: center;
`