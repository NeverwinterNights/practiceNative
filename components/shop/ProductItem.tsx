import React from 'react';
import {Button, Image, Platform, StyleSheet, TouchableNativeFeedback, TouchableOpacity, View} from 'react-native';
import {AppText} from "../AppText";
import Colors from "../../constants/Colors";
import {ProductType} from "../../types/types";

type ProductItemPropsType = {
    item: ProductType
    onViewDetails: () => void
    onAddToCard: () => void
}

export const ProductItem = ({item, onViewDetails, onAddToCard}: ProductItemPropsType) => {
    let TouchableCustom: React.ElementType = TouchableOpacity

    if (Platform.OS === "android" && Platform.Version >= 21) {
        TouchableCustom = TouchableNativeFeedback
    }

    return (
        <TouchableCustom onPress={onViewDetails} useForeground>
            <View style={styles.container}>
                <View style={styles.imageContainer}>
                    <Image style={styles.image} source={{uri: item.imageUrl}}/>
                </View>
                <View style={styles.details}>
                    <AppText style={styles.title}>{item.title}</AppText>
                    <AppText style={styles.price}>${item.price.toFixed(2)}</AppText>
                </View>
                <View style={styles.buttonsContainer}>
                    <Button color={Colors.primary} title={"View Details"} onPress={onViewDetails}/>
                    <Button color={Colors.primary} title={"To Cart"} onPress={onAddToCard}/>
                </View>
            </View>
        </TouchableCustom>
    );
};

const styles = StyleSheet.create({
    container: {
        shadowColor: "black",
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.26,
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: Colors.white,
        height: 300,
        margin: 20,
        overflow: "hidden"
    },
    details: {
        alignItems: "center",
        height: "15%",
        padding: 8
    },
    buttonsContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        height: "25%",
        paddingHorizontal: 20
    },
    imageContainer: {
        width: "100%",
        height: "60%",
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        overflow: "hidden"
    },
    image: {
        width: "100%",
        height: "100%",
    },
    title: {
        fontFamily: "open-sans-bold",
        fontSize: 18,
    },
    price: {
        fontFamily: "open-sans",
        fontSize: 14,
        color: "#888"
    },

});
