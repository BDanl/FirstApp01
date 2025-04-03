import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import AppLogoImage from './components/AppLogoImage';
import WelcomeText from './components/WelcomeText';
import Ready from './components/Ready';
import GoldSccreen from './screens/GoldScreen';
import TomatoScreen from './screens/TomatoScreen';
import PurpleScreen from './screens/PurpleScreen';
import { NavigationContainer } from '@react-navigation/native';
import MainStackNavigator from './Navigation/MainStackNavigator';


export default function App() {
  return (
    <NavigationContainer>
    <SafeAreaView 
    style={styles.container}>
      {/* <AppLogoImage/>
      <WelcomeText/>
      <Ready/> */}
      <MainStackNavigator/>
    </SafeAreaView>
    </NavigationContainer>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    /* alignItems: 'center',
    justifyContent: 'center', */
  },
});
