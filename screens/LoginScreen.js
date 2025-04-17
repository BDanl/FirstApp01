import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Animated,
  Easing,
  ScrollView,
  Dimensions,
} from "react-native";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../firebaseConfig";
import AppLogoImage from "../components/AppLogoImage";
import AppLogoImage2 from "../components/AppLogoImage2";
import WelcomeText from "../components/WelcomeText";
import Ready from "../components/Ready";
import { Ionicons } from "@expo/vector-icons";
import { useGuest } from "../context/GuestContext";

export default function Login({ navigation }) {
  const { setIsGuest } = useGuest();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [mostrarContrasena, setMostrarContrasena] = useState(false);

  const handleGuestLogin = () => {
    setIsGuest(true); // Marcamos como invitado
    navigation.navigate("TabHome"); // Navegamos sin parámetros
  };

  const setEmailTrim = (text) => {
    setEmail(text.trim());
  };
  const setPasswordTrim = (text) => {
    setPassword(text.trim());
  };
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => setKeyboardVisible(true)
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => setKeyboardVisible(false)
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const redirectRegister = () => {
    navigation.navigate("RegisterScreen");
  };
  const handleSignIn = () => {
    const auth = getAuth(app);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("Sesion iniciada:", userCredential.user);
        navigation.navigate("TabHome");
      })
      .catch((error) => {
        console.log("Error:", error.message);
        const errorMessage =
          error.code === "auth/email-already-in-use"
            ? "Este correo ya está registrado"
            : error.code === "auth/invalid-email"
            ? "Correo electrónico no válido"
            : error.code === "auth/missing-password"
            ? "Debe ingresar una contraseña"
            : error.code === "auth/invalid-credential"
            ? "Correo y/o contraseña incorrectos"
            : error.code === "auth/network-request-failed"
            ? "Error de conexión. Verifica tu internet"
            : "Ocurrió un error al registrar";

        Alert.alert("Error", errorMessage);
      });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
      keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={{ flex: 1, paddingTop: "35%" }}>
          <View style={{ alignItems: "center", marginBottom: 20 }}>
            <AppLogoImage />
          </View>

          {!isKeyboardVisible && (
            <View style={styles.headerContainer}>
              <WelcomeText />
              <Ready />
            </View>
          )}

          <View style={styles.formContainer}>
            <Text>Email:</Text>
            <TextInput
              onChangeText={setEmailTrim}
              style={styles.input}
              autoCapitalize="none"
            />
            <Text>Contraseña:</Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View style={{ flexDirection: "row" }}>
                <TextInput
                  secureTextEntry={!mostrarContrasena}
                  onChangeText={setPasswordTrim}
                  style={[styles.input, { flex: 1 }]}
                  autoCapitalize="none"
                />
              </View>
              <View style={{ marginLeft: 10, flexDirection: "column" }}>
                <Ionicons
                  name={mostrarContrasena ? "eye-outline" : "eye-off-outline"}
                  size={20}
                  color="gray"
                  style={{ marginLeft: 10, marginTop: -5 }}
                  onPress={() => setMostrarContrasena(!mostrarContrasena)}
                />
              </View>
            </View>
            
            <TouchableOpacity onPress={handleSignIn} style={styles.loginButton}>
              <Text style={{ color: "#fff", fontSize: 18, fontWeight: "bold" }}>
                Login
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={redirectRegister}>
              <Text style={styles.forgottenText}>
                ¿Olvidaste tu contraseña?
              </Text>
            </TouchableOpacity>
          </View>
          {!isKeyboardVisible && (
            <View>
              <TouchableOpacity
              onPress={handleGuestLogin}
              style={styles.invitadoButton}
              >
                <Text style={{ color: "red", }}>
                  Acceder como invitado
                </Text>
              </TouchableOpacity>
            </View>
          )}
          {!isKeyboardVisible && (/*redirectRegister */
            <View
              style={{ width: "80%", alignSelf: "center", marginTop: "25%" }}
            >
              <TouchableOpacity
                onPress={redirectRegister}
                style={styles.redirectRegister}
              >
                <Text
                  style={{ color: "#000", fontSize: 18, fontWeight: "bold" }}
                >
                  Regístrate con nosotros
                </Text>
              </TouchableOpacity>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: 20,
                }}
              >
                <AppLogoImage2 />
                <Text style={styles.sideText}>XHealth</Text>
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  formContainer: {
    width: "80%",
    alignSelf: "center",
    marginBottom: "10%",
    paddingRight: 20, // agregar un paddingRight para dar espacio suficiente
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 12,
    marginBottom: 15,
    borderRadius: 6,
    marginRight: 10,
  },
  text: {
    fontSize: 30,
    fontWeight: "500",
    color: "black",
    marginTop: 20,
    fontFamily: "serif",
    fontStyle: "italic",
  },
  redirectRegister: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "serif",
    fontStyle: "italic",
  },
  forgottenText: {
    textAlign: "center",
    color: "blue",
    marginTop: 15,
  },
  sideText: {
    fontSize: 15,
    color: "red",
    fontWeight: "500",
    alignSelf: "center",
  },
  loginButton: {
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#0000ff",
    borderColor: "#0000ff",
    justifyContent: "center",
    alignItems: "center",
  },
  invitadoButton: {
    paddingVertical: 1,
    paddingHorizontal: 2,
    justifyContent: "center",
    alignItems: "center",
    width: "80%",
    alignSelf: "center",
  },
});

