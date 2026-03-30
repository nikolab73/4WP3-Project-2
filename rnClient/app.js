import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    FlatList,
    StyleSheet,
    Alert
} from 'react-native';


export default function App() {
    apiURL = 'http://localhost:3000/api';

    const [trips, setTrips] = useState([]);

    const [routeName, setRouteName] = useState('');
    const [difficulty, setDifficulty] = useState('');
    const [distance, setDistance] = useState('');
    const [description, setDescription] = useState('');

    const fetchTrips = async () => {
        const response = await fetch(apiURL);
        const data = await response.json();
        setTrips(data);
    };

    const addTrip = async () => {
        await (apiURL, {
            method: 'POST', 
            headers: {'Content-Type': application/json}, 
            body: JSON.stringify({routeName, difficulty, distance, description})
        });
        fetchTrips();
    };

    const deleteTrips = async () => {
        await fetch(apiURL, {method:'DELETE'});
        fetchTrips();
    };

    const fetchTrip = async () => {
        const response = await fetch(`${API_URL}/${id}`);
        return await response.json();
    }

}