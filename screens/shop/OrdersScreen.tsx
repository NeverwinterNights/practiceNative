import React, {useLayoutEffect} from 'react';
import {FlatList, Platform, StyleSheet, View} from 'react-native';
import {useAppSelector} from "../../store/store";
import {AppText} from "../../components/AppText";
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import {CustomHeaderButton} from "../../components/UI/CustomHeaderButton";
import {DrawerActions} from "@react-navigation/native";
import {useAppNavigation} from "../../navigation/types";
import {OrderItem} from "../../components/shop/OrderItem";

type OrdersScreenPropsType = {}

export const OrdersScreen = ({}: OrdersScreenPropsType) => {
    const navigation = useAppNavigation()

    const orders = useAppSelector(state => state.ordersReducer.orders)

    console.log(orders.length);

    useLayoutEffect(() => {
        navigation.setOptions(
            {
                headerLeft: () => (
                    <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                        <Item title={"Menu"} iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
                              onPress={() => navigation.dispatch(DrawerActions.openDrawer())}/>
                    </HeaderButtons>
                )
            });
    }, [navigation]);

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
        flex:1,
        alignItems: "center",
        justifyContent: "center",
    }
});
