import React, {useState, useEffect} from 'react'
import {StyleSheet, View, Text, FlatList, Button, ScrollView, TouchableOpacity} from 'react-native'
import { collection, getDocs, query, addDoc} from "firebase/firestore";
import {db, auth} from '../firebase.js'
import Timer from '../components/timer.js'

export default function Cook({navigation, route}){

    const [bundle, setBundle] = useState({});
    const [recipes, setRecipes] = useState([]);
    const [optimizedSteps, setOptimizedSteps] = useState([]);
    const [retrieved, setRetrieved] = useState(false);

    let intervalID = 0;

    //Organize the recipe steps
    useEffect(()=>{
        setBundle(route.params.bundle.data);

        var _recipes = [];
        var recipeList = route.params.bundle.data.recipeList.map(x=>x);
        for(var i = 0; i < recipeList.length; i++){
            _recipes.push(recipeList[i]);
        }
        setRecipes(_recipes);
        //return () =>clearInterval(id.current);
    },[])


    const optimizeSteps = () =>{
        var _optimizedSteps = [];

        var steps = []
        var recipeIndex = [];
        var recipeScore = [];
        for (var i = 0; i < recipes.length; i++){
            steps.push(recipes[i].steps)
            recipeIndex.push(recipes[i].steps.length - 1);
            recipeScore.push(0);
        }
        
        var cleared = false;

        while(cleared == false){
            // find which recipe has the step with the lowest score
            var bestStep = 0;
            var bestScore = 9999;
            for(var i = 0; i < steps.length; i++){
                if(recipeIndex[i] < 0)
                    continue;
                const step = steps[i][recipeIndex[i]]
                const curScore = step.duration + recipeScore[i]
                if(curScore < bestScore){
                    bestScore = curScore;
                    bestStep = i;
                }
            }

            // push obtained score to beginning of stack
            console.log(recipeScore);
            _optimizedSteps.unshift({data: steps[bestStep][recipeIndex[bestStep]], pressed: false});
            recipeScore[bestStep] += steps[bestStep][recipeIndex[bestStep]].duration;
            recipeIndex[bestStep] -= 1;

            // check if all the arrays have been processed
            var passCheck = false;
            for(var i = 0; i < recipeIndex.length; i++){
                if(recipeIndex[i] >= 0){
                    passCheck = true;
                    break;
                }
            }
            if(passCheck)
                continue;
            else
                break;
        }
        setOptimizedSteps(_optimizedSteps);
        setRetrieved(true);
        console.log(_optimizedSteps);
    }

    const optimizedPressHandler = (index) =>{
        // if not yet pressed, start the timer
        var _optimizedSteps = [...optimizedSteps];
        if(_optimizedSteps[index].pressed == false){
            _optimizedSteps[index].pressed = true;
            setOptimizedSteps(_optimizedSteps);
        }
        // if already pressed, stop the timer and remove the step from the list
        else{
            //var _optimizedSteps = [...optimizedSteps];
            _optimizedSteps.splice(index, 1);
            setOptimizedSteps(_optimizedSteps);
        }  
    }

    return optimizedSteps.length == 0
    ?(
        <View>
            <Button title='START' onPress={optimizeSteps}/>
        </View>
    ) 
    :(
        <View>
            <Text>Cooking: {bundle.name}</Text>
            {/*display up to the next 3 steps*/
            optimizedSteps.map((step, index)=>(
                <View key={index}>
                    <TouchableOpacity style={styles.step} onPress={()=>{optimizedPressHandler(index)}}>
                    <Timer 
                        duration={step.data.duration} 
                        isPressed={step.pressed}
                        description={step.data.description}
                    />
                    <Text>{step.data.description}</Text>
                    </TouchableOpacity>
                </View>
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    step:{
        padding:16,
        marginTop:16,
        borderColor: 'black',
        borderWidth:1,
        borderRadius: 10,
    }
})