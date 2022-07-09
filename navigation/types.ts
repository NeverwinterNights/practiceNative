import {NavigationProp, useNavigation} from "@react-navigation/native";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {ProductOverviewScreen} from "../screens/shop/ProductOverviewScreen";
import {CartScreen} from "../screens/shop/CartScreen";
import {OrdersScreen} from "../screens/shop/OrdersScreen";


export type ShopNavigatorStackParamList = {
    ProductOverviewScreen: undefined
    ProductDetailScreen: { productID: string, productTitle: string }
    CartScreen:undefined

}





export type ProductDetailScreenProps = NativeStackScreenProps<ShopNavigatorStackParamList, 'ProductDetailScreen'>;




export type NavigationUseType = NavigationProp<ShopNavigatorStackParamList>

export const useAppNavigation = () => useNavigation<NavigationUseType>()
