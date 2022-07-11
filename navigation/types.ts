import {NavigationProp, NavigatorScreenParams, useNavigation} from "@react-navigation/native";
import {NativeStackScreenProps} from "@react-navigation/native-stack";


export type ShopNavigatorStackParamList = {
    ProductOverviewScreen: undefined
    ProductDetailScreen: { productID: string, productTitle: string }
    CartScreen: undefined

}

export type OrderNavigatorStackParamList = {
    OrdersScreen: undefined
}


export type UserNavigatorStackParamList = {
    UserProductScreen: undefined
    EditProductScreen: { productID: string } | undefined

}


export type DrawerNavigatorStackParamList = {
    ShopNavigator: NavigatorScreenParams<ShopNavigatorStackParamList>
    OrdersNavigator: NavigatorScreenParams<OrderNavigatorStackParamList>
    UserNavigator: NavigatorScreenParams<UserNavigatorStackParamList>
}


export type ProductDetailScreenProps = NativeStackScreenProps<ShopNavigatorStackParamList, 'ProductDetailScreen'>;


// export type NavigationUseType = NavigationProp<ShopNavigatorStackParamList>
// export type NavigationUseType = NavigationProp<DrawerNavigatorStackParamList>



export type EditProductScreenProps = NativeStackScreenProps<UserNavigatorStackParamList, 'EditProductScreen'>;


// export const useAppNavigation = () => useNavigation<NavigationUseType>()
export const useAppNavigation = () => useNavigation<NavigationProp<DrawerNavigatorStackParamList>>()
