import { Button, View, StyleSheet, Text, TouchableOpacity } from "react-native"
import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useNavigation } from "@react-navigation/native";

const BottomNavigationBar = () => {
  const navigation = useNavigation();
    return (
      <>
      <View style={styles.nav}>
      <TouchableOpacity style={styles.navBtn}>
        <AntDesign name="home" size={24} color="black" onPress={() => navigation.navigate("TomatoScreen")}/>
        <Text style={styles.navText}>Home</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.navBtn}>
        <Entypo name="heart" size={24} color="black" onPress={()=> navigation.navigate("PurpleScreen")}/>
        <Text style={styles.navText}>Exercises</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.navBtn}>
        <AntDesign name="checksquare" size={24} color="black" onPress={()=> navigation.navigate("GoldenScreen")}/>
        <Text style={styles.navText}>Follow Up</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.navBtn}>
        <AntDesign name="calendar" size={24} color="black" />
        <Text style={styles.navText}>Schedule</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.navBtn}>
        <FontAwesome name="user" size={24} color="black" onPress={()=> navigation.navigate("LoginScreen")}/>
        <Text style={styles.navText}>Profile</Text>
      </TouchableOpacity>
    </View>
      </>
    )  
}

export default BottomNavigationBar

const styles = StyleSheet.create({
  nav: {
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
    width: "100%",
    backgroundColor: "#f8f8f8",
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    paddingVertical: 8, // Espacio interno vertical
  },
  navBtn: {
    flex: 1,
    alignItems: "center", // Centra ícono y texto horizontalmente
    justifyContent: "center", // Centra verticalmente
  },
  navText: {
    fontSize: 12,
    marginTop: 4, // Espacio entre ícono y texto
    color: "#333",
  }
})
