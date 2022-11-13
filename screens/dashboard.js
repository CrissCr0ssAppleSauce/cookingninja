import React, {useState} from 'react'
import {StyleSheet, View, Text, TextInput, Button} from 'react-native'
import { onAuthStateChanged, signOut, updateProfile } from "firebase/auth";

import {auth} from '../firebase.js'
export default function Dashboard({navigation}){
    const [user, setUser] = useState(null);
    return(
        <View>
            <Text>Welcome, {auth.currentUser.displayName}</Text>
            <Button title='Cook!'/>
            <Button title='View Recipes'/>
            <Button title='Add Recipes' onPress={() =>{navigation.navigate('AddRecipe')}}/>
            <Button onPress={()=>signOut(auth).then(()=>{navigation.replace('Login');})} title='sign out'/>
        </View>
    )
} 