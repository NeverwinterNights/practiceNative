import {createDrawerNavigator} from '@react-navigation/drawer';
import {DrawerNavigatorStackParamList} from "./types";
import {ShopNavigator} from "./ShopNavigator";
import {OrderNavigator} from "./OrdersNavigator";
import Colors from "../constants/Colors";
import {Platform} from 'react-native';
import React from 'react';
import {Ionicons} from "@expo/vector-icons";
import {UserNavigator} from "./UsersNavigator";


const Drawer = createDrawerNavigator<DrawerNavigatorStackParamList>();


export const DrawerNavigator = () => {
    return <Drawer.Navigator screenOptions={{
        drawerActiveTintColor: Colors.primary,
        headerShown: false
    }}>
        <Drawer.Screen options={{
            drawerLabel: "Shops", drawerIcon: (drawerConfig) =>
                <Ionicons name={Platform.OS === "android" ? "md-list" : "ios-list"} size={23}
                          color={drawerConfig.color}/>
        }} name={"ShopNavigator"} component={ShopNavigator}/>
        <Drawer.Screen options={{
            drawerLabel: "Orders", drawerIcon: (drawerConfig) =>
                <Ionicons name={Platform.OS === "android" ? "md-cart" : "ios-cart"} size={23}
                          color={drawerConfig.color}/>
        }} name={"OrdersNavigator"} component={OrderNavigator}/>
        <Drawer.Screen options={{
            drawerLabel: "Users", drawerIcon: (drawerConfig) =>
                <Ionicons name={Platform.OS === "android" ? "md-create" : "ios-create"} size={23}
                          color={drawerConfig.color}/>
        }} name={"UserNavigator"} component={UserNavigator}/>
    </Drawer.Navigator>
}
