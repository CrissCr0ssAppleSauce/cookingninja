import React, {useState} from 'react'
import {StyleSheet, View, Text, FlatList, Button, ScrollView, TouchableOpacity} from 'react-native'
import {db, auth} from '../firebase.js'
import { collection, getDocs, query } from "firebase/firestore";

export default function stepsDisplayer(){

    return (
        <View>
            <Text>Cooking recipe...</Text>
        </View>
    )
}
