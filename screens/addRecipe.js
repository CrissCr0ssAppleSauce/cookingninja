import React, {useState} from 'react'
import {StyleSheet, View, Text, TextInput,FlatList, Button, ScrollView, InputAccessoryView} from 'react-native'
import RecipeStep from '../components/recipeStep.js';
import {auth} from '../firebase.js'

export default function AddRecipe({navigation}){
    const [steps, setSteps] = useState([]);

    var stepNumber = 1;
    const addHandler = ()=>{
        let _steps = [...steps];
        _steps.push({key: stepNumber, value: '', duration:''});
        setSteps(_steps); 
        stepNumber += 1;
    }

    const renderComponent = () =>{
        
    }
    return(
        <View>
            <Text>Add a recipe here!</Text>
            <ScrollView>
                <View>
                    {/*
                <FlatList
                    data={steps}
                    renderItem={ ({ item }) => 
                    //<RecipeStep item={item}/>
                    <Text>Hi</Text>
                    }
                />*/}
                {steps.map((step, key)=>(
                    <View key={key}>
                    <TextInput placeholder={"Enter Name"} value={step.description}/>
                    </View>
                ))}
                </View>
            </ScrollView>
            <Button title="Add" onPress={addHandler} />
            <Button onPress={()=>signOut(auth).then(()=>{navigation.replace('Dashboard');})} title='sign out'/>
        </View>
    )
}