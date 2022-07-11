import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {ProductOverviewScreen} from "../screens/shop/ProductOverviewScreen";
import Colors from "../constants/Colors";
import {ProductDetailScreen} from "../screens/shop/ProductDetailScreen";
import {CartScreen} from "../screens/shop/CartScreen";
import {OrdersScreen} from "../screens/shop/OrdersScreen";
import {UserProductScreen} from "../screens/user/UserProductScreen";
import { EditProductScreen } from "../screens/user/EditProductScreen";

const Stack = createNativeStackNavigator()


export const UserNavigator = () => (
    <Stack.Navigator screenOptions={{

        headerStyle: {
            backgroundColor: Colors.primary
        },
        headerTitleStyle: {
            fontFamily:  "open-sans-bold",
        },
        headerTintColor: Colors.white
    }}>
        <Stack.Screen options={{headerTitle: "Your Product", headerTitleAlign: "center"}} name="UserProductScreen" component={UserProductScreen}/>
        <Stack.Screen options={{headerTitleAlign: "center"}} name="EditProductScreen" component={EditProductScreen}/>


    </Stack.Navigator>
)

