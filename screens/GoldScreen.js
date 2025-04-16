import { View, Text, StyleSheet, Button, TextInput } from "react-native"
import { useNavigation, useRoute } from "@react-navigation/native";

const GoldScreen = () => {
    const navigation = useNavigation();


    return(
        <View style={styles.container}>
            
            <Text style={styles.text}>GoldScreen</Text>
            <Button title="Go to Purple" onPress={() => navigation.navigate("PurpleScreen")}/>

            <Text
                    style={styles.text}
                    onPress={() => navigation.navigate("PurpleScreen" , {
                        namae: "Kikitaro",
                      })}
                  >
                    Create your account here
            </Text>

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
        </View>
    )
}

export default GoldScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:"gold",
        justifyContent:"center",
        alignItems:"center"
    },
    text: {
        fontSize: 30,
        fontWeight:"500",
        color:"black"
    }
})