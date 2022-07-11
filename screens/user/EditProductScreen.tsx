import React, {useCallback, useLayoutEffect, useState} from 'react';
import {Keyboard, Platform, ScrollView, StyleSheet, TextInput, View} from 'react-native';
import {EditProductScreenProps, useAppNavigation} from "../../navigation/types";
import {AppText} from "../../components/AppText";
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import {CustomHeaderButton} from '../../components/UI/CustomHeaderButton';
import {useAppDispatch, useAppSelector} from "../../store/store";
import {createProductAC, updateProductAC} from "../../store/productsReducer";


export const EditProductScreen = ({route}: EditProductScreenProps) => {
    const productID = route.params?.productID
    const editedProducts = useAppSelector(state => state.productsReducer.userProducts.find((product) => product.id === productID))

    const navigation = useAppNavigation()
    const dispatch = useAppDispatch()

    const [title, setTitle] = useState(editedProducts ? editedProducts.title : "");
    const [imageUrl, setImageURL] = useState(editedProducts ? editedProducts.imageUrl : "");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState(editedProducts ? editedProducts.description : "");


    useLayoutEffect(() => {

        navigation.setOptions(
            {
                headerTitle: productID ? "Edit Product" : "Add Product",
                headerRight: () => (
                    <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                        <Item title={"Save"} iconName={Platform.OS === "android" ? "md-checkmark" : "ios-checkmark"}
                              onPress={submit}/>
                    </HeaderButtons>
                )
            });
    }, [navigation, dispatch, productID, title, description, imageUrl, price]);


    const submit = useCallback(() => {
        if (editedProducts) {
            productID && dispatch(updateProductAC({id: productID, title, description, imageUrl}))
        } else {
            dispatch(createProductAC({title, description, imageUrl, price: Number(price)}))
        }
        Keyboard.dismiss()
        navigation.goBack()
    }, [dispatch, productID, title, description, imageUrl, price])


    return (
        <ScrollView style={styles.container}>
            <View style={styles.main}>
                <View style={styles.form}>
                    <AppText style={styles.label}>Title</AppText>
                    <TextInput value={title} onChangeText={title => setTitle(title)} style={styles.input}/>
                </View>
                <View style={styles.form}>
                    <AppText style={styles.label}>Image</AppText>
                    <TextInput value={imageUrl} onChangeText={imageURL => setImageURL(imageURL)} style={styles.input}/>
                </View>
                {editedProducts ? null : <View style={styles.form}>
                    <AppText style={styles.label}>Price</AppText>
                    <TextInput value={price} onChangeText={price => setPrice(price)} style={styles.input}/>
                </View>}
                <View style={styles.form}>
                    <AppText style={styles.label}>Description</AppText>
                    <TextInput value={description} onChangeText={description => setDescription(description)}
                               style={styles.input}/>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {},
    main: {
        margin: 20
    },
    input: {
        paddingHorizontal: 2,
        paddingVertical: 5,
        borderBottomColor: "#ccc",
        borderBottomWidth: 1,
    },
    label: {
        fontFamily: "open-sans-bold",
        marginVertical: 8
    },
    form: {
        width: "100%",
    },
});
