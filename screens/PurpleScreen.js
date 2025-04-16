import { View, Text, StyleSheet } from "react-native"
import { useNavigation, useRoute } from "@react-navigation/native";

const PurpleScreen = () => {
    const route = useRoute();
    const { params } = route; // params contiene los datos enviados al navegar
    const routeName = route.name;

    console.log("Route Name:", routeName); // Depuración
    console.log("Params:", params); // Depuración

    const userName = params?.namae || params?.nombre || 'Invitado';
    return(
        <View style={styles.container}>
            <Text style={styles.text}>PurpleScreen</Text>
            <Text style={styles.text}>Hello, {userName}.</Text>
        </View>
    )
}

export default PurpleScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:"purple",
        justifyContent:"center",
        alignItems:"center"
    },
    text: {
        fontSize: 30,
        fontWeight:"500",
        color:"black",
        flexWrap:"wrap",
        textAlign:"center"
    }
})