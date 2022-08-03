import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {ProductOverviewScreen, ProductOverviewScreenOptions} from "../screens/shop/ProductOverviewScreen";
import Colors from "../constants/Colors";
import {ProductDetailScreen, ProductDetailScreenOptions} from "../screens/shop/ProductDetailScreen";
import {CartScreen} from "../screens/shop/CartScreen";
import {ShopNavigatorStackParamList} from "./types";

const Stack = createNativeStackNavigator<ShopNavigatorStackParamList>()


export const ShopNavigator = () => (
    <Stack.Navigator screenOptions={{
        headerStyle: {
            backgroundColor: Colors.primary
        },
        headerTitleStyle: {
            fontFamily: "open-sans-bold",
        },
        headerTintColor: Colors.white
    }}>
        {/*<Stack.Screen options={{headerTitle: "All Products", headerTitleAlign: "center"}} name="ProductOverviewScreen"*/}
        {/*              component={ProductOverviewScreen}/>*/}
        <Stack.Screen options={ProductOverviewScreenOptions}   name="ProductOverviewScreen" component={ProductOverviewScreen}/>
        {/*<Stack.Screen options={{ headerTitleAlign: "center"}} name="ProductDetailScreen"*/}
        {/*              component={ProductDetailScreen}/>*/}
        <Stack.Screen options={ProductDetailScreenOptions} name="ProductDetailScreen"
                      component={ProductDetailScreen}/>
        <Stack.Screen options={{headerTitle: "Your Cart", headerTitleAlign: "center"}} name="CartScreen"
                      component={CartScreen}/>
        {/*<Stack.Screen options={{headerTitle: "Orders", headerTitleAlign: "center"}} name="OrdersScreen" component={OrdersScreen}/>*/}
    </Stack.Navigator>
)
