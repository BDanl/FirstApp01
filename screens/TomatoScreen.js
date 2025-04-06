import { use, useState } from "react";
import { View, Text, StyleSheet, Button, ScrollView, SafeAreaView } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import AppLogoImage from "../components/AppLogoImage";
import WelcomeText from "../components/WelcomeText";
import Ready from "../components/Ready";
import BottomNavigationBar from "../components/BottomNavigationBar";
import { TextInput } from "react-native-gesture-handler";
import React from "react";
import firestore from '@react-native-firebase/firestore';

const TomatoScreen = () => {
  const navigation = useNavigation();
  const [text, setText] = useState("");

/*   const[dish, setDish] = useState("");

  const getData = async () => {
    const foodsCollection = await firestore().collection('foods').get();
    console.log(foodsCollection.docs[0].data());
    setDish(foodsCollection.docs[0].data());
  }

  useEffect(() => {
    getData();
  }, []); */

  return (
    <SafeAreaView style={{ paddingTop: "15%", flex: 1, justifyContent:"center" }}>
    <ScrollView 
      showsVerticalScrollIndicator={false}
      style={{height: '80%'}}
    >
      <View style={styles.container}>
      <AppLogoImage />
      <WelcomeText />
      <Ready /> 
      <TextInput
        style={{
          height: 40,
          width: "80%",
          borderColor: "gray",
          borderWidth: 1,
        }}
        placeholder="Username"
        value={text}
        onChangeText={setText}
        onSubmitEditing={() =>
          navigation.navigate("PurpleScreen", {
            nombre: text,
            validacion: "Correcto Funcionamiento",
          })
        }
      ></TextInput>
      <Text
        style={styles.text}
        onPress={() => navigation.navigate("PurpleScreen" , {
            nombre: "Joche",
          })}
      >
        {/* {dish.title} */}
        {}
      </Text>
      {/*  <Button title="Go to Gold" onPress={() => navigation.navigate("GoldenScreen")}/> */}
        </View>
    </ScrollView>
    <BottomNavigationBar />
    </SafeAreaView>
  );
};

export default TomatoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 0,
    backgroundColor: "",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 30,
    fontWeight: "500",
    color: "black",
    marginTop: 10,
  },
});
