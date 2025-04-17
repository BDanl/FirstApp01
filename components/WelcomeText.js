import { View, Text, StyleSheet } from "react-native";
const WelcomeText = () => {
  return (
    <View>
      <Text style={styles.title2}>
        XHEALTH
      </Text>
    </View>
  );
};

export default WelcomeText;

const styles = StyleSheet.create({
  title1: {
    fontSize: 40,
    fontWeight: "500",
  },
  title2: {
    fontSize: 40,
    color: "red",
    fontWeight: "500",
    alignSelf:"center"
  },
});
