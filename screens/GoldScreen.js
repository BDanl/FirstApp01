import { View, Text, StyleSheet, Button } from "react-native"
import { useNavigation, useRoute } from "@react-navigation/native";
import BottomNavigationBar from "../components/BottomNavigationBar";

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
            <BottomNavigationBar/>
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