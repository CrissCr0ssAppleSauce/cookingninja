import React, {useState, useEffect} from 'react'
import {StyleSheet, View, Text, TextInput,FlatList, Button, ScrollView, TouchableOpacity} from 'react-native'
import {db, auth} from '../firebase.js'
import { collection, connectFirestoreEmulator, getDocs, query, addDoc} from "firebase/firestore";
import {globalStyles} from '../styles/globalStyles.js'

export default function RecipeSelect({navigation}){

    const [recipes, setRecipes] = useState([]);
    const [selectedRecipes, setSelectedRecipes] = useState([]);
    const [bundleName, setBundleName] = useState("");

    useEffect(()=>{
        const myRecipes = [];

        const fetchRecipes = async () =>{
            const q = query(collection(db, "recipes"));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                //console.log(doc.id, " => ", doc.data());
                myRecipes.push({key: doc.id, steps: doc.data().steps, name: doc.data().name, bg: 'black'});
            });
            console.log("Fetching recipes");
            setRecipes(myRecipes);
        };
        fetchRecipes().catch(console.error);
    },[])

    const findItem = (key, arr) =>{
        for(var i = 0; i < arr.length; i++){
            if(arr[i].key == key)
                return [arr[i], i];
        }
    }
    
    const pressHandler = (index) =>{
        var _selectedRecipes = selectedRecipes.map(x => x);
        var _recipes = recipes.map(x => x);
        var curRecipe = _recipes[index];
        console.log(curRecipe);
        if(!_selectedRecipes.includes(curRecipe)){
            // if not in selected recipes, add it
            curRecipe.bg = 'red';
            _selectedRecipes.push(curRecipe);
        }
        else{
            // if in selected recipes, remove it
            curRecipe.bg = 'black';
            _selectedRecipes =  _selectedRecipes.filter(recipe => recipe != curRecipe);
        }
        setRecipes(_recipes);
        setSelectedRecipes(_selectedRecipes);
    }
    const changeHandler = (text) =>{
        setBundleName(text);
    }

    const submitHandler = async () =>{
        const myBundle = {recipeList: selectedRecipes.map(x => x), name: bundleName, user: auth.currentUser.email};
        const docRef = await addDoc(collection(db, "bundles"), myBundle);
        console.log("Bundle created with ID: ", docRef.id);
        navigation.navigate('Dashboard');
    }

    return(
        <View>
            <Text style={{fontSize: 30}}>Select your recipes</Text>
            <TextInput 
                style={globalStyles.textStyle}
                placeholder='Recipe Bundle Name'
                onChangeText={changeHandler}
            />
            <Button title='Submit' onPress={submitHandler}/>
            {recipes.map((recipe, index) =>(
                <View key={index}>
                    <TouchableOpacity onPress={()=>pressHandler(index)}>
                        <Text style={{
                            padding:16,
                            marginTop:16,
                            borderColor: recipe.bg,
                            borderWidth:1,
                            //borderStyle: 'dashed',
                            borderRadius: 10,
                            }}
                        >{recipe.name}</Text>
                    </TouchableOpacity>
                </View>
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    item:{
        padding:16,
        marginTop:16,
        //borderColor: 'black',
        borderWidth:1,
        borderStyle: 'dashed',
        borderRadius: 10,
    },
})