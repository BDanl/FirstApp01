import { use } from "react";
import { View, Text, StyleSheet, Button } from "react-native"
import { useNavigation } from "@react-navigation/native";

const TomatoScreen = () => {
    const navigation = useNavigation();
    return(
        <View style={styles.container}>
            <Text style={styles.text}>TomatoScreen</Text>
            <Button title="Go to Gold" onPress={() => navigation.navigate("GoldenScreen")}/>
        </View>
    )
}

export default TomatoScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:"tomato",
        justifyContent:"center",
        alignItems:"center"
    },
    text: {
        fontSize: 30,
        fontWeight:"500",
        color:"black"
    }
})