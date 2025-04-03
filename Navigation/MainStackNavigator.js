import { createStackNavigator } from "@react-navigation/stack";
import TomatoScreen from "../screens/TomatoScreen";
import GoldScreen from "../screens/GoldScreen";
import PurpleScreen from "../screens/PurpleScreen";

const Stack = createStackNavigator();

function MainStackNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="TomatoScreen" component={TomatoScreen} />
            <Stack.Screen name="GoldenScreen" component={GoldScreen} />
            <Stack.Screen name="PurpleScreen" component={PurpleScreen} />
        </Stack.Navigator>
    )
}

export default MainStackNavigator;
