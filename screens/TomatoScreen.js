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
import { collection, getDoc, getDocs, doc, setDoc, addDoc, updateDoc, deleteDoc,query, where, documentId  } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { getFirestore } from 'firebase/firestore';


 

const TomatoScreen = () => {
  const navigation = useNavigation();
  const [text, setText] = useState("");

  const[dish, setDish] = useState("");
  const [dishes, setDishes] = useState([]);
  const [titleInput, setTitleInput] = useState("");
  const [priceInput, setPriceInput] = useState("");

  const getData = async () => {
    const docRef= doc(db, "foods", "21qPfhokIUVF1ZuSxUdm");
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
   const docRef = await addDoc(collection(db, "foods"), {
     title: titleInput,
     price: parseInt(priceInput)
   });
   
   console.log(`Documento agregado con éxito con ID: ${docRef.id}`);
 }
  const updateData = async () => {
    title = titleInput;
    const docId = await getId(title);
    await updateDoc(doc(db, "foods", docId), {
      title: titleInput,
      price: parseInt(priceInput)
     });
  }

  const deleteData = async () => {
    title = titleInput;
    const docId = await getId(title);
    await deleteDoc(doc(db, "foods", docId));

  };
 
  const getId = async (titleid) => {
    const querySnapshot = await getDocs(collection(db, "foods"));
    for (const doc of querySnapshot.docs) {
      if (doc.data().title === titleid) {
        console.log("ID: ", doc.id, " => ", doc.data());
        return doc.id;
      }
    }
    console.log("No se encontró el documento");
  }

  const getMultipleData = async () => {
    const q = query(collection(db, "foods"), where("price", "==", 2000));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, " => ", doc.data());
});
  }

  const matchTitle = async () => {
    for (const dish of dishes) {
      if (dish.title === titleInput) {
        const h = dish.title;
        console.log("TiltleDoc: ", h);
        return h;
      }
    }
    console.log("No se encontró el documento");
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
        onChangeText={(text) => {
          setTitleInput(text);
          console.log("Título ingresado:", text);
        }}
        placeholder="Ingrese el título"
      ></TextInput>

      <TextInput
        style={styles.textinput}
        value={priceInput}
        onChangeText={(text) => {
          setPriceInput(text);
          console.log("Precio ingresado:", text);
        }}
        placeholder="Ingrese el precio"
        keyboardType="numeric"
      ></TextInput>
      <Button title="Add data" onPress={() => addData()}/>
      <Button title="Update data" onPress={() => updateData()}/>
      <Button title="Delete data" onPress={() => deleteData()}/>
      <Button title="get  multiple data" onPress={() => getMultipleData()}/>
      <Button title="get id" onPress={() => getId()}/>
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
        Menu:
        {'\n'}
        {dishes.map((dish, index) => (
          <Text key={index}>
            {/* index===0 *//* dish.title.includes("Jopo") */ dish.price>1000 && (
              <Text>
                {dish.title + ": " }
                
            
                {dish.price + " "}
                {'\n'}
              </Text>

            )}
            
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
