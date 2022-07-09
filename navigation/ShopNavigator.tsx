import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {ProductOverviewScreen} from "../screens/shop/ProductOverviewScreen";
import Colors from "../constants/Colors";
import {ProductDetailScreen} from "../screens/shop/ProductDetailScreen";
import {CartScreen} from "../screens/shop/CartScreen";
import {OrdersScreen} from "../screens/shop/OrdersScreen";

const Stack = createNativeStackNavigator()


export const ShopNavigator = () => (
    <Stack.Navigator screenOptions={{
        headerStyle: {
            backgroundColor: Colors.primary
        },
        headerTitleStyle: {
            fontFamily:  "open-sans-bold",
        },
        headerTintColor: Colors.white
    }}>
        <Stack.Screen options={{headerTitle: "All Products", headerTitleAlign: "center"}} name="ProductOverviewScreen" component={ProductOverviewScreen}/>
        <Stack.Screen options={{headerTitle: "Product Detail", headerTitleAlign: "center"}} name="ProductDetailScreen" component={ProductDetailScreen}/>
        <Stack.Screen options={{headerTitle: "Cart", headerTitleAlign: "center"}} name="CartScreen" component={CartScreen}/>
        {/*<Stack.Screen options={{headerTitle: "Orders", headerTitleAlign: "center"}} name="OrdersScreen" component={OrdersScreen}/>*/}

    </Stack.Navigator>
)