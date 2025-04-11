import { View, Text, StyleSheet, Button } from "react-native";
import { useNavigation } from '@react-navigation/native';
import React from "react";
import BottomNavigationBar from "../../components/BottomNavigationBar";


const ExploreScreen = () => {
    const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>ExploreScreen</Text>
      <Button title="Volver a WorkoutScreen" onPress={() => navigation.goBack()} />
      <BottomNavigationBar/>
    </View>
  );
};

export default ExploreScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
