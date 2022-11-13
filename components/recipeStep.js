import { StatusBar } from 'expo-status-bar';
import React from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity} from 'react-native';

export default function RecipeStep({item}){
    return(
        <View>
            <Text>{item.key}</Text>
            <TextInput/>
            <TextInput/>
            <Button/>
        </View>
    )
}