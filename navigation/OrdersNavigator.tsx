import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {ProductOverviewScreen} from "../screens/shop/ProductOverviewScreen";
import Colors from "../constants/Colors";
import {ProductDetailScreen} from "../screens/shop/ProductDetailScreen";
import {CartScreen} from "../screens/shop/CartScreen";
import {OrdersScreen, OrdersScreenOptions} from "../screens/shop/OrdersScreen";

const Stack = createNativeStackNavigator()


export const OrderNavigator = () => (
    <Stack.Navigator screenOptions={{

        headerStyle: {
            backgroundColor: Colors.primary
        },
        headerTitleStyle: {
            fontFamily:  "open-sans-bold",
        },
        headerTintColor: Colors.white
    }}>
        {/*<Stack.Screen options={{headerTitle: "Your Orders", headerTitleAlign: "center"}} name="OrdersScreen" component={OrdersScreen}/>*/}
        <Stack.Screen options={OrdersScreenOptions} name="OrdersScreen" component={OrdersScreen}/>


    </Stack.Navigator>
)