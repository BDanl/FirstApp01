import { View, Text, StyleSheet, Button } from "react-native"
import { useNavigation, useRoute } from "@react-navigation/native";

const GoldScreen = () => {
    const navigation = useNavigation();
    const {name, params} = useRoute()
    console.log(name, params)

    return(
        <View style={styles.container}>
            <Text style={styles.text}>GoldScreen</Text>
            <Button title="Go to Purple" onPress={() => navigation.navigate("PurpleScreen")}/>
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