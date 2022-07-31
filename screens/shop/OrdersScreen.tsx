import React, {useEffect} from 'react';
import {ActivityIndicator, FlatList, Platform, StyleSheet, View} from 'react-native';
import {useAppDispatch, useAppSelector} from "../../store/store";
import {AppText} from "../../components/AppText";
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import {CustomHeaderButton} from "../../components/UI/CustomHeaderButton";
import {DrawerActions} from "@react-navigation/native";
import {useAppNavigation} from "../../navigation/types";
import {OrderItem} from "../../components/shop/OrderItem";
import {setOrdersTC} from "../../store/ordersReducer";
import Colors from "../../constants/Colors";

type OrdersScreenPropsType = {}


export const OrdersScreenOptions = ({navigation}: any) => {
    return {
        headerTitle: "Your Orders",
        headerTitleAlign: "center" as const,
        headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item title={"Menu"} iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
                      onPress={() => navigation.dispatch(DrawerActions.openDrawer())}/>
            </HeaderButtons>
        )
    }
}

export const OrdersScreen = ({}: OrdersScreenPropsType) => {
    const navigation = useAppNavigation()
    const dispatch = useAppDispatch()
    const isLoading = useAppSelector(state => state.appReducer.isLoading)

    const orders = useAppSelector(state => state.ordersReducer.orders)

    // useLayoutEffect(() => {
    //     navigation.setOptions(
    //         {
    //             headerLeft: () => (
    //                 <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
    //                     <Item title={"Menu"} iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
    //                           onPress={() => navigation.dispatch(DrawerActions.openDrawer())}/>
    //                 </HeaderButtons>
    //             )
    //         });
    // }, [navigation]);

    useEffect(() => {
        dispatch(setOrdersTC())
    }, [])


    if (isLoading) {
        return <View style={styles.centered}>
            <ActivityIndicator size={"large"} color={Colors.primary}/>
        </View>
    }

    return (
        <>
            {orders.length > 0 ?
                <FlatList
                    data={orders}
                    keyExtractor={(item) => item.id}
                    renderItem={({item}) => <OrderItem items={item.items} amount={item.totalAmount}
                                                       date={item.correctDate}/>}/>
                : <View style={styles.container}><AppText>No Orders Found</AppText></View>
            }
        </>
    )

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    centered: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    }
});
