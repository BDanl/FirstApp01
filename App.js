import { Alert, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import MainStackNavigator from "./Navigation/MainStackNavigator";
import { FoodProvider } from "./context/FoodContext";

export default function App() {
  return (
    <FoodProvider>
    <NavigationContainer>
      <SafeAreaView style={styles.container}>
        <MainStackNavigator />
      </SafeAreaView>
    </NavigationContainer>
    </FoodProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    /* alignItems: 'center',
    justifyContent: 'center', */
  },
});
