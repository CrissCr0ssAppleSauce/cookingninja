import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createAppContainer } from "react-navigation";

import Login from '../screens/login'
import Signup from '../screens/signup'
import Dashboard from '../screens/dashboard'

const Stack = createNativeStackNavigator();

export default function StackNavigator(){
    return (
        <Stack.Navigator>
               <><Stack.Screen name="Login" component={Login}/>
                <Stack.Screen name="Signup" component={Signup}/></>
                <><Stack.Screen name="Dashboard" component={Dashboard}/></>
                <Stack.Screen name="Add Recipe"/>

        </Stack.Navigator>
    )
}
