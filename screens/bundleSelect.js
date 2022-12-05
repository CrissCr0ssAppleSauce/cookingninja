import React, {useState, useEffect} from 'react'
import {StyleSheet, View, Text, FlatList, Button, ScrollView, TouchableOpacity} from 'react-native'
import { collection, getDocs, query, addDoc} from "firebase/firestore";
import {db, auth} from '../firebase.js'
import { globalStyles } from '../styles/globalStyles.js';

export default function BundleSelect({navigation}){

    const [bundles, setBundles] = useState([]);

    useEffect(()=>{
        const myBundles = [];

        const fetchBundles = async () =>{
            const q = query(collection(db, "bundles"));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                myBundles.push({key: doc.id, data: doc.data()})
            });
            console.log("Fetching Bundles");
            setBundles(myBundles);
        };
        fetchBundles().catch(console.error);
    },[])

    const pressHandler = (bundle) =>{
        navigation.navigate('Cook', {bundle: bundle});
    }

    return (
        <View>
            <Text>Select which recipe bundle you would like to cook.</Text>
            {bundles.map((bundle, index)=>(
                <View key={index}>
                    <TouchableOpacity onPress={()=>pressHandler(bundle)}>
                        <Text style={globalStyles.customTouchable}>{bundle.data.name}</Text>
                    </TouchableOpacity>
                </View>
            ))}
        </View>
    )
}