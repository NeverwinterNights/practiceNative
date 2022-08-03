import {CompositeScreenProps, NavigationProp, NavigatorScreenParams, useNavigation} from "@react-navigation/native";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {LogOutScreen} from "../screens/user/LogOutScreen";
import {DrawerNavigationProp, DrawerScreenProps} from "@react-navigation/drawer";
import {StackNavigationProp, StackScreenProps} from "@react-navigation/stack";


export type OrderNavigatorStackParamList = {
    OrdersScreen: undefined
}


export type UserNavigatorStackParamList = {
    UserProductScreen: undefined
    EditProductScreen: { productID: string } | undefined

}

export type AuthNavigatorStackParamList = {
    AuthScreen: undefined
    // RegisterScreen: undefined
}

export type LogOutNavigatorStackParamList = {
    LogOutScreen: undefined
    // RegisterScreen: undefined
}


export type ShopNavigatorStackParamList = {
    // ProductOverviewScreen: undefined
    ProductOverviewScreen: { count: number } | undefined
    ProductDetailScreen: { productID: string, productTitle: string }
    CartScreen: undefined
}


export type DrawerNavigatorStackParamList = {
    ShopNavigator: NavigatorScreenParams<ShopNavigatorStackParamList>
    OrdersNavigator: NavigatorScreenParams<OrderNavigatorStackParamList>
    UserNavigator: NavigatorScreenParams<UserNavigatorStackParamList>
}



// export type ProductOverviewScreenType =
//     CompositeScreenProps<
//         StackScreenProps<MainNavigatorStackParamList, 'DrawerNavigator'>,
//         CompositeScreenProps<
//             DrawerScreenProps<DrawerNavigatorStackParamList, 'ShopNavigator'>,
//             CompositeScreenProps<
//                 StackScreenProps<ShopNavigatorStackParamList, 'ProductOverviewScreen'>,
//                 NativeStackScreenProps<ShopNavigatorStackParamList, 'ProductOverviewScreen'>>
//             >>

export type MainNavigatorStackParamList = {
    DrawerNavigator: NavigatorScreenParams<DrawerNavigatorStackParamList>
    // AuthNavigator: NavigatorScreenParams<AuthNavigatorStackParamList>
}


export type ProductDetailScreenProps = NativeStackScreenProps<ShopNavigatorStackParamList, 'ProductDetailScreen'>;

// export type NavigationUseType = NavigationProp<ShopNavigatorStackParamList>
// export type NavigationUseType = NavigationProp<DrawerNavigatorStackParamList>

export type EditProductScreenProps = NativeStackScreenProps<UserNavigatorStackParamList, 'EditProductScreen'>;


// export const useAppNavigation = () => useNavigation<NavigationUseType>()
//export const useAppNavigation = () => useNavigation<NavigationProp<DrawerNavigatorStackParamList>>() // без
// авторизации
export const useAppNavigation = () => useNavigation<NavigationProp<MainNavigatorStackParamList>>()
// export const useAppNavigation = () => useNavigation<NavigationProp<AuthNavigatorStackParamList>>()


export type popType = NativeStackScreenProps<ShopNavigatorStackParamList, 'ProductOverviewScreen'>
