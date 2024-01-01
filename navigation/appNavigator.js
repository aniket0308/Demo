import { NavigationContainer } from "@react-navigation/native";
import { constants } from "../common/constant";
import Home from "../screens/Home";
import { createStackNavigator } from "@react-navigation/stack";
import MoreDetails from "../screens/MoreDetails";

const Tab = createStackNavigator();

//Navigation for screen added
const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator initialRouteName={constants.Screen.HOME}>
                <Tab.Screen
                    options={{ headerTitle: 'click a day', headerTitleAlign: 'center' }}
                    name={constants.Screen.HOME}
                    component={Home}
                />
                <Tab.Screen
                    options={{ headerTitle: 'click a day', headerTitleAlign: 'center' }}
                    name={constants.Screen.MORE_DETAILS}
                    component={MoreDetails}
                />
            </Tab.Navigator>
        </NavigationContainer>
    )
}

export default AppNavigator