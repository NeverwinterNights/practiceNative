import React, {useLayoutEffect} from 'react';
import {Keyboard, Platform, StyleSheet, View} from 'react-native';
import {useAppNavigation} from "../../navigation/types";
import {useAppDispatch} from "../../store/store";
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import {CustomHeaderButton} from "../UI/CustomHeaderButton";
import {FormikValues, useFormikContext} from "formik";
import {AppText} from "../AppText";
import {AppFormField} from "./AppFormField";
import {ProductType} from "../../types/types";
import {createProductAC, updateProductAC} from "../../store/productsReducer";


type FormScreenPropsType = {
    productID: string | undefined
    editedProducts: ProductType | undefined
}




export const FormScreen = ({productID, editedProducts}: FormScreenPropsType) => {

    const {
        setFieldTouched,
        resetForm,
        handleChange,
        handleSubmit,
        setFieldValue,
        values,
        touched,
        errors
    } = useFormikContext()

    const navigation = useAppNavigation()
    const dispatch = useAppDispatch()
    useLayoutEffect(() => {
        navigation.setOptions(
            {
                headerTitle: productID ? "Edit Product" : "Add Product",
                headerRight: () => (
                    <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                        <Item title={"Save"} iconName={Platform.OS === "android" ? "md-checkmark" : "ios-checkmark"}
                              onPress={subForm}/>
                        {/*onPress={submit}/>*/}
                    </HeaderButtons>
                )
            });
    }, [navigation, dispatch, productID]);




    const subForm = () => {
        handleSubmit()
    }


    return (
        <View style={styles.container}>

            <View style={styles.form}>
                <AppText style={styles.label}>Title</AppText>
                <AppFormField
                    name={"title"}
                    autoCapitalize={"sentences"}
                    autoCorrect={false}
                    keyboardType={"default"}
                    style={styles.input}
                    editedProducts={editedProducts}

                />
            </View>
            <View style={styles.form}>
                <AppText style={styles.label}>Image</AppText>
                <AppFormField
                    name={"imageUrl"}
                    style={styles.input}
                    editedProducts={editedProducts}
                />
            </View>
            {editedProducts ?
                null :
                <View style={styles.form}>
                    <AppText style={styles.label}>Price</AppText>
                    <AppFormField
                        name={"price"}
                        style={styles.input}
                        keyboardType={"decimal-pad"}
                    />
                </View>}
            <View style={styles.form}>
                <AppText style={styles.label}>Description</AppText>
                <AppFormField
                    name={"description"}
                    style={styles.input}
                    editedProducts={editedProducts}
                    multiline
                    numberOfLines={3}
                />
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20
    },


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

