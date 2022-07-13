import React from 'react';
import {Keyboard, StyleSheet, View} from 'react-native';
import {AppForm} from "../../components/form/AppForm";
import * as Yup from "yup";
import {useAppDispatch, useAppSelector} from "../../store/store";
import {EditProductScreenProps, useAppNavigation} from "../../navigation/types";
import {FormScreen} from "../../components/form/FormScreen";
import {FormikHelpers, FormikValues} from "formik";
import {
    createProductAC,
    createProductTC,
    fetchProductTC,
    updateProductAC,
    updateProductTC
} from "../../store/productsReducer";


const validationSchema = Yup.object().shape({
    title: Yup.string().required().min(1).label("Title"),
    imageUrl: Yup.string().required().min(1).max(10000).label("ImageUrl"),
    description: Yup.string().required().label("Description"),
    price: Yup.number().required().label("Price"),

});


export const EditProductScreen = ({route}: EditProductScreenProps) => {
        const dispatch = useAppDispatch()
        const productID = route.params?.productID
        const editedProducts = useAppSelector(state => state.productsReducer.userProducts.filter((product) => product.id === productID)[0])
        const navigation = useAppNavigation()


        const submit = (values: FormikValues, {resetForm}: FormikHelpers<any>) => {
            if (editedProducts) {
                productID && dispatch(updateProductTC({
                    id: productID,
                    title: values.title,
                    description: values.description,
                    imageUrl: values.imageUrl
                }))
                productID && dispatch(updateProductAC({
                    id: productID,
                    title: values.title,
                    description: values.description,
                    imageUrl: values.imageUrl
                }))
            } else {
                dispatch(createProductTC({
                    title: values.title,
                    description: values.description,
                    imageUrl: values.imageUrl,
                    price: Number(values.price)
                }))
                dispatch(createProductAC({
                    title: values.title,
                    description: values.description,
                    imageUrl: values.imageUrl,
                    price: Number(values.price)
                }))
            }
            Keyboard.dismiss()
            navigation.goBack()
            resetForm()
        }


        return (
            <View style={styles.container}>
                <AppForm validationSchema={validationSchema}
                         initialValues={{
                             title: editedProducts ? editedProducts.title : "",
                             imageUrl: editedProducts ? editedProducts.imageUrl : "",
                             price: editedProducts ? editedProducts.price : "",
                             description: editedProducts ? editedProducts.description : ""
                         }} onSubmit={submit}>
                    <FormScreen editedProducts={editedProducts} productID={productID}/>
                </AppForm>
            </View>
        );
    }
;

const styles = StyleSheet.create({
    container: {},

});


