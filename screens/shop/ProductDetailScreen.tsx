import React, {useLayoutEffect} from 'react';
import {Button, Image, Platform, ScrollView, StyleSheet, Text, View} from 'react-native';
import {AppText} from "../../components/AppText";
import {ProductDetailScreenProps, useAppNavigation} from "../../navigation/types";
import {useAppDispatch, useAppSelector} from "../../store/store";
import {ProductType} from "../../types/types";
import Colors from "../../constants/Colors";
import {addToCartAC} from "../../store/cartReducer";
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import {CustomHeaderButton} from "../../components/UI/CustomHeaderButton";
import {DrawerActions} from "@react-navigation/native";


export const ProductDetailScreenOptions = ({navigation, route }: any) => {
    return {
        headerTitle: route.params.productTitle,
        headerTitleAlign: "center" as const,
    }
}



export const ProductDetailScreen = ({route}: ProductDetailScreenProps) => {
    const {productID, productTitle} = route.params
    const navigation = useAppNavigation()
    const dispatch = useAppDispatch()

    const selectedProduct: ProductType | undefined = useAppSelector(state => state.productsReducer.availableProducts.find((product) => product.id === productID))


    // useLayoutEffect(() => {
    //     navigation.setOptions({
    //         headerTitle: productTitle,
    //     });
    // }, [navigation]);


    return (
        <ScrollView>
            <Image style={styles.image} source={{uri: selectedProduct && selectedProduct.imageUrl}}/>
            <View style={styles.actions}>
                <Button color={Colors.primary} title={"Add to Cart"}
                        onPress={() => dispatch(addToCartAC({product: selectedProduct as ProductType}))}/>
            </View>
            <AppText style={styles.price}>${selectedProduct && selectedProduct.price.toFixed(2)}</AppText>
            <AppText style={styles.description}>{selectedProduct && selectedProduct.description}</AppText>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    description: {
        fontSize: 14,
        textAlign: "center",
        marginHorizontal: 20,
        fontFamily: "open-sans",
    },
    price: {
        fontSize: 20,
        color: "#888",
        textAlign: "center",
        marginVertical: 20,
        fontFamily: "open-sans-bold",
    },
    image: {
        width: "100%",
        height: 250,
    },
    actions: {
        marginVertical: 10,
        alignItems: "center",
    }
});
