import React, {useCallback, useLayoutEffect, useState} from 'react';
import {Alert, Keyboard, Platform, ScrollView, StyleSheet, TextInput, View} from 'react-native';
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
    const [isTitleValid, setIsTitleValid] = useState(false);


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
        // }, [navigation, dispatch, productID, title, description, imageUrl, isTitleValid, price]);
    }, [navigation, dispatch, productID, title, description, imageUrl, isTitleValid, price]);

    const submit = useCallback(() => {
        if (!isTitleValid) {
            Alert.alert("Enter valid title", "", [
                {text: "Okay"}
            ])
            return
        }
        if (editedProducts) {
            productID && dispatch(updateProductAC({id: productID, title, description, imageUrl}))
        } else {
            dispatch(createProductAC({title, description, imageUrl, price: Number(price)}))
        }
        Keyboard.dismiss()
        navigation.goBack()
    }, [dispatch, productID, title, description, imageUrl, isTitleValid, price])


    const inputHandler = (text: string) => {

        if (text.trim().length === 0) {
            setIsTitleValid(false)

        } else {
            setIsTitleValid(true)
        }
        setTitle(text)


    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.main}>
                <View style={styles.form}>
                    <AppText style={styles.label}>Title</AppText>
                    <TextInput autoCapitalize={"sentences"} autoCorrect={false} keyboardType={"default"} value={title}
                               onChangeText={title => inputHandler(title)} style={styles.input}/>
                </View>
                <View style={styles.form}>
                    <AppText style={styles.label}>Image</AppText>
                    <TextInput value={imageUrl} onChangeText={imageURL => inputHandler(imageURL)}
                               style={styles.input}/>
                </View>
                {editedProducts ?
                    null :
                    <View style={styles.form}>
                        <AppText style={styles.label}>Price</AppText>
                        <TextInput keyboardType={"decimal-pad"} value={price}
                                   onChangeText={price => inputHandler(price)}
                                   style={styles.input}/>
                    </View>}
                <View style={styles.form}>
                    <AppText style={styles.label}>Description</AppText>
                    <TextInput value={description}
                               onChangeText={description => inputHandler(description)}
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
