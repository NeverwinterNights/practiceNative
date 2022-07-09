import React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {useAppSelector} from "../../store/store";
import {AppText} from "../../components/AppText";

type OrdersScreenPropsType = {
    
}

export const OrdersScreen = ({}:OrdersScreenPropsType) => {

    const orders = useAppSelector(state => state.ordersReducer.orders)



    return (
    <FlatList
        data={orders}
        keyExtractor={(item)=> item.id}
        renderItem={({item})=> <AppText>{item.totalAmount}</AppText>} />
    );
};

const styles = StyleSheet.create({
  container: {
  
  }
});
