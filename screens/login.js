import React, {useEffect, useState} from 'react'
import {StyleSheet, View, Text, TextInput, Button} from 'react-native'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase';

export default function Login({navigation}){


    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);

    useEffect(()=>{
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            if(authUser){
                navigation.replace('Dashboard');
            }
        });
        return unsubscribe;
    }, [])

    const changeHandlerEmail = (val) =>{
        setEmail(val);
    }
    const changeHandlerPass = (val) =>{
        setPassword(val);
    }
    const submitHandler = () =>{
        console.log("Form submitted.");
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        });
    }
    return(
        <View>
            <TextInput
                placeholder='email'
                onChangeText={changeHandlerEmail}
            />
            <TextInput
                placeholder='password'
                onChangeText={changeHandlerPass}
            />
            <Button
                onPress={()=>submitHandler()}
                title='Submit'
            />
            <Button 
                title='Make an Account'
                onPress={()=>{navigation.navigate('Signup')}}
            />
        </View>
    )
}