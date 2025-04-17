import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  TextInput,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import { useGuest } from "../context/GuestContext";
import { useFoods } from "../hooks/useFoods";
import AppLogoImage from "../components/AppLogoImage";
import DropdownComponent from "../components/DropdownComponent";
import { useFoodContext } from "../context/FoodContext";

const FoodScreen = () => {
  const { isGuest } = useGuest();
  console.log("isGuest (Context):", isGuest); // Debería ser true si es invitado
  const [titleInput, setTitleInput] = useState("");
  const [priceInput, setPriceInput] = useState("");
  const [categoryInput, setCategoryInput] = useState("");
  const {
    foods,
    currentFood,
    loading,
    error,
    loadAllFoods,
    getFood,
    addFood,
    updateFood,
    deleteFood,
    loadFoodsByCategory,
  } = useFoodContext();

  useEffect(() => {
    loadAllFoods();
  }, []);

  const handleSearch = async () => {
    if (titleInput.trim()) {
      const formattedInput = `${titleInput.trim()[0].toUpperCase()}${titleInput
        .trim()
        .slice(1)}`;
      await getFood(formattedInput);
    }
  };

  const handleAdd = async () => {
    if (titleInput.trim() && priceInput.trim() && categoryInput.trim()) {
      const formattedTitle = `${titleInput.trim()[0].toUpperCase()}${titleInput
        .trim()
        .slice(1)}`;
      const formattedCategory = categoryInput.trim().toLowerCase();
      await addFood(formattedTitle, priceInput, formattedCategory);
      loadAllFoods();
      setTitleInput("");
      setPriceInput("");
    }
  };

  const handleUpdate = async () => {
    if (titleInput.trim() && priceInput.trim() && categoryInput.trim()) {
      const formattedTitle = `${titleInput.trim()[0].toUpperCase()}${titleInput
        .trim()
        .slice(1)}`;
      const formattedCategory = categoryInput.trim().toLowerCase();
      await updateFood(formattedTitle, priceInput, formattedCategory);
      loadAllFoods();
      getFood(formattedTitle);
    }
  };

  const handleDelete = async () => {
    if (titleInput.trim()) {
      const formattedTitle = `${titleInput.trim()[0].toUpperCase()}${titleInput
        .trim()
        .slice(1)}`;
      await deleteFood(formattedTitle);
      loadAllFoods();
      setCurrentFood(null);
      setTitleInput("");
      setPriceInput("");
    }
  };

  const handleLoadByCategory = async () => {
    if (categoryInput.trim()) {
      const formattedInput = categoryInput.trim().toLowerCase();
      await loadFoodsByCategory(formattedInput);
    }
  };

  return (
    <SafeAreaView
      style={{ paddingTop: "15%", flex: 1, justifyContent: "center" }}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ height: "80%" }}
      >
        <View style={styles.container}>
          <AppLogoImage />
          <View style={styles.paramcontainer}>
            {isGuest && <Text style={styles.welcomeText}>Hola, Invitado</Text>}
          </View>
          <DropdownComponent />
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
          <TextInput
            style={styles.textInput}
            value={categoryInput}
            onChangeText={setCategoryInput}
            placeholder="Ingrese la categoria"
          />
          <View style={styles.buttonContainer}>
            <Button title="Buscar" onPress={handleSearch} disabled={loading} />
            <Button title="Añadir" onPress={handleAdd} disabled={loading} />
            <Button
              title="Actualizar"
              onPress={handleUpdate}
              disabled={loading}
            />
            <Button
              title="Eliminar"
              onPress={handleDelete}
              disabled={loading}
            />
            <Button
              title="Cargar Todos"
              onPress={loadAllFoods}
              disabled={loading}
            />
            <Button title="Load by category" onPress={handleLoadByCategory} />
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
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    width: "100%",
    marginVertical: 10,
    gap: 10,
  },
  errorText: {
    color: "red",
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
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
  foodItem: {
    fontSize: 16,
    marginBottom: 5,
  },
  paramcontainer: {
    flex: 1,
    padding: 1,
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10,
    color: "red",
  },
});

export default FoodScreen;
