import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Colors from "../constants/Colors";
import {DrawerNavigator} from "./DrawerNavigation";
import {AuthNavigator} from "./AuthNavigator";
import {MainNavigatorStackParamList} from "./types";

const Stack = createNativeStackNavigator<MainNavigatorStackParamList>()


export const MainNavigator = () => (
    <Stack.Navigator screenOptions={{
        headerStyle: {
            backgroundColor: Colors.primary
        },
        headerTitleStyle: {
            fontFamily: "open-sans-bold",
        },
        headerTintColor: Colors.white
    }}>
        {/*<Stack.Screen options={{headerShown: false}} name="AuthNavigator" component={AuthNavigator}/>*/}
        <Stack.Screen options={{headerShown: false}} name="DrawerNavigator" component={DrawerNavigator}/>
    </Stack.Navigator>
)
