import React, {useCallback, useEffect, useState} from 'react';
import {ActivityIndicator, Button, FlatList, Platform, StyleSheet, Text, View} from 'react-native';
import {useAppDispatch, useAppSelector} from "../../store/store";
import {ProductItem} from "../../components/shop/ProductItem";
import {MainNavigatorStackParamList, useAppNavigation} from "../../navigation/types";
import {addToCartAC} from "../../store/cartReducer";
import {CustomHeaderButton} from "../../components/UI/CustomHeaderButton";
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import {DrawerActions} from "@react-navigation/native";
import Colors from '../../constants/Colors';
import {fetchProductTC} from "../../store/productsReducer";
import {AppText} from "../../components/AppText";
import {DrawerNavigationProp} from "@react-navigation/drawer";


type PropsType = {
    navigation: DrawerNavigationProp<MainNavigatorStackParamList>
}

export const ProductOverviewScreenOptions = ({navigation, route}: any) => {
    const count = route.params && route.params.count ? route.params.count : null;



    console.log("route", route);
    // const {count} = route.params

    const quantity = useAppSelector(state => state.cartReducer.quantity)
    return {
        headerTitle: "All Products",
        headerTitleAlign: "center" as const,
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item title={"Cart"} iconName={Platform.OS === "android" ? "md-cart" : "ios-cart"}
                      onPress={() => navigation.navigate("DrawerNavigator", {
                          screen: 'ShopNavigator',
                          params: {screen: 'CartScreen'}
                      })}/>

                {count && <View style={styles.badge}><Text style={styles.text}>{count}</Text></View>}
                {/*<View style={styles.badge}><Text style={styles.text}>{count}</Text></View>*/}

            </HeaderButtons>
        ),
        headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item title={"Menu"} iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
                      onPress={() => navigation.dispatch(DrawerActions.openDrawer())}/>
            </HeaderButtons>
        )
    }
}


export const ProductOverviewScreen = ({route}: any) => {
    const navigation = useAppNavigation()
    const products = useAppSelector(state => state.productsReducer.availableProducts)
    const dispatch = useAppDispatch()
    const quantity = useAppSelector(state => state.cartReducer.quantity)


    const [count, setCount] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [isrRefreshing, setIsRefreshing] = useState(false);

    const productsInCart = useAppSelector(state => state.cartReducer.items)
    let quantityProductsInCart: number = 0


    useEffect(() => {
        const loadingProducts = async () => {
            setIsLoading(true)
            await dispatch(fetchProductTC())
            setIsLoading(false)
        }
        loadingProducts()
    }, [])

    const loadProducts = useCallback(async () => {
        // setIsLoading(true);
        setIsRefreshing(true);
        try {
            await dispatch(fetchProductTC());
        } catch (err) {

        }
        setIsRefreshing(false);
        // setIsLoading(false);
    }, [dispatch, setIsLoading]);


    useEffect(() => {
        navigation.addListener("focus", loadProducts)
        return () => {
            navigation.removeListener("focus", loadProducts)
        }
    }, [loadProducts])

    useEffect(() => {
        for (const key in productsInCart) {
            quantityProductsInCart = quantityProductsInCart + productsInCart[key].quantity
            // dispatch(changeQuantityAC({value: quantityProductsInCart}))
            setCount(quantityProductsInCart)
            // route.params.count = quantityProductsInCart ? quantityProductsInCart : null
        }
        if (Object.keys(productsInCart).length == 0) {
            // dispatch(changeQuantityAC({value: null}))

            setCount(0)
            // route.params.count = 0
        }
    }, [productsInCart])


    useEffect(() => {

            navigation.navigate("DrawerNavigator", {
                screen: 'ShopNavigator',
                params: {screen: 'ProductOverviewScreen', params: {count: count}}
            })

    }, [count]);


    // useLayoutEffect(() => {
    //     navigation.setOptions(
    //         {
    //             headerTitle: "All Products",
    //             headerTitleAlign: "center",
    //             headerRight: () => (
    //                 <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
    //                     <Item title={"Cart"} iconName={Platform.OS === "android" ? "md-cart" : "ios-cart"}
    //                           onPress={() => navigation.navigate("DrawerNavigator", {
    //                               screen: 'ShopNavigator',
    //                               params: {screen: 'CartScreen'}
    //                           })}/>
    //                     {count > 0 && <View style={styles.badge}><Text style={styles.text}>{count}</Text></View>}
    //                 </HeaderButtons>
    //             ),
    //             headerLeft: () => (
    //                 <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
    //                     <Item title={"Menu"} iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
    //                           onPress={() => navigation.dispatch(DrawerActions.openDrawer())}/>
    //                 </HeaderButtons>
    //             )
    //         });
    // }, [navigation, count]);


    const selectItemHandler = (id: string, title: string) => {
        navigation.navigate("DrawerNavigator", {
            screen: 'ShopNavigator', params: {
                screen: 'ProductDetailScreen', params: {
                    productID: id,
                    productTitle: title
                }
            }
        })
    }

    if (isLoading) {
        return <View style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
        }}>
            <ActivityIndicator size={"large"} color={Colors.primary}/>
        </View>
    }

    if (!isLoading && products.length === 0) {
        return <View style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
        }}>
            <AppText>No products!</AppText>
        </View>
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
            keyExtractor={(item) => item.id}
            onRefresh={loadProducts}
            refreshing={isrRefreshing}
        />
    );
};

const styles = StyleSheet.create({
    badge: {
        width: 17,
        height: 17,
        borderRadius: 17 / 2,
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
