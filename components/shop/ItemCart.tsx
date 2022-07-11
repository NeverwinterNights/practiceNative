import React from 'react';
import {Platform, StyleSheet, TouchableOpacity, View} from 'react-native';
import {AppText} from "../AppText";
import Ionicons from '@expo/vector-icons/Ionicons';
import Colors from "../../constants/Colors";
import {ModifiedCartItems} from "../../types/types";

type ItemCartPropsType = {
    onRemove?: () => void
    item: ModifiedCartItems
    deletable?: boolean
}

export const ItemCart = ({onRemove, item, deletable}: ItemCartPropsType) => {
    return (
        <View style={styles.container}>
            <AppText style={styles.itemDate}>
                <AppText style={styles.quantity}>{item.quantity} </AppText>
                <AppText style={styles.title}>{item.title}</AppText>
            </AppText>
            <View style={styles.itemDate}>
                <AppText style={styles.title}>${item.sum.toFixed(2)}</AppText>
                {deletable &&
                <TouchableOpacity onPress={onRemove} style={styles.deleteButton}>
                    <Ionicons name={Platform.OS === "android" ? "md-trash" : "ios-trash"} size={23} color={"red"}/>
                </TouchableOpacity>
                }
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: Colors.white,
        flexDirection: "row",
        justifyContent: "space-between",
        marginHorizontal: 20
    },
    deleteButton: {},
    itemDate: {
        flexDirection: "row",
        alignItems: "center"

    },
    quantity: {
        fontFamily: "open-sans",
        color: "#888",
        fontSize: 16
    },
    title: {
        fontFamily: "open-sans-bold",
        fontSize: 16,
    },
});
