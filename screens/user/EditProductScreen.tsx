import React from 'react';
import {ActivityIndicator, Alert, Keyboard, StyleSheet, View} from 'react-native';
import {AppForm} from "../../components/form/AppForm";
import * as Yup from "yup";
import {useAppDispatch, useAppSelector} from "../../store/store";
import {EditProductScreenProps, useAppNavigation} from "../../navigation/types";
import {FormScreen} from "../../components/form/FormScreen";
import {FormikHelpers, FormikValues} from "formik";
import {createProductAC, createProductTC, updateProductTC} from "../../store/productsReducer";
import Colors from "../../constants/Colors";


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

        const error = useAppSelector(state => state.appReducer.error)
        const isLoading = useAppSelector(state => state.appReducer.isLoading)


        const submit = async (values: FormikValues, {resetForm}: FormikHelpers<any>) => {

            if (editedProducts) {
                productID && await dispatch(updateProductTC({
                    id: productID,
                    title: values.title,
                    description: values.description,
                    imageUrl: values.imageUrl
                }))
            } else {
                await dispatch(createProductTC({
                    title: values.title,
                    description: values.description,
                    imageUrl: values.imageUrl,
                    price: Number(values.price)
                }))
            }
            Keyboard.dismiss()
            if (!error) {
                navigation.goBack()
            }
            if (error) {
                Alert.alert("An error happened", error, [
                    {text: "Ok"}
                ])
            }
        }

        if (isLoading) {
            return <View style={styles.centered}>
                <ActivityIndicator size={"large"} color={Colors.primary}/>
            </View>
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
    centered: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    }

});


