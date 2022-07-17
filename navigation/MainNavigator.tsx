import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Colors from "../constants/Colors";
import {DrawerNavigator} from "./DrawerNavigation";
import {AuthNavigator} from "./AuthNavigator";

const Stack = createNativeStackNavigator()


export const MainNavigator = () => (
    <Stack.Navigator initialRouteName={"AuthNavigator"} screenOptions={{
        headerStyle: {
            backgroundColor: Colors.primary
        },
        headerTitleStyle: {
            fontFamily: "open-sans-bold",
        },
        headerTintColor: Colors.white
    }}>
        <Stack.Screen options={{headerShown: false}} name="AuthNavigator" component={AuthNavigator}/>
        <Stack.Screen options={{headerShown: false}} name="DrawerNavigator" component={DrawerNavigator}/>
    </Stack.Navigator>
)