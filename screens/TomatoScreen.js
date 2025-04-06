import { use, useState } from "react";
import { View, Text, StyleSheet, Button, ScrollView, SafeAreaView } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import AppLogoImage from "../components/AppLogoImage";
import WelcomeText from "../components/WelcomeText";
import Ready from "../components/Ready";
import BottomNavigationBar from "../components/BottomNavigationBar";
import { TextInput } from "react-native-gesture-handler";
import React from "react";
import { useEffect } from "react";
import { collection, getDoc, getDocs, doc, setDoc, addDoc, updateDoc, deleteDoc  } from "firebase/firestore";
import { db } from "../firebaseConfig";
 

const TomatoScreen = () => {
  const navigation = useNavigation();
  const [text, setText] = useState("");

  const[dish, setDish] = useState("");
  const [dishes, setDishes] = useState([]);
  const [titleInput, setTitleInput] = useState("");
  const [priceInput, setPriceInput] = useState("");

  const getData = async () => {
    const docRef= doc(db, "foods", "GVoFBYWAdUnLvHNgBoeW");
    const docSnap = await getDoc(docRef);
    /* console.log("Document data:", docSnap.data()); */
  if (docSnap.exists()) {
    setDish(docSnap.data());
  } else {
    /* console.log("No such document!"); */
  }
  };

  const getAllData = async () => {
    const queryFoods = await getDocs(collection(db, "foods"));
    const dishesList = [];
    queryFoods.forEach((doc) => {
      dishesList.push(doc.data());
    });
    setDishes(dishesList);
  };
  
  const addData = async () => {
    await addDoc(collection(db, "foods"), {
      title: titleInput,
      price: parseInt(priceInput)
     });
     
  }

  const choto = (title, price) => {
    /* console.log(title);
    setTitle(title);
    console.log(price);
    setPrice(price); */
    
  }
  useEffect(() => {
    getAllData();
    getData();
  }, []);

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
      {/* <TextInput
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
      ></TextInput> */}
      <TextInput
        style={styles.textinput}
        value={titleInput}
        onChangeText={(text) => setTitleInput(text)}
        placeholder="Ingrese el título"
      ></TextInput>

      <TextInput
        style={styles.textinput}
        value={priceInput}
        onChangeText={(text) => setPriceInput(text)}
        placeholder="Ingrese el precio"
        keyboardType="numeric"
      ></TextInput>
      <Button title="Add data" onPress={() => addData()}>

      </Button>
      <Text
        style={styles.text}
        onPress={() => navigation.navigate("PurpleScreen" , {
            nombre: "Joche",
          })}
      >
        El precio de {dish.title} es de: {dish.price} $
      </Text>
      {/*  <Button title="Go to Gold" onPress={() => navigation.navigate("GoldenScreen")}/> */}

      <Text>
        {dishes.map((dish, index) => (
          <Text key={index}>
            {dish.title}
            {dish.price}
          </Text>
        ))}
      </Text>
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
    textAlign:"center"
  },
  textinput: {
    height: 40,
    width: "80%",
    borderColor: "gray",
    borderWidth: 1,
  },
});
