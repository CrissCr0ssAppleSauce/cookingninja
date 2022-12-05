import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from '../screens/login'
import Signup from '../screens/signup'
import Dashboard from '../screens/dashboard'
import AddRecipe from '../screens/addRecipe'
import RecipeSelect from "../screens/recipeSelect";
import BundleSelect from "../screens/bundleSelect";
import Cook from '../screens/cook'

const Stack = createNativeStackNavigator();

export default function StackNavigator(){
    return (
        <Stack.Navigator>
               <><Stack.Screen name="Login" component={Login}/>
                <Stack.Screen name="Signup" component={Signup}/></>
                <><Stack.Screen name="Dashboard" component={Dashboard}/></>
                <Stack.Screen name="AddRecipe" component={AddRecipe}/>
                <Stack.Screen name="RecipeSelect" component={RecipeSelect}/>
                <Stack.Screen name="BundleSelect" component={BundleSelect}/>
                <Stack.Screen name="Cook" component={Cook}/>
 
        </Stack.Navigator>
    )
}
