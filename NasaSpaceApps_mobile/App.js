import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {UserVerification} from "./scenes/userVerification/userVerification";
import {MainApp} from "./scenes/mainApp/mainApp";

const Stack = createStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="mainApp" screenOptions={{headerShown: false }}>
                <Stack.Screen name="UserVerification" component={UserVerification} />
                <Stack.Screen name="mainApp" component={MainApp} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}