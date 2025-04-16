import { use, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  ScrollView,
  SafeAreaView,
  KeyboardAvoidingView,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import AppLogoImage from "../components/AppLogoImage";
import WelcomeText from "../components/WelcomeText";
import Ready from "../components/Ready";
import { TextInput } from "react-native-gesture-handler";
import React from "react";
import { useEffect } from "react";
import {
  collection,
  getDoc,
  getDocs,
  doc,
  setDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  documentId,
  orderBy,
} from "firebase/firestore";
import { db } from "../firebaseConfig";
import { getFirestore } from "firebase/firestore";
import { firebase } from "../firebaseConfig";

const TomatoScreen = () => {
  const navigation = useNavigation();
  const [text, setText] = useState("");
  const [collectionR, setCollectionR] = useState("");

  const [dish, setDish] = useState("");
  const [dishes, setDishes] = useState([]);
  const [titleInput, setTitleInput] = useState("");
  const [priceInput, setPriceInput] = useState("");

  const getColId = async (targetTitle = titleInput) => {
    try {
      const collections = ["foods", "users", "books"];

      console.log(
        `Buscando documento con título "${targetTitle}" en colecciones:`,
        collections
      );

      for (const collectionName of collections) {
        console.log(`Procesando colección: ${collectionName}`);

        const querySnapshot = await getDocs(
          query(
            collection(db, collectionName),
            where("title", "==", targetTitle)
          )
        );

        if (!querySnapshot.empty) {
          const doc = querySnapshot.docs[0];
          console.log(
            `Documento encontrado en colección ${collectionName}, doc.id: ${doc.id}`
          );

          const objectid = doc.data().objectid;
          return objectid || collectionName;
        }
      }

      console.log(
        `No se encontró ningún documento con título "${targetTitle}"`
      );
      return null;
    } catch (error) {
      console.error("Error en getColId:", error);
      return null;
    }
  };
  const getId = async (titleid) => {
    try {
      const colId = await getColId(titleid);

      if (!colId) {
        console.log(`No se encontró colección para el título "${titleid}"`);
        return null;
      }

      console.log(
        `Buscando documento con título "${titleid}" en colección ${colId}`
      );

      const querySnapshot = await getDocs(
        query(collection(db, colId), where("title", "==", titleid))
      );

      if (!querySnapshot.empty) {
        const docId = querySnapshot.docs[0].id;
        console.log(`Documento encontrado con ID: ${docId}`);
        return docId;
      }

      console.log(
        `No se encontró documento con título "${titleid}" en colección ${colId}`
      );
      return null;
    } catch (error) {
      console.error("Error en getId:", error);
      return null;
    }
  };
  const getData = async () => {
    try {
      if (!titleInput || titleInput.trim() === "") {
        console.log("Error: El título de búsqueda está vacío");
        return;
      }
      const colId = await getColId();
      if (!colId) {
        console.log("Error: No se pudo determinar la colección del documento");

        return;
      }
      const docId = await getId(titleInput);
      console.log("docID:", docId);

      if (!docId) {
        console.log(
          `Error: No se encontró documento con título "${titleInput}"`
        );

        return;
      }
      const docRef = doc(db, colId, docId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setDish(docSnap.data());
        console.log("Dato obtenido:", docSnap.data());
      } else {
        console.log(
          `Documento existe en ruta (${colId}/${docId}) pero no tiene datos`
        );
        setDish({});
      }
    } catch (error) {
      console.error("Error obteniendo datos en getData:", error);
      if (error.code === "permission-denied") {
        console.log("Error de permisos: No tienes acceso a este documento");
      } else if (error.message && error.message.includes("empty path")) {
        console.log("Error: La ruta del documento está incompleta o vacía");
      }
      setDish({});
    }
  };
  const getAllData = async () => {
    try {
      const colId = await getColId();
      console.log("colID:", colId);

      const queryFoods = await getDocs(collection(db, colId));
      const dishesList = [];
      queryFoods.forEach((doc) => {
        dishesList.push(doc.data());
        setDishes(dishesList);
      });
    } catch (error) {
      console.log("Error obteniendo getAllData:",error);
    }
  };
  
  const updateData = async () => {
    const colId = await getColId();

    const titleU = titleInput;
    const docId = await getId(titleU);
    await updateDoc(doc(db, colId, docId), {
      title: titleInput,
      price: parseInt(priceInput),
    });
    console.log("Documento actualizado con éxito");
  };
  const deleteData = async () => {
    try {
      const colId = await getColId();

      const title = titleInput;
      const docId = await getId(title);
      await deleteDoc(doc(db, colId, docId));
      console.log("Documento eliminado con éxito");
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };
  const getMultipleData = async () => {
    const q = query(collection(db, "foods"), where("price", "==", 2000));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
    });
  };
  const addData = async () => {
    
    const docRef = await addDoc(collection(db, "foods"), {
      title: titleInput,
      price: parseInt(priceInput),
      objectid: "foods",
    });

    console.log(`Documento agregado con éxito con ID: ${docRef.id}`);
  };
  const getFoodId = async () => {
    try {
      const title = titleInput;
      const docId = await getId(title);
      console.log("ID: ", docId);
      return docId;
    } catch (error) {
      console.error("Error obteniendo getFoodId:", error);
    }
  };
  const getFoodCol = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "foods"));
      for (const doc of querySnapshot.docs) {
        if (doc.data().title === titleInput) {
          console.log("ID: ", doc.id);
          return doc.id;
        }
      }
    } catch (error) {
      console.error("Error obteniendo getFoodCol:", error);
    }
  };
  const getCollectionIdMaybe = async () => {
    try {
      const objectid = "";
      const querySnapshot = await getDocs(collection(db, "collectionNames"));
      for (const doc of querySnapshot.docs) {
        console;
        if (doc.id === objectid) {
          console.log("ID: ", doc.id);
          return doc.id;
        }
      }
    } catch (error) {
      console.error("Error obteniendo getCollectionId:", error);
    }
  };

  

  const matchTitle = async () => {
    for (const dish of dishes) {
      if (dish.title === titleInput) {
        const h = dish.title;
        console.log("TiltleDoc: ", h);
        return h;
      }
    }
    console.log("No se encontró el documento");
  };

  const compareCollections = async (
    parametro,
    collectionPrincipal,
    campoComparacion,
    coleccionesSecundarias
  ) => {
    try {
      const docRef = firebase
        .firestore()
        .collection(collectionPrincipal)
        .doc(parametro);
      const doc = await docRef.get();
      if (!doc.exists) {
        throw new Error(
          `Documento no encontrado en la colección ${collectionPrincipal}`
        );
      }
      const campoValor = doc.data()[campoComparacion];
      const resultados = [];
      for (const coleccionSecundaria of coleccionesSecundarias) {
        const queryRef = firebase
          .firestore()
          .collection(coleccionSecundaria)
          .where(campoComparacion, "==", campoValor);
        const querySnapshot = await queryRef.get();
        if (querySnapshot.docs.length > 0) {
          resultados.push({
            coleccion: coleccionSecundaria,
            documento: querySnapshot.docs[0].data().id,
          });
        }
      }
      return resultados;
    } catch (error) {
      console.error(error);
      throw new Error(`Error al comparar colecciones: ${error.message}`);
    }
  };

  useEffect(() => {
    /* getAllData(); */
    /* createList(); */
    /* getData(); */
  }, []);

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
          <WelcomeText />
          <Ready />
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
            onSubmitEditing={""}
            value={priceInput}
            onChangeText={(text) => {
              setPriceInput(text);
              console.log("Precio ingresado:", text);
            }}
            placeholder="Ingrese el precio"
            keyboardType="numeric"
          ></TextInput>
          <Button title="Add data" onPress={() => addData()} />
          <Button title="Update data" onPress={() => updateData()} />
          <Button title="Delete data" onPress={() => deleteData()} />
            <Button title="get all data" onPress={() => getAllData()} />
          <Button
            title="get  multiple data"
            onPress={() => getMultipleData()}
          />
          <Button title="get id" onPress={() => getId()} />
          <Button title="Buscar" onPress={() => getData()} />
          <Button title="get collection ID" onPress={() => getColId()} />
          <Text
            style={styles.text}
            onPress={() =>
              navigation.navigate("PurpleScreen", {
                nombre: "Joche",
              })
            }
          >
            El precio de {dish.title} es de: {dish.price} $
          </Text>
          {/*  <Button title="Go to Gold" onPress={() => navigation.navigate("GoldenScreen")}/> */}

          <Text>
            Menu:
            {"\n"}
            {dishes.map((dish, index) => (
              <Text key={index}>
                {/* index ===
                  0 */ /* dish.title.includes("Jopo") dish.price>1000 */ /* && */ (
                  <Text>
                    {dish.title + ": "}

                    {dish.price + " "}
                    {"\n"}
                  </Text>
                )}
              </Text>
            ))}
          </Text>
        </View>
      </ScrollView>
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
    textAlign: "center",
  },
  textinput: {
    height: 40,
    width: "80%",
    borderColor: "gray",
    borderWidth: 1,
  },
});
