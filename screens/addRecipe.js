import React, {useState} from 'react'
import {StyleSheet, View, Text, TextInput,FlatList, Button, ScrollView, InputAccessoryView} from 'react-native'
import RecipeStep from '../components/recipeStep.js';
import {db, auth} from '../firebase.js'

export default function AddRecipe({navigation}){
    const [steps, setSteps] = useState([]);
    const [name, setName] = useState("");

    var stepNumber = 1;

    const submitHandler = () =>{
        const myRecipe = {name: name, steps: steps, user: auth.currentUser.email}
        db.ref("recipe").set(myRecipe).catch(alert);
    }
    const addHandler = ()=>{
        let _steps = [...steps];
        _steps.push({key: stepNumber, duration: '', description:''});
        setSteps(_steps); 
        stepNumber += 1;
    }

    titleHandler = (text) =>{
        setName(text);
    }
    descInputHandler = (text, key) =>{
        let _steps = [...steps];
        _steps[key].description = text;
        setSteps(_steps);
    }
    durInputHandler = (text, key) =>{
        let _steps = [...steps];
        _steps[key].duration = text;
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
                        <TextInput placeholder={"Enter Duration"} value={step.description} 
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