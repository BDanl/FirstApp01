
import { createStackNavigator } from "@react-navigation/stack";
import TabNavigator from "../components/TabNavigator"; 
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import GoldScreen from "../screens/GoldScreen";
import PurpleScreen from "../screens/PurpleScreen";
import ExploreScreen from "../screens/subscreens/ExploreScreen";
import TomatoScreen from "../screens/TomatoScreen";
import WorkoutScreen from "../screens/WorkoutScreen";
import OtherScreen from "../screens/OtherScreen";
import FoodsScreen from "../screens/FoodsScreen";


const AppStack = createStackNavigator();

function MainStackNavigator() {
    return (
        <AppStack.Navigator initialRouteName="LoginScreen" screenOptions={{ headerShown: false }}>

            <AppStack.Screen name="TabHome" component={TabNavigator} />
            
            {/* Pantallas que no son parte de los tabs */}
            <AppStack.Screen name="LoginScreen" component={LoginScreen} />
            <AppStack.Screen name="RegisterScreen" component={RegisterScreen} />
            <AppStack.Screen name="GoldenScreen" component={GoldScreen} />
            <AppStack.Screen name="PurpleScreen" component={PurpleScreen} />
            <AppStack.Screen name="ExploreScreen" component={ExploreScreen} />
            
            {/* También puedes mantener referencias directas a pantallas del tab
                si necesitas acceder a ellas desde el stack */}
            <AppStack.Screen name="TomatoScreen" component={TomatoScreen} />
            <AppStack.Screen name="WorkoutScreen" component={WorkoutScreen} />
            <AppStack.Screen name="OtherScreen" component={OtherScreen} />
            <AppStack.Screen name="FoodsScreen" component={FoodsScreen} />
        </AppStack.Navigator>
    )
}

export default MainStackNavigator;