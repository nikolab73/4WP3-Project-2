import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    FlatList,
    StyleSheet,
    Modal,
    Alert
} from 'react-native';

export default function App() {

    const apiURL = 'http://localhost:3000/api';

    const [trips, setTrips] = useState([]);
    const [routeName, setRouteName] = useState('');
    const [difficulty, setDifficulty] = useState('');
    const [distance, setDistance] = useState('');
    const [description, setDescription] = useState('');

    const [modalVisible, setModalVisible] = useState(false);
    const [editingId, setEditingId] = useState(null);

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

    const clearForm = () => {
      setRouteName('');
      setDifficulty('');
      setDistance('');
      setDescription('');
      setEditingId(null);
    };

    const openAddModal = () => {
      clearForm();
      setModalVisible(true);
    };

    const openEditModal = async (id) => {
      const trip = await fetch(`${apiURL}/${id}`).then(r => r.json());
      setRouteName(trip.routeName);
      setDifficulty(String(trip.difficulty));
      setDistance(String(trip.distance));
      setDescription(trip.description);
      setEditingId(id);
      setModalVisible(true);
    };

    const saveTrip = async () => {
      if(editingId) { //if editing a trip vs creating new
        await fetch(`${apiURL}/${editingId}`, {
          method: 'PUT',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({routeName, difficulty, distance, description})
        });
      } else {
        
      }
    }


    return (
        <View style={styles.container}>

            {/* Title */}
            <Text style={styles.title}>Lake Ledger 🛶</Text>
            <Text style={styles.subtitle}>Your Trips</Text>

            {/* Trip Table */}
            <View style={styles.tableHeader}>
                <Text style={[styles.headerCell, { flex: 2 }]}>Route</Text>
                <Text style={styles.headerCell}>Difficulty</Text>
                <Text style={styles.headerCell}>Distance</Text>
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
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#1a3c5e',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#555',
    marginBottom: 16,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#185f33',
    padding: 10,
    borderRadius: 4,
    marginBottom: 4
  },
  headerCell {
    flex: 1,
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 13
  }

});
