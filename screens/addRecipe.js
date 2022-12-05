import React, {useState} from 'react'
import {StyleSheet, View, Text, TextInput,FlatList, Button, ScrollView, InputAccessoryView} from 'react-native'
import {db, auth} from '../firebase.js'
import { collection, addDoc } from "firebase/firestore";
import { globalStyles } from '../styles/globalStyles.js';

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
        _steps.push({key: stepNumber, duration: '', description:'', attend: 1});
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
        _steps[key].duration = parseInt(text, 10);
        console.log(_steps[key]);
        setSteps(_steps);
    }

    return(
        <View>
            <Text style={{fontSize: 30}}>Add a recipe here!</Text>
            <ScrollView>
                <View>
                    <TextInput style={globalStyles.textStyle} placeholder='Enter the name of your recipe here' onChangeText={titleHandler}/>
                    {steps.map((step, key)=>(
                        <View style={styles.step} key={key}>
                            <Text>Step {key + 1}</Text>
                            <TextInput style={globalStyles.textStyle} placeholder={"Enter Description"} value={step.description} 
                                onChangeText={(text)=>descInputHandler(text,key)}
                            />
                            <TextInput style={globalStyles.textStyle} placeholder={"Enter Duration"} value={step.duration} 
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

const styles=StyleSheet.create({
    step:{
        borderWidth:2,
        borderColor:'#000',
        borderRadius: 10,
        paddingTop: 10,
    },
})