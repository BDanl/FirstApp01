import { View, Text, StyleSheet } from "react-native"

const PurpleScreen = () => {
    return(
        <View style={styles.container}>
            <Text style={styles.text}>PurpleScreen</Text>
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