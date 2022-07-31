import {
    createDrawerNavigator,
    DrawerContentComponentProps,
    DrawerContentScrollView,
    DrawerItemList
} from '@react-navigation/drawer';
import {DrawerNavigatorStackParamList} from "./types";
import {ShopNavigator} from "./ShopNavigator";
import {OrderNavigator} from "./OrdersNavigator";
import Colors from "../constants/Colors";
import {Platform, Pressable, View} from 'react-native';
import React from 'react';
import {Ionicons} from "@expo/vector-icons";
import {UserNavigator} from "./UsersNavigator";
import {AppText} from "../components/AppText";
import {useAuth2} from "../hooks/useAuth";


const Drawer = createDrawerNavigator<DrawerNavigatorStackParamList>();


function CustomDrawerContent(props: DrawerContentComponentProps) {
    const {logout} = useAuth2()

    return (
        <View style={{flex: 1}}>
            <DrawerContentScrollView>
                <DrawerContentScrollView {...props}>
                    <DrawerItemList {...props} />
                </DrawerContentScrollView>
            </DrawerContentScrollView>
            <View>
                <Pressable style={{
                    flexDirection: "row", alignItems: "center",
                    justifyContent: "center", marginVertical: 20
                }} onPress={() => logout()}>
                    <Ionicons color={"grey"} style={{marginRight: 10}} size={20} name={"log-out"}/>
                    <AppText style={{fontFamily: "open-sans-bold"}}>Log Out</AppText>
                </Pressable>
            </View>

        </View>
    );
}


export const DrawerNavigator = () => {
    return <Drawer.Navigator screenOptions={{
        drawerActiveTintColor: Colors.primary,
        headerShown: false,

    }} drawerContent={(props) => <CustomDrawerContent {...props}/>}>
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
