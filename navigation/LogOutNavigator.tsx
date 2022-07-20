import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Colors from "../constants/Colors";
import {AuthScreen} from "../screens/user/AuthScreen";
import {LogOutScreen} from "../screens/user/LogOutScreen";


const Stack = createNativeStackNavigator()


export const LogOutNavigator = () => (
    <Stack.Navigator screenOptions={{

        headerStyle: {
            backgroundColor: Colors.primary
        },
        headerTitleStyle: {
            fontFamily: "open-sans-bold",
        },
        headerTintColor: Colors.white
    }}>
        <Stack.Screen options={{headerTitleAlign: "center"}} name="LogOutScreen"
                      component={LogOutScreen}/>


    </Stack.Navigator>
)