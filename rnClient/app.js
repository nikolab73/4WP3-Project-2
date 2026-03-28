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
    const [trips, setTrips] = useState([]);

    const [routeName, setRouteName] = useState('');
    const [difficulty, setDifficulty] = useState('');
    const [distance, setDistance] = useState('');
    const [description, setDescription] = useState('');

}