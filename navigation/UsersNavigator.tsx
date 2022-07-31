import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Colors from "../constants/Colors";
import {UserProductScreen, UserProductScreenOptions} from "../screens/user/UserProductScreen";
import {EditProductScreen} from "../screens/user/EditProductScreen";

const Stack = createNativeStackNavigator()


export const UserNavigator = () => (
    <Stack.Navigator screenOptions={{

        headerStyle: {
            backgroundColor: Colors.primary
        },
        headerTitleStyle: {
            fontFamily: "open-sans-bold",
        },
        headerTintColor: Colors.white
    }}>
        {/*<Stack.Screen options={{headerTitle: "Your Product", headerTitleAlign: "center"}} name="UserProductScreen"*/}
        {/*              component={UserProductScreen}/>*/}
        <Stack.Screen options={UserProductScreenOptions} name="UserProductScreen" component={UserProductScreen}/>
        <Stack.Screen options={{headerTitleAlign: "center"}} name="EditProductScreen" component={EditProductScreen}/>


    </Stack.Navigator>
)

