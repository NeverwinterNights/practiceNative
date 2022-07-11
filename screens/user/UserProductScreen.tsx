import React, {useLayoutEffect} from 'react';
import {Alert, Button, FlatList, Platform} from 'react-native';
import {useAppDispatch, useAppSelector} from "../../store/store";
import {ProductItem} from "../../components/shop/ProductItem";
import {useAppNavigation} from "../../navigation/types";
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import {CustomHeaderButton} from "../../components/UI/CustomHeaderButton";
import {DrawerActions} from "@react-navigation/native";
import Colors from "../../constants/Colors";
import {deleteProductAC} from "../../store/productsReducer";

type UserProductScreenPropsType = {}


export const UserProductScreen = ({}: UserProductScreenPropsType) => {


    const userProducts = useAppSelector(state => state.productsReducer.userProducts)
    const navigation = useAppNavigation()
    const dispatch = useAppDispatch()

    useLayoutEffect(() => {
        navigation.setOptions(
            {
                headerLeft: () => (
                    <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                        <Item title={"Menu"} iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
                              onPress={() => navigation.dispatch(DrawerActions.openDrawer())}/>
                    </HeaderButtons>
                ),
                headerRight: () => (
                    <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                        <Item title={"Add"} iconName={Platform.OS === "android" ? "md-create" : "ios-create"}
                              onPress={() => navigation.navigate("UserNavigator", {screen:"EditProductScreen"})}/>
                    </HeaderButtons>
                )
            });
    }, [navigation]);



    const deleteHandler = (id:string) => {
        Alert.alert("Are you sure", "Do you wanna delete this item", [
            {text:"No", style:"default"},
            {text:"Yes", style:"destructive", onPress: ()=> dispatch(deleteProductAC(id))}

        ])
    }


    const editProductScreen = (id: string) => {
        navigation.navigate("UserNavigator", {screen:"EditProductScreen", params:{productID: id}})
    }

    return (
        <FlatList data={userProducts} keyExtractor={(item) => item.id} renderItem={({item}) =>
            <ProductItem
                item={item}
                onSelect={() => {
                    editProductScreen(item.id)
                }}>
                <Button color={Colors.primary} title={"Edit"} onPress={() => {
                    editProductScreen(item.id)
                }}/>
                <Button color={Colors.primary} title={"Delete"} onPress={() => deleteHandler(item.id)}/>
            </ProductItem>
        }/>
    );
};

