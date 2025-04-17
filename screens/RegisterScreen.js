import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Touchable,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Keyboard,
  KeyboardAvoidingView,
} from "react-native";
import AppLogoImage from "../components/AppLogoImage";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { app } from "../firebaseConfig";

export default function Register({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

    useEffect(() => {
      const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
        setKeyboardVisible(true);
      });
      const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
        setKeyboardVisible(false);
      });
  
      return () => {
        showSubscription.remove();
        hideSubscription.remove();
      };
    }, []);

  const redirectLogin = () => {
    navigation.navigate("LoginScreen");
  };

  const handleSignUp = () => {
    const auth = getAuth(app);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        Alert.alert("Usuario registrado:", email);
        console.log("Usuario registrado:", userCredential.user);
        navigation.navigate("LoginScreen");
      })
      .catch((error) => {
        console.log("Error:", error.code);
        const errorMessage =
          error.code === "auth/email-already-in-use"
            ? "Este correo ya está registrado"
            : error.code === "auth/invalid-email"
            ? "Correo electrónico no válido"
            : error.code === "auth/weak-password"
            ? "La contraseña debe tener al menos 6 caracteres"
            : error.code === "auth/network-request-failed"
            ? "Error de conexión. Verifica tu internet"
            : "Ocurrió un error al registrar";

        Alert.alert("Error", errorMessage);
      });
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" enabled>
      <View style={{ paddingTop: "25%", justifyContent: "center", flex:1}}>
      {!isKeyboardVisible && (
          <View style={styles.container}>
            <AppLogoImage />
            <Text style={styles.text}>Rise your Health</Text>
          </View>
        )}

      <View style={styles.container2}>
        <Text>Email:</Text>
        <TextInput
          onChangeText={setEmail}
          style={{ borderWidth: 1, marginBottom: 10 }}
        />
        <Text>Contraseña:</Text>
        <TextInput
          secureTextEntry
          onChangeText={setPassword}
          style={{
            borderWidth: 1,
            marginBottom: 10,
          }}
        />
        <Text>Nombre:</Text>
        <TextInput
          onChangeText={setName}
          style={{ borderWidth: 1, marginBottom: 10 }}
        />
        <Text>Apellido:</Text>
        <TextInput
          onChange={setLastName}
          onChangeText={setLastName}
          style={{ borderWidth: 1, marginBottom: 10 }}
        />
        <Text>Edad:</Text>
        <TextInput
          onChangeText={setAge}
          style={{ borderWidth: 1, marginBottom: 10 }}
        />
        <Text>Género:</Text>
        <TextInput
          onChangeText={setGender}
          style={{ borderWidth: 1, marginBottom: 10 }}
        />
        <Button title="Registrarse" onPress={handleSignUp} />

        <TouchableOpacity onPress={redirectLogin}>
          <Text
            style={{
              display: "flex",
              justifyContent: "center",
              textAlign: "center",
              color: "blue",
              margin: 5,
            }}
          >
            {"¿Ya tienes cuenta?"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
    </KeyboardAvoidingView>
    
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-end",
    alignItems: "center",
    flex: .5,
    
  },
  container2: {
    justifyContent: "center",
    alignSelf:"center",
    flex: 1,
    justifyContent:"flex-start",
    marginBottom: "20%",
    marginTop:"10%",
    width:"80%"
  },
  text: {
    fontSize: 30,
    fontWeight: "500",
    color: "black",
    marginTop: 20,
    fontFamily: "serif",
    fontStyle: "italic",
  },
});
