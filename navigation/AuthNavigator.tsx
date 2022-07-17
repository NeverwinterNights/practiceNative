import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Colors from "../constants/Colors";
import {AuthScreen} from "../screens/user/AuthScreen";


const Stack = createNativeStackNavigator()


export const AuthNavigator = () => (
    <Stack.Navigator screenOptions={{

        headerStyle: {
            backgroundColor: Colors.primary
        },
        headerTitleStyle: {
            fontFamily: "open-sans-bold",
        },
        headerTintColor: Colors.white
    }}>
        <Stack.Screen options={{headerTitleAlign: "center"}} name="AuthScreen"
                      component={AuthScreen}/>
        {/*<Stack.Screen options={{headerTitle: "RegisterScreen", headerTitleAlign: "center"}} name="RegisterScreen"*/}
        {/*              component={RegisterScreen}/>*/}

    </Stack.Navigator>
)