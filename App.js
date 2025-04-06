import { Alert, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import MainStackNavigator from "./Navigation/MainStackNavigator";

export default function App() {
  return (
    <NavigationContainer>
      <SafeAreaView style={styles.container}>
        <MainStackNavigator />
      </SafeAreaView>
    </NavigationContainer>
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
