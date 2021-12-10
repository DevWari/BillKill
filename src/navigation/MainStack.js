import React from 'react'
import {createStackNavigator, CardStyleInterpolators} from '@react-navigation/stack'
import ProfileScreen from 'src/screens/ProfileScreen'
import UpdateScreen from 'src/screens/UpdateScreen'
import AuthLoadingScreen from 'src/screens/AuthLoadingScreen'

const Stack = createStackNavigator();

export const MainStack = () => {
    return (
      <Stack.Navigator screenOptions={{headerShown: false, cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS}}>   
          <Stack.Screen name="Loading" component={AuthLoadingScreen} />         
          <Stack.Screen name="Profile" component={ProfileScreen} />         
          <Stack.Screen name="Update" component={UpdateScreen} />      
      </Stack.Navigator>
    );
};
  