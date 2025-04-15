// hooks/useFoods.js
import { useState, useEffect } from 'react';
import { useFirestore } from './useFirestore';

export const useFoods = () => {
  const [foods, setFoods] = useState([]);
  const [currentFood, setCurrentFood] = useState(null);
  const { loading, error, getAllData, getData, addData, updateData, deleteData, getMultipleData } = useFirestore();
  
  // Cargar todos los alimentos
  const loadAllFoods = async () => {
    const result = await getAllData('foods');
    setFoods(result);
    return result;
  };
  
  // Obtener un alimento específico
  const getFood = async (title) => {
    const result = await getData(title);
    setCurrentFood(result);
    return result;
  };
  
  // Añadir un nuevo alimento
  const addFood = async (title, price) => {
    return await addData('foods', { 
      title, 
      price: parseInt(price),
    });
  };
  
  // Actualizar un alimento existente
  const updateFood = async (title, price) => {
    return await updateData(title, {
      title,
      price: parseInt(price),
    });
  };
  
  // Eliminar un alimento
  const deleteFood = async (title) => {
    return await deleteData(title);
  };

  // Obtener alimentos por categoría
  const loadFoodsByCategory = async (category) => {
    console.log(category);
    const result = await getMultipleData('foods', 'category', category);
    setFoods(result);
    console.log("result: ", result);
    return result;
  };
  
  return {
    foods,
    currentFood,
    loading,
    error,
    loadAllFoods,
    getFood,
    addFood,
    updateFood,
    deleteFood,
    loadFoodsByCategory
  };
};



