import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react'
import { StyleSheet, Text, View, TextInput, Button} from 'react-native';

export default function LoginForm({submitHandler}){
    const [loginCred, setLoginCred] = useState({user: 'user', pass:'pass'});

    const changeHandlerUser = (val) =>{

    }
    const changeHandlerPass = (val) =>{

    }

    return (
        <View>
            <TextInput
                placeholder='username'
                onChangeText={changeHandlerUser}
            />
            <TextInput
                placeholder='password'
                onChangeText={changeHandlerPass}
            />
            <Button
                onPress={()=>submitHandler(loginCred)}
                title='Submit'
            />
        </View>
    )
}