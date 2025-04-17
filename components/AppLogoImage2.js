import { View,StyleSheet, Image } from "react-native"
import { useState } from "react";


const AppLogoImage = () =>{
    return(
        <Image source={require("../assets/corriendo.png")}
        style={styles.image}
        />
    );
    
};

export default AppLogoImage;

const styles = StyleSheet.create({
    image: {
        marginbottom:10,
        height:15,
        width:15,
    },

})
