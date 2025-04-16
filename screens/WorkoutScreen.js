import { View, Text } from "react-native"
import ExploreRoutinesCard from "../components/workout/ExploreRoutinesCard"
import { useNavigation } from "@react-navigation/native"


const WorkoutScreen = () => {
    const navigation = useNavigation();
    return(

    <View style={{flex:1, justifyContent:"center", alignItems:"center"}}>
        <Text>WorkoutScreen</Text>
        <ExploreRoutinesCard/>
    </View>
)
}
export default WorkoutScreen

