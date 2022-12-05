import React, {useState} from 'react'
import {StyleSheet, View, Text, TextInput, Button, Image} from 'react-native'
import {getAuth, createUserWithEmailAndPassword, updateProfile} from 'firebase/auth'
import {auth} from '../firebase'
import {globalStyles} from '../styles/globalStyles.js'

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
            <View style={styles.container}>
                <Image
                    style={globalStyles.icon}
                    source={require('../images/CookingNinja_Icon.png')}
                />
                <Text style={{fontSize: 30}}>Cooking Ninja</Text>
                <Text style={{fontSize: 30}}>Registration</Text>
            </View>
            <TextInput
                style={styles.textStyle}
                placeholder='email'
                onChangeText={changeHandlerEmail}
            />
            <TextInput
                style={styles.textStyle}
                placeholder='username'
                onChangeText={changeHandlerUser}
            />
            <TextInput
                style={styles.textStyle}
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