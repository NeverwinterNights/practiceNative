import {createDrawerNavigator, DrawerContentScrollView, DrawerItemList} from '@react-navigation/drawer';
import {DrawerNavigatorStackParamList} from "./types";
import {ShopNavigator} from "./ShopNavigator";
import {OrderNavigator} from "./OrdersNavigator";
import Colors from "../constants/Colors";
import {Platform, Pressable, View} from 'react-native';
import React from 'react';
import {Ionicons} from "@expo/vector-icons";
import {UserNavigator} from "./UsersNavigator";
import {LogOutNavigator} from "./LogOutNavigator";
import {AppText} from "../components/AppText";


const Drawer = createDrawerNavigator<DrawerNavigatorStackParamList>();


function CustomDrawerContent(props:any) {
    return (
    <View>
        <Pressable>
            <AppText>Log Out</AppText>
        </Pressable>
    </View>
    );
}


export const DrawerNavigator = () => {
    return <Drawer.Navigator screenOptions={{
        drawerActiveTintColor: Colors.primary,
        headerShown: false,

    }} drawerContent={(props)=> <CustomDrawerContent/>}>
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
        <Drawer.Screen options={{
            drawerLabel: "Log Out", drawerIcon: (drawerConfig) =>
                <Ionicons name={Platform.OS === "android" ? "log-out" : "log-out"} size={23}
                          color={drawerConfig.color}/>
        }} name={"LogOutNavigator"} component={LogOutNavigator}/>


    </Drawer.Navigator>
}
