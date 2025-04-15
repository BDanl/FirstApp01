import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  TextInput,
  ScrollView,
  SafeAreaView,
  ActivityIndicator
} from 'react-native';
import { useFoods } from "../hooks/useFoods";
import AppLogoImage from "../components/AppLogoImage";
import BottomNavigationBar from "../components/BottomNavigationBar";

const FoodScreen = () => {
  const [titleInput, setTitleInput] = useState('');
  const [priceInput, setPriceInput] = useState('');
  const { 
    foods, 
    currentFood, 
    loading, 
    error, 
    loadAllFoods, 
    getFood, 
    addFood, 
    updateFood, 
    deleteFood 
  } = useFoods();

  useEffect(() => {
    // Cargar datos iniciales
    loadAllFoods();
  }, []);

  const handleSearch = () => {
    if (titleInput.trim()) {
      getFood(titleInput);
    }
  };

  const handleAdd = async () => {
    if (titleInput.trim() && priceInput.trim()) {
      await addFood(titleInput, priceInput);
      // Recargar la lista después de añadir
      loadAllFoods();
      // Limpiar inputs
      setTitleInput('');
      setPriceInput('');
    }
  };

  const handleUpdate = async () => {
    if (titleInput.trim() && priceInput.trim()) {
      await updateFood(titleInput, priceInput);
      // Recargar la lista después de actualizar
      loadAllFoods();
      // También actualizar el item actual
      getFood(titleInput);
    }
  };

  const handleDelete = async () => {
    if (titleInput.trim()) {
      await deleteFood(titleInput);
      // Recargar la lista después de eliminar
      loadAllFoods();
      // Limpiar el item actual
      setCurrentFood(null);
      setTitleInput('');
      setPriceInput('');
    }
  };

  return (
    <SafeAreaView style={{ paddingTop: "15%", flex: 1, justifyContent: "center" }}>
      <ScrollView showsVerticalScrollIndicator={false} style={{ height: "80%" }}>
        <View style={styles.container}>
          <AppLogoImage />
          
          {error && <Text style={styles.errorText}>{error}</Text>}
          
          <TextInput
            style={styles.textInput}
            value={titleInput}
            onChangeText={setTitleInput}
            placeholder="Ingrese el título"
          />

          <TextInput
            style={styles.textInput}
            value={priceInput}
            onChangeText={setPriceInput}
            placeholder="Ingrese el precio"
            keyboardType="numeric"
          />
          
          <View style={styles.buttonContainer}>
            <Button title="Buscar" onPress={handleSearch} disabled={loading} />
            <Button title="Añadir" onPress={handleAdd} disabled={loading} />
            <Button title="Actualizar" onPress={handleUpdate} disabled={loading} />
            <Button title="Eliminar" onPress={handleDelete} disabled={loading} />
            <Button title="Cargar Todos" onPress={loadAllFoods} disabled={loading} />
          </View>
          
          {loading && <ActivityIndicator size="large" color="#0000ff" />}
          
          {currentFood && (
            <Text style={styles.foodDetail}>
              El precio de {currentFood.title} es de: {currentFood.price} $
            </Text>
          )}
          
          <Text style={styles.sectionTitle}>Menu:</Text>
          {foods.map((food, index) => (
            <Text key={index} style={styles.foodItem}>
              {food.title}: {food.price}
            </Text>
          ))}
        </View>
      </ScrollView>
      <BottomNavigationBar />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  textInput: {
    height: 40,
    width: "80%",
    borderColor: "gray",
    borderWidth: 1,
    marginVertical: 8,
    paddingHorizontal: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    width: '100%',
    marginVertical: 10,
    gap: 10,
  },
  errorText: {
    color: 'red',
    marginVertical: 8,
  },
  foodDetail: {
    fontSize: 18,
    fontWeight: "500",
    color: "black",
    marginTop: 20,
    textAlign: "center",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  foodItem: {
    fontSize: 16,
    marginBottom: 5,
  }
});

export default FoodScreen;