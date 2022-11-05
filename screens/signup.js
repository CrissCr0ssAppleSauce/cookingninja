import React, {useState} from 'react'
import {StyleSheet, View, Text, TextInput, Button} from 'react-native'
import {getAuth, createUserWithEmailAndPassword, updateProfile} from 'firebase/auth'
import {auth} from '../firebase'

export default function Dashboard({navigation}){
    const [email, setEmail] = useState(null);
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    
    const register = () =>{
        createUserWithEmailAndPassword(auth, email, password)
        .then(authUser =>{
            updateProfile(authUser, {displayName: username})
        }).catch((error) => alert(error.message))
    }

    const changeHandlerEmail = (val) =>{
        setEmail(val);
    }
    const changeHandlerUser = (val) =>{
        setUsername(val);
    }
    const changeHandlerPass = (val) =>{
        setPassword(val);
    }
    const submitHandler = () =>{
        console.log("Form submitted.");
        register();
    }
    return (
        <View>
            <TextInput
                placeholder='email'
                onChangeText={changeHandlerEmail}
            />
            <TextInput
                placeholder='username'
                onChangeText={changeHandlerUser}
            />
            <TextInput
                placeholder='password'
                onChangeText={changeHandlerPass}
            />
            <Button
                onPress={()=>submitHandler()}
                title='Submit'
            />
        </View>
    )
}