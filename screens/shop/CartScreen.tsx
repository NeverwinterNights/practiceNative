import React from 'react';
import {Button, FlatList, StyleSheet, View} from 'react-native';
import {AppText} from "../../components/AppText";
import {useAppDispatch, useAppSelector} from "../../store/store";
import Colors from "../../constants/Colors";
import {ModifiedCartItems} from "../../types/types";
import {ItemCart} from "../../components/shop/ItemCart";
import {removeFromCartAC} from "../../store/cartReducer";
import {addOrderAC} from "../../store/ordersReducer";

type CartScreenPropsType = {}

export const CartScreen = ({}: CartScreenPropsType) => {
    const total = useAppSelector(state => state.cartReducer.totalAmount)
    const cartItems = useAppSelector(state => state.cartReducer.items)
    const dispatch = useAppDispatch()

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

    return (
        <View style={styles.container}>
            <View style={styles.summary}>
                <AppText style={styles.summaryText}>Total: <AppText style={styles.amount}>${total.toFixed(2)}</AppText></AppText>
                <Button onPress={()=> dispatch(addOrderAC({cartItem: modifiedCartItems, totalAmount: total}))} color={Colors.accent} title={"Order Now"} disabled={modifiedCartItems.length === 0}/>
            </View>
            {/*<FlatList data={} renderItem={}/>*/}
            <View>
                <FlatList data={modifiedCartItems} keyExtractor={(item) => item.productId} renderItem={({item}) =>
                    <ItemCart item={item} onRemove={() => onRemove(item.productId)}/>
                }/>
            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        margin: 20,

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
        shadowColor: "black",
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.26,
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: Colors.white
    },
});
