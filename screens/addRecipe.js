import React, {useState} from 'react'
import {StyleSheet, View, Text, TextInput,FlatList, Button, ScrollView, InputAccessoryView} from 'react-native'
import RecipeStep from '../components/recipeStep.js';
import {auth} from '../firebase.js'

export default function AddRecipe({navigation}){
    const [steps, setSteps] = useState([{key: '', description: '', duration: ''}]);
    const stepNumber = 0;
    const addHandler = ()=>{
        const _steps = [...steps];
        _steps.push({key: stepNumber, value: ''});
        setInputs(_steps);
        stepNumber += 1;
    }

    return(
        <View>
            <Text>Add a recipe here!</Text>
            {/*}
            <ScrollView>
            <FlatList
                data={steps}
                renderItem={ ({ item }) => (
                <RecipeStep item={item}/>
                )}
            />
            </ScrollView>
                <Button title="Add" onPress={addHandler} />*/}
        </View>
    )
}