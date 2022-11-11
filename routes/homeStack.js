import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from '../screens/login'
import Signup from '../screens/signup'
import Dashboard from '../screens/dashboard'
import AddRecipe from '../screens/addRecipe'

const Stack = createNativeStackNavigator();

export default function StackNavigator(){
    return (
        <Stack.Navigator>
               <><Stack.Screen name="Login" component={Login}/>
                <Stack.Screen name="Signup" component={Signup}/></>
                <><Stack.Screen name="Dashboard" component={Dashboard}/></>
                <Stack.Screen name="AddRecipe" component={AddRecipe}/>
 
        </Stack.Navigator>
    )
}
