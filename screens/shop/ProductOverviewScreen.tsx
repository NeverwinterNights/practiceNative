import React, {useEffect, useLayoutEffect, useState} from 'react';
import {Button, FlatList, Platform, StyleSheet, Text, View} from 'react-native';
import {useAppDispatch, useAppSelector} from "../../store/store";
import {ProductItem} from "../../components/shop/ProductItem";
import {useAppNavigation} from "../../navigation/types";
import {addToCartAC} from "../../store/cartReducer";
import {CustomHeaderButton} from "../../components/UI/CustomHeaderButton";
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import {DrawerActions} from "@react-navigation/native";
import Colors from '../../constants/Colors';

type ProductOverviewScreenPropsType = {}


export const ProductOverviewScreen = ({}: ProductOverviewScreenPropsType) => {
    const navigation = useAppNavigation()
    const products = useAppSelector(state => state.productsReducer.availableProducts)
    const dispatch = useAppDispatch()

    const [count, setCount] = useState(0);

    const productsInCart = useAppSelector(state => state.cartReducer.items)


    let quantityProductsInCart: number = 0

    useEffect(() => {
        for (const key in productsInCart) {
            quantityProductsInCart = quantityProductsInCart + productsInCart[key].quantity
            setCount(quantityProductsInCart)
        }
        if (Object.keys(productsInCart).length==0) {
            setCount(0)
        }
    }, [productsInCart])



    useLayoutEffect(() => {
        navigation.setOptions(
            {
                headerRight: () => (
                    <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                        <Item title={"Cart"} iconName={Platform.OS === "android" ? "md-cart" : "ios-cart"}
                              onPress={() => navigation.navigate('ShopNavigator', {screen: 'CartScreen'})}/>
                        {/*<Item style={{left:10}} title={"Cart"} iconName={Platform.OS === "android" ? "md-cart" : "ios-cart"}><AppText>3</AppText></Item>*/}
                        {count > 0 && <View style={styles.badge}><Text style={styles.text}>{count}</Text></View>}
                    </HeaderButtons>
                ),
                headerLeft: () => (
                    <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                        <Item title={"Menu"} iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
                              onPress={() => navigation.dispatch(DrawerActions.openDrawer())}/>
                    </HeaderButtons>
                )
            });
    }, [navigation, count]);


    const selectItemHandler = (id: string, title: string) => {
        navigation.navigate('ShopNavigator', {
            screen: 'ProductDetailScreen', params: {
                productID: id,
                productTitle: title
            }
        })
    }


    return (
        <FlatList
            showsVerticalScrollIndicator={false}
            data={products}
            renderItem={({item}) => <ProductItem
                item={item}
                onSelect={() => {
                    selectItemHandler(item.id, item.title)
                }}
            >
                <Button color={Colors.primary} title={"View Details"} onPress={() => {
                    selectItemHandler(item.id, item.title)
                }}/>
                <Button color={Colors.primary} title={"To Cart"}
                        onPress={() => dispatch(addToCartAC({product: item}))}/>

            </ProductItem>
            }
            keyExtractor={(item) => item.id}/>
    );
};

const styles = StyleSheet.create({
    badge: {
        width: 17,
        height: 17,
        borderRadius: 17 / 2,
        // backgroundColor: "green",
        position: "absolute",
        bottom: 15,
        right: 0,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: Colors.white,

    },
    text: {
        color: Colors.white,
        fontSize: 10

    }
});
