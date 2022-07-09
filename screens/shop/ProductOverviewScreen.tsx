import React, {useLayoutEffect} from 'react';
import {FlatList, Platform} from 'react-native';
import {useAppDispatch, useAppSelector} from "../../store/store";
import {ProductItem} from "../../components/shop/ProductItem";
import {useAppNavigation} from "../../navigation/types";
import {addToCartAC} from "../../store/cartReducer";
import {CustomHeaderButton} from "../../components/UI/CustomHeaderButton";
import {HeaderButtons, Item} from 'react-navigation-header-buttons';

type ProductOverviewScreenPropsType = {}


export const ProductOverviewScreen = ({}: ProductOverviewScreenPropsType) => {
    const navigation = useAppNavigation()
    const products = useAppSelector(state => state.productsReducer.availableProducts)
    const dispatch = useAppDispatch()


    useLayoutEffect(() => {
        navigation.setOptions(
            {
                headerRight: () => (
                    <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                        <Item title={"Cart"} iconName={Platform.OS==="android" ? "md-cart" : "ios-cart" } onPress={()=> navigation.navigate("CartScreen")}/>
                    </HeaderButtons>
                ),
            });
    }, [navigation]);




    return (
        <FlatList
            showsVerticalScrollIndicator={false}
            data={products}
            renderItem={({item}) => <ProductItem
                item={item}
                onViewDetails={() => navigation.navigate("ProductDetailScreen", {
                    productID: item.id,
                    productTitle: item.title
                })}
                onAddToCard={() => dispatch(addToCartAC({product: item}))}/>}
            keyExtractor={(item) => item.id}/>
    );
};

CustomHeaderButton
