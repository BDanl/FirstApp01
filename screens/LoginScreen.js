import React, { useState } from "react";
import { View, Text, TextInput, Button, Touchable, TouchableOpacity, StyleSheet, Alert } from "react-native";

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../firebaseConfig";
/* import { useNavigation } from "@react-navigation/native"; */
import AppLogoImage from "../components/AppLogoImage";
import WelcomeText from "../components/WelcomeText";
import Ready from "../components/Ready";

export default function Login({navigation}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  /* const navigation = useNavigation(); */

  const redirectRegister = () => {
    navigation.navigate("RegisterScreen");
  }
  const handleSignIn = () => {
    const auth = getAuth(app);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("Sesion iniciada:", userCredential.user);
        navigation.navigate("TomatoScreen");
      })
      .catch((error) => {
        console.log("Error:", error.message)
        const errorMessage = 
        error.code === 'auth/email-already-in-use' ? "Este correo ya está registrado" :
        error.code === 'auth/invalid-email' ? "Correo electrónico no válido" :
        error.code === 'auth/missing-password' ? "Debe ingresar una contraseña" :
        error.code === 'auth/invalid-credential' ? "Correo y/o contraseña incorrectos" :
        error.code === 'auth/network-request-failed' ? "Error de conexión. Verifica tu internet" :
        "Ocurrió un error al registrar";
      
      Alert.alert("Error", errorMessage);
      });
  };

  return (
    <View style={{ paddingTop: "25%", justifyContent: "center", flex:1}}>
        <View style={styles.container}>
            <AppLogoImage></AppLogoImage>
            <WelcomeText />
            <Ready /> 
            <Text
            style={styles.text}
            >
            Rise your Health
            </Text>
        </View>
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
            <Button title="Login" onPress={handleSignIn} />
            <TouchableOpacity onPress={redirectRegister} >
                    <Text style={{display:"flex", justifyContent:"center", textAlign:"center", color:"blue", margin:5 }}>{"Registrate con nosotros :)"}</Text>
            </TouchableOpacity>
        </View>

    </View>

  );
}
const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center", 
        flex: 1,
        justifyContent:"flex-start"
    },
    container2: {
        justifyContent: "center",
        alignSelf:"center",
        flex: 1,
        justifyContent:"flex-start",
        marginBottom: "20%",
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

