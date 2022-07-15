import React from 'react';
import {ActivityIndicator, Button, FlatList, StyleSheet, View} from 'react-native';
import {AppText} from "../../components/AppText";
import {useAppDispatch, useAppSelector} from "../../store/store";
import Colors from "../../constants/Colors";
import {ModifiedCartItems} from "../../types/types";
import {ItemCart} from "../../components/shop/ItemCart";
import {removeFromCartAC} from "../../store/cartReducer";
import {addOrderAC, createOrderTC} from "../../store/ordersReducer";
import {CardWrapper} from "../../components/UI/CardWrapper";

type CartScreenPropsType = {}

export const CartScreen = ({}: CartScreenPropsType) => {
    const total = useAppSelector(state => state.cartReducer.totalAmount)
    const cartItems = useAppSelector(state => state.cartReducer.items)
    const dispatch = useAppDispatch()
    const isLoading = useAppSelector(state => state.appReducer.isLoading)



    const modifiedCartItems: ModifiedCartItems[] = [] as ModifiedCartItems[]
    for (const key in cartItems) {
        modifiedCartItems.push({
            productId: key,
            title: cartItems[key].title,
            price: cartItems[key].price,
            quantity: cartItems[key].quantity,
            sum: cartItems[key].sum
        })
    }

    const onRemove = (id: string) => {
        dispatch(removeFromCartAC({id}))
    }

    if (isLoading) {
        return <View style={styles.centered}>
            <ActivityIndicator size={"large"} color={Colors.primary}/>
        </View>
    }


    return (
        <View style={styles.container}>
            <CardWrapper style={styles.summary}>
                <AppText style={styles.summaryText}>Total: <AppText style={styles.amount}>${Math.abs(total).toFixed(2)}</AppText></AppText>
                <Button onPress={()=> dispatch(createOrderTC({cartItem: modifiedCartItems, totalAmount: total}))} color={Colors.accent} title={"Order Now"} disabled={modifiedCartItems.length === 0}/>
            </CardWrapper>
            <View>
                <FlatList data={modifiedCartItems} keyExtractor={(item) => item.productId} renderItem={({item}) =>
                    <ItemCart deletable item={item} onRemove={() => onRemove(item.productId)}/>
                }/>
            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        margin: 20,
    },
    centered: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    amount: {
        color: Colors.primary
    },
    summaryText: {
        fontFamily: "open-sans-bold",
        fontSize: 18,
    },
    summary: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 20,
        padding: 10,
    },
});
