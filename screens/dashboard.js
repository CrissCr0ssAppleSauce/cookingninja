import React, {useState} from 'react'
import {StyleSheet, View, Text, TextInput, Button} from 'react-native'
import { onAuthStateChanged, signOut, updateProfile } from "firebase/auth";
import { globalStyles } from '../styles/globalStyles.js';

import {auth} from '../firebase.js'
export default function Dashboard({navigation}){
    const [user, setUser] = useState(null);
    return(
        <View>
            <Text>Welcome, {auth.currentUser.displayName}</Text>
            <Button title='Cook!'onPress={() =>{navigation.navigate('BundleSelect')}}/>
            <Button title='Create Recipe Bundle' onPress={() =>{navigation.navigate('RecipeSelect')}}/>
            <Button title='View Recipes'/>
            <Button title='Add Recipes' onPress={() =>{navigation.navigate('AddRecipe')}}/>
            <Button onPress={()=>signOut(auth).then(()=>{navigation.replace('Login');})} title='sign out'/>
        </View>
    )
} 

const styles = StyleSheet.create({
    button:{
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: 'black',
    },
})