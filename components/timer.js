import React, {useState, useEffect, useRef} from 'react'
import {StyleSheet, View, Text, FlatList, Button, TouchableOpacity} from 'react-native'

export default function Timer({duration, isPressed, description}){
    const [time, setTime] = useState(null);
    const [desc, setDesc] = useState("");
    const [color, setColor] = useState("red");
    var interval = useRef();
    useEffect(()=>{
        if(time == null)
            setTime(duration*60);
        else{
            //if(isPressed){
                //startTimer();
                //return () => clearInterval(interval.current);
           // }
        }
    },[])
    useEffect(()=>{
            setTime(duration*60);
    },[duration])
    useEffect(()=>{
        if(isPressed == false){
            clearInterval(interval.current);
            setColor("red");
        }
        else
            startTimer();
            setColor("green");
    },[isPressed])
    useEffect(()=>{
        setDesc(description);
    },[description])
    


    function startTimer(){
        interval.current = setInterval(()=>{
            setTime((x)=>x-1);
        }, 1000);
    }

    return(
        <View>
            <Text style={{color:color}}>Time remaining: {time}</Text>
        </View>
    )
}