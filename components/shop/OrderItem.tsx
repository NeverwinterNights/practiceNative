import React, {useState} from 'react';
import {Button, StyleSheet, View} from 'react-native';
import {AppText} from "../AppText";
import Colors from "../../constants/Colors";
import {ItemCart} from "./ItemCart";
import {ModifiedCartItems} from "../../types/types";
import {CardWrapper} from "../UI/CardWrapper";

type OrderItemPropsType = {
    amount: number
    date: string
    items: ModifiedCartItems[]
}

export const OrderItem = ({amount, date, items}: OrderItemPropsType) => {
    const [showDetails, setShowDetails] = useState(false);


    return (
        <CardWrapper style={styles.container}>
            <View style={styles.summary}>
                <AppText style={styles.amount}>${amount.toFixed(2)}</AppText>
                <AppText style={styles.date}>{date}</AppText>
            </View>
            <Button color={Colors.primary} title={showDetails ? "Hide Details" :"Show Details"} onPress={() => {
                setShowDetails((prevState) => !prevState)
            }}/>
            {showDetails &&
            <View style={styles.detailsOrder}>
                {items.map((item)=> <ItemCart key={item.productId} item={item}/>)}
            </View>
            }
        </CardWrapper>
    );
};

const styles = StyleSheet.create({
    container: {
        margin: 20,
        padding: 10,
        alignItems: "center"
    },
    detailsOrder:{
        width:"100%",
    },
    date: {
        fontFamily: "open-sans",
        fontSize: 16,
        color: "#888"
    },
    amount: {
        fontFamily: "open-sans-bold",
        fontSize: 16,
    },
    summary: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        marginBottom: 10
    },
});
