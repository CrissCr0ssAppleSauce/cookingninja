import React, {useState} from 'react'
import {StyleSheet, View, Text, TextInput,FlatList, Button, ScrollView, InputAccessoryView} from 'react-native'
import {db, auth} from '../firebase.js'
import { collection, addDoc } from "firebase/firestore";

export default function AddRecipe({navigation}){
    const [steps, setSteps] = useState([]);
    const [name, setName] = useState("");

    var stepNumber = 1;

    // save recipe to the database
    const submitHandler = async () =>{
        const myRecipe = {name: name, steps: steps, user: auth.currentUser.email}
        //db.ref("recipe").set(myRecipe).catch(alert);
        const docRef = await addDoc(collection(db, "recipes"), myRecipe);
        console.log("Recipe added with ID: ", docRef.id);
        navigation.navigate('Dashboard');
    }
    // adds an additional recipe step
    const addHandler = ()=>{
        let _steps = [...steps];
        _steps.push({key: stepNumber, duration: '', description:''});
        setSteps(_steps); 
        stepNumber += 1;
    }

    // field setters
    titleHandler = (text) =>{
        setName(text);
    }
    descInputHandler = (text, key) =>{
        let _steps = [...steps];
        _steps[key].description = text;
        console.log(_steps[key]);
        setSteps(_steps);
    }
    durInputHandler = (text, key) =>{
        let _steps = [...steps];
        _steps[key].duration = text;
        console.log(_steps[key]);
        setSteps(_steps);
    }

    return(
        <View>
            <Text>Add a recipe here!</Text>
            <ScrollView>
                <View>
                    <TextInput placeholder='Enter the name of your recipe here' onChangeText={titleHandler}/>
                {steps.map((step, key)=>(
                    <View key={key}>
                        <Text>Step {key + 1}</Text>
                        <TextInput placeholder={"Enter Description"} value={step.description} 
                            onChangeText={(text)=>descInputHandler(text,key)}
                        />
                        <TextInput placeholder={"Enter Duration"} value={step.duration} 
                            onChangeText={(text)=>durInputHandler(text,key)}
                        />
                    </View>
                ))}
                </View>
            </ScrollView>
            <Button title="Add" onPress={addHandler} />
            <Button title="Submit Recipe" onPress={submitHandler}/>
            <Button onPress={()=>signOut(auth).then(()=>{navigation.replace('Dashboard');})} title='sign out'/>
        </View>
    )
}