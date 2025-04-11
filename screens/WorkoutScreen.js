import { View, Text } from "react-native"
import ExploreRoutinesCard from "../components/workout/ExploreRoutinesCard"
import { useNavigation } from "@react-navigation/native"
import BottomNavigationBar from "../components/BottomNavigationBar"


const WorkoutScreen = () => {
    const navigation = useNavigation();
    return(

    <View style={{flex:1, justifyContent:"center", alignItems:"center"}}>
        <Text>WorkoutScreen</Text>
        <ExploreRoutinesCard/>
        <BottomNavigationBar/>
    </View>
)
}
export default WorkoutScreen

