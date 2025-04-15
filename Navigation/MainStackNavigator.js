import { createStackNavigator } from "@react-navigation/stack";
import TomatoScreen from "../screens/TomatoScreen";
import GoldScreen from "../screens/GoldScreen";
import PurpleScreen from "../screens/PurpleScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import WorkoutScreen from "../screens/WorkoutScreen";
import ExploreScreen from "../screens/subscreens/ExploreScreen";
import OtherScreen from "../screens/OtherScreen";
import FoodsScreen from "../screens/FoodsScreen";

const AppStack = createStackNavigator();

function MainStackNavigator() {
    return (
        <AppStack.Navigator initialRouteName="FoodsScreen" screenOptions={{ headerShown: false }}>

            <AppStack.Screen name="TomatoScreen" component={TomatoScreen} />
            <AppStack.Screen name="LoginScreen" component={LoginScreen} />
            <AppStack.Screen name="RegisterScreen" component={RegisterScreen} />
            <AppStack.Screen name="GoldenScreen" component={GoldScreen} />
            <AppStack.Screen name="PurpleScreen" component={PurpleScreen} />
            <AppStack.Screen name="WorkoutScreen" component={WorkoutScreen} />
            <AppStack.Screen name="ExploreScreen" component={ExploreScreen} />
            <AppStack.Screen name="OtherScreen" component={OtherScreen} />
            <AppStack.Screen name="FoodsScreen" component={FoodsScreen} />
            

        </AppStack.Navigator>
    )
}

export default MainStackNavigator;
