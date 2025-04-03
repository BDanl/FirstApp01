import { View, Text, StyleSheet } from "react-native"

 const Ready = () =>{
    return(
        <View>
            <Text style={styles.text}>
                Prepare yourself to improve your life!
            </Text>
        </View>
    );
};

export default Ready;

const styles = StyleSheet.create({
    text: {
        fontSize: 20,
        fontWeight: "400",
        color: "blue",
    }
});