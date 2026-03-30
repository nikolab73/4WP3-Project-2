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

    const deleteTrips = async () => {
        await fetch(apiURL, { method: 'DELETE' });
        fetchTrips();
    };

    const fetchTrip = async (id) => {
        const response = await fetch(`${apiURL}/${id}`);
        return await response.json();
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
      if(editingId) { //if editing a trip vs creating new (else)
        await fetch(`${apiURL}/${editingId}`, {
          method: 'PUT',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({routeName, difficulty, distance, description})
        });
      } else {
        await fetch(apiURL, {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({routeName, difficulty, distance, description})
        });
      }
      setModalVisible(false);
      clearForm();
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
                <Text style={styles.headerCell}>Distance</Text>
                <Text style={styles.headerCell}>Actions</Text>
            </View>
          <FlatList
            data={trips}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({item}) => (
              <View style={styles.tableRow}>
                <Text style={[styles.cell, { flex: 2 }]}>{item.routeName}</Text>
                <Text style={styles.cell}>{item.difficulty}</Text>
                <Text style={styles.cell}>{item.distance}</Text>
                <View style={styles.actionCell}>
                  <TouchableOpacity onPress={() => openEditModal(item.id)}>
                    <Text style={{ color: '#185f33', fontWeight: 'bold' }}>Edit</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => deleteTrip(item.id)}>
                    <Text style={{ color: '#d32f2f', fontWeight: 'bold' }}>Delete</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />

          <View>
            // bottom buttons
          </View>

          <Modal>
            // edit and add popups
          </Modal>
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
  headerCell: {
    flex: 1,
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 13
  },
  tableRow: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    padding: 10,
    borderRadius: 4,
    marginBottom: 4,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#d4d4d4'
  },
  cell: {
    flex: 1,
  },
  actionCell: {
    flex: 1,
    gap: 4
  },
  bottomButtons: {
    flexDirection: 'row',
    marginTop: 16,
    gap: 8
  },
  inputs: {
    borderWidth: 1,
    borderColor: '#cccccc',
    backgroundColor: '#f0f4f8',
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
    fontSize: 15
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center'
},
  modalBox: {
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 12,
    width: '85%'
  }

});
