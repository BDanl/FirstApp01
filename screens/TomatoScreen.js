import { use } from "react";
import { View, Text, StyleSheet, Button } from "react-native"
import { useNavigation } from "@react-navigation/native";
import AppLogoImage from "../components/AppLogoImage";
import WelcomeText from "../components/WelcomeText";
import Ready from "../components/Ready";
import BottomNavigationBar from "../components/BottomNavigationBar";

const TomatoScreen = () => {
    const navigation = useNavigation();
    return(
        <View style={styles.container}>
            <AppLogoImage/>
            <WelcomeText/>
            <Ready/>
            <BottomNavigationBar/>

            <Text style={styles.text} onPress={() => navigation.navigate("GoldenScreen")}>Create your account here</Text>
           {/*  <Button title="Go to Gold" onPress={() => navigation.navigate("GoldenScreen")}/> */}
        </View>
    )
}

export default TomatoScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:"",
        justifyContent:"center",
        alignItems:"center"
    },
    text: {
        fontSize: 30,
        fontWeight:"500",
        color:"black",
        marginTop:20
    }
})