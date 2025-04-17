import React, { useState, useEffect } from "react";
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
  ScrollView,
  Platform
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
        navigation.navigate("LoginScreen");
      })
      .catch((error) => {
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
    <KeyboardAvoidingView 
      style={{ flex: 1 }} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={{ paddingTop: "15%", flex: 1 }}>
          {/* Logo y título (ocultos cuando el teclado está visible) */}
          {!isKeyboardVisible && (
            <View style={styles.headerContainer}>
              <AppLogoImage />
              <Text style={styles.title}>Rise your Health</Text>
            </View>
          )}

          {/* Formulario de registro */}
          <View style={styles.formContainer}>
            <Text style={styles.label}>Email:</Text>
            <TextInput
              onChangeText={setEmail}
              style={styles.input}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <Text style={styles.label}>Contraseña:</Text>
            <TextInput
              secureTextEntry
              onChangeText={setPassword}
              style={styles.input}
            />

            <Text style={styles.label}>Nombre:</Text>
            <TextInput
              onChangeText={setName}
              style={styles.input}
            />

            <Text style={styles.label}>Apellido:</Text>
            <TextInput
              onChangeText={setLastName}
              style={styles.input}
            />

            <Text style={styles.label}>Edad:</Text>
            <TextInput
              onChangeText={setAge}
              style={styles.input}
              keyboardType="numeric"
            />

            <Text style={styles.label}>Género:</Text>
            <TextInput
              onChangeText={setGender}
              style={styles.input}
            />

            <Button 
              title="Registrarse" 
              onPress={handleSignUp} 
              style={styles.registerButton}
            />

            <TouchableOpacity onPress={redirectLogin} style={styles.loginLink}>
              <Text style={styles.loginText}>¿Ya tienes cuenta? Inicia sesión</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 30,
    fontWeight: "500",
    color: "black",
    marginTop: 20,
    fontFamily: "serif",
    fontStyle: "italic",
  },
  formContainer: {
    width: '85%',
    alignSelf: 'center',
    marginBottom: 30,
  },
  label: {
    marginBottom: 5,
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 12,
    marginBottom: 15,
  },
  registerButton: {
    marginTop: 20,
  },
  loginLink: {
    marginTop: 15,
    alignItems: 'center',
  },
  loginText: {
    color: 'blue',
    textAlign: 'center',
  },
});