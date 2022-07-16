import React from 'react';
import {Alert, Button, KeyboardAvoidingView, LogBox, ScrollView, StyleSheet, View} from 'react-native';
import {Formik, FormikHelpers, FormikValues} from "formik";

import Colors from "../../constants/Colors";
import * as Yup from "yup";
import {LinearGradient} from "expo-linear-gradient";

import {useAppDispatch} from "../../store/store";
import {createUserWithEmailAndPassword, getAuth} from "firebase/auth";
import {CardWrapper} from '../../components/UI/CardWrapper';
import {AppFormField} from "../../components/form/AppFormField";
import {AppText} from "../../components/AppText";
import {setUserAC} from "../../store/authReducer";
import {useAppNavigation} from "../../navigation/types";

LogBox.ignoreLogs(['Warning: Async Storage has been extracted from react-native core']);

type RegisterPropsType = {}

const validationSchema = Yup.object().shape({
    email: Yup.string().required().email().label("Email"),
    password: Yup.string().required().min(6).max(10).label("Password"),
});


export const RegisterScreen = ({}: RegisterPropsType) => {
    const dispatch = useAppDispatch()
    const auth = getAuth();
    const navigation = useAppNavigation()


    const submit = async (values: FormikValues, {resetForm}: FormikHelpers<any>) => {
        // console.log(values);
        // resetForm()
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, values.email, values.password)
            .then((res) => {
                const response: any = res.user.toJSON()
                dispatch(setUserAC({
                    email: res.user.email,
                    id: res.user.uid,
                    token: response.stsTokenManager.accessToken
                }))
                navigation.navigate("DrawerNavigator", {
                    screen: "ShopNavigator",
                    params: {screen: "ProductOverviewScreen"}
                })
            })
            .catch((err) => {
                Alert.alert(err.message)
            })


    }

    return (
        <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={-90} style={styles.container}>
            <LinearGradient colors={['#ffedff', '#ffe3ff']} style={styles.gradient}>
                <CardWrapper style={styles.cardCont}>
                    <ScrollView>
                        <Formik initialValues={{email: "", password: ""}} validationSchema={validationSchema}
                                onSubmit={submit}
                        >
                            {
                                ({handleSubmit, touched, errors, handleChange}) => (
                                    <>
                                        <View style={styles.form}>
                                            <AppText style={styles.label}>E-mail</AppText>
                                            <AppFormField
                                                placeholder={"Enter email"}
                                                name={"email"}
                                                autoCorrect={false}
                                                keyboardType={"email-address"}
                                                style={styles.input}
                                                autoCapitalize={"none"}
                                            />
                                        </View>
                                        <View style={styles.form}>
                                            <AppText style={styles.label}>Password</AppText>
                                            <AppFormField
                                                name={"password"}
                                                keyboardType={"default"}
                                                placeholder={"Password"}
                                                style={styles.input}
                                                autoCapitalize={"none"}
                                                secureTextEntry
                                                textContentType={"password"}
                                            />
                                        </View>
                                        <View style={styles.button}>
                                            <Button color={Colors.primary} onPress={() => handleSubmit()}
                                                    title={"Register"}/>
                                        </View>


                                    </>
                                )}
                        </Formik>
                    </ScrollView>
                </CardWrapper>
            </LinearGradient>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    gradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {marginTop: 10},

    cardCont: {
        width: "80%",
        maxWidth: 400,
        maxHeight: 400,
        padding: 20,
        minWidth: 300
    },
    main: {
        justifyContent: "center"
    },

    form: {
        width: "100%",
        marginBottom: 20
    },
    actions: {
        marginVertical: 10,
        alignItems: "center",
        flexDirection: "row",
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
});
