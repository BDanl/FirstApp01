import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ExploreRoutinesCard = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Explorar rutinas</Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("ExploreScreen")}>
        <Text style={styles.buttonText}>Explorar</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ExploreRoutinesCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    width: 300,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});
