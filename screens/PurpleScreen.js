import { View, Text, StyleSheet } from "react-native"
import { useNavigation } from "@react-navigation/native";
import BottomNavigationBar from "../components/BottomNavigationBar";

const PurpleScreen = () => {
    return(
        <View style={styles.container}>
            <Text style={styles.text}>PurpleScreen</Text>
            <BottomNavigationBar/>
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
        color:"black"
    }
})