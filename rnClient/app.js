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

    const apiURL = 'http://localhost:3000/api';

    const [trips, setTrips] = useState([]);
    const [routeName, setRouteName] = useState('');
    const [difficulty, setDifficulty] = useState('');
    const [distance, setDistance] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        fetchTrips();
    }, []);

    const fetchTrips = async () => {
        const response = await fetch(apiURL);
        const data = await response.json();
        setTrips(data);
    };

    const addTrip = async () => {
        await fetch(apiURL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ routeName, difficulty, distance, description })
        });
        fetchTrips();
    };

    const deleteTrips = async () => {
        await fetch(apiURL, { method: 'DELETE' });
        fetchTrips();
    };

    const fetchTrip = async (id) => {
        const response = await fetch(`${apiURL}/${id}`);
        return await response.json();
    };

    const updateTrip = async (id) => {
        await fetch(`${apiURL}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ routeName, difficulty, distance, description })
        });
        fetchTrips();
    };

    const deleteTrip = async (id) => {
        await fetch(`${apiURL}/${id}`, { method: 'DELETE' });
        fetchTrips();
    };


    return (
        <View style={styles.container}>

            {/* Title */}
            <Text style={styles.title}>Lake Ledger 🛶</Text>
            <Text style={styles.subtitle}>Your Trips</Text>

            {/* Trip Table */}
            <View style={styles.tableHeader}>
                <Text style={[styles.headerCell, { flex: 2 }]}>Route</Text>
                <Text style={styles.headerCell}>Difficulty</Text>
                <Text style={styles.headerCell}>Dist.</Text>
                <Text style={styles.headerCell}>Actions</Text>
            </View>
          </View>
        );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f8',
    padding: 20,
    paddingTop: 50
  },
  title: {
    
  }

});
