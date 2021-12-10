
import React from 'react'
import { MainStack } from 'src/navigation/MainStack'
import { NavigationContainer } from '@react-navigation/native'
import { navigationRef } from 'src/utils/navigation' 

const RootNavigator = () => {    
        
    return (
        <NavigationContainer ref={navigationRef}>
            <MainStack />            
        </NavigationContainer>
    );
};
  
export default RootNavigator
