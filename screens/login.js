import React, {useEffect, useState} from 'react'
import {StyleSheet, View, Text, TextInput, Button, Image} from 'react-native'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase';
import {globalStyles} from '../styles/globalStyles.js'

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
            <View style={styles.container}>
                <Image
                    style={globalStyles.icon}
                    source={require('../images/CookingNinja_Icon.png')}
                />
                <Text style={{fontSize: 30}}>Cooking Ninja</Text>
                <Text style={{fontSize: 30}}>Login</Text>
            </View>
            <TextInput
                style={styles.textStyle}
                placeholder='email'
                onChangeText={changeHandlerEmail}
            />
            <TextInput
                style={styles.textStyle}
                placeholder='password'
                onChangeText={changeHandlerPass}
            />
            <Button
                style={styles.buttonStyle}
                onPress={()=>submitHandler()}
                title='Submit'
            />
            <Text style={styles.container}>Don't have an account?</Text>
            <Button 
                style={styles.buttonStyle}
                title='Make an Account'
                onPress={()=>{navigation.navigate('Signup')}}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop:20,
    },

    textStyle:{
        height: 40,
    },

    buttonStyle:{
        paddingTop: 40,
    }
})

