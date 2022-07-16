import React from 'react';
import {Alert, Button, KeyboardAvoidingView, ScrollView, StyleSheet, View} from 'react-native';
import {Formik, FormikHelpers, FormikValues} from 'formik';
import {AppText} from "../../components/AppText";
import {AppFormField} from "../../components/form/AppFormField";
import Colors from "../../constants/Colors";
import * as Yup from "yup";
import {CardWrapper} from "../../components/UI/CardWrapper";
import {LinearGradient} from 'expo-linear-gradient';
import {AuthNavigatorStackParamList, useAppNavigation} from "../../navigation/types";
import {useAppDispatch} from "../../store/store";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {NavigationProp, useNavigation} from "@react-navigation/native";
import { LogBox } from 'react-native';
import {setUserAC} from "../../store/authReducer";
LogBox.ignoreLogs(['Warning: Async Storage has been extracted from react-native core']);

type AuthScreenPropsType = {}


const validationSchema = Yup.object().shape({
    email: Yup.string().required().email().label("Email"),
    password: Yup.string().required().min(5).max(10).label("Password"),
});

// export const useAppNavigation2 = () => useNavigation<NavigationProp<AuthNavigatorStackParamList>>()

export const AuthScreen = ({}: AuthScreenPropsType) => {
    const navigation = useAppNavigation()
    const dispatch = useAppDispatch()
    const auth = getAuth();

    const submit = (values: FormikValues, {resetForm}: FormikHelpers<any>) => {
        // console.log(values);
        // resetForm()
        const auth = getAuth();
        signInWithEmailAndPassword(auth, values.email, values.password)
            .then((res)=> {
                const response: any = res.user.toJSON()
                dispatch(setUserAC({
                    email: res.user.email,
                    id: res.user.uid,
                    token: response.stsTokenManager.accessToken
                }))
                console.log("accessToken", response.stsTokenManager.accessToken);
                console.log("refreshToken", res.user.refreshToken);
                navigation.navigate("DrawerNavigator", {
                    screen: "ShopNavigator",
                    params: {screen: "ProductOverviewScreen"}
                })
            })
            .catch((err)=> {
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
                                                    title={"Login"}/>
                                        </View>

                                        <View style={styles.button}>
                                            <Button color={Colors.accent} onPress={() => navigation.navigate("AuthNavigator", {screen:"RegisterScreen"} )} title={"Sign Up"}/>
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
    button:{marginTop:10},

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
