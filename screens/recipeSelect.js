import React, {useState, useEffect} from 'react'
import {StyleSheet, View, Text, TextInput,FlatList, Button, ScrollView, TouchableOpacity} from 'react-native'
import {db, auth} from '../firebase.js'
import { collection, getDocs, query } from "firebase/firestore";

export default function RecipeSelect({navigation}){

    const [recipes, setRecipes] = useState([]);

    useEffect(()=>{
        const myRecipes = [];

        const fetchRecipes = async () =>{
            const q = query(collection(db, "recipes"));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data());
                myRecipes.push({key: doc.id, steps: doc.data().steps, name: doc.data().name});
            });
            console.log("Fetchign recipes");
            console.log(myRecipes);
            setRecipes(myRecipes);
        };
        fetchRecipes().catch(console.error);
        console.log("Printed updated state");
        console.log(recipes);
    },[])

    return(
        <View>
            <Text>Select your recipes</Text>
            {recipes.map((recipe, key) =>(
                <View key={key}>
                    {/* Give touchable an onPress{()=>function()} function */}
                    <TouchableOpacity>
                        <Text>{recipe.name}</Text>
                    </TouchableOpacity>
                </View>
            ))}
        </View>
    )
}