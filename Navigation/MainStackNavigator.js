import { createStackNavigator } from "@react-navigation/stack";
import TomatoScreen from "../screens/TomatoScreen";
import GoldScreen from "../screens/GoldScreen";
import PurpleScreen from "../screens/PurpleScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";

const AppStack = createStackNavigator();

function MainStackNavigator() {
    return (
        <AppStack.Navigator screenOptions={{ headerShown: false }}>
            <AppStack.Screen name="TomatoScreen" component={TomatoScreen} />
            <AppStack.Screen name="LoginScreen" component={LoginScreen} />
            <AppStack.Screen name="RegisterScreen" component={RegisterScreen} />
            <AppStack.Screen name="GoldenScreen" component={GoldScreen} />
            <AppStack.Screen name="PurpleScreen" component={PurpleScreen} />
        </AppStack.Navigator>
    )
}

export default MainStackNavigator;
