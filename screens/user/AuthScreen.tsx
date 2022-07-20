import React, {useLayoutEffect, useState} from 'react';
import {ActivityIndicator, Button, KeyboardAvoidingView, LogBox, StyleSheet, View} from 'react-native';
import {Formik, FormikHelpers, FormikValues} from 'formik';
import {AppText} from "../../components/AppText";
import {AppFormField} from "../../components/form/AppFormField";
import Colors from "../../constants/Colors";
import * as Yup from "yup";
import {CardWrapper} from "../../components/UI/CardWrapper";
import {LinearGradient} from 'expo-linear-gradient';
import {useAppNavigation} from "../../navigation/types";
import {useAppDispatch} from "../../store/store";
import {getAuth} from "firebase/auth";
import {useAuth2} from "../../hooks/useAuth";
import {SubmitButton} from "../../components/form/SubmitButton";
import {setUserAC} from "../../store/authReducer";

LogBox.ignoreLogs(['Warning: AsyncStorage has been extracted from react-native core and will be removed in a future release. It can now be installed and imported from \'@react-native-async-storage/async-storage\' instead of \'react-native\'.']);

type AuthScreenPropsType = {}


const validationSchema = Yup.object().shape({
    email: Yup.string().required().email().label("Email"),
    password: Yup.string().required().min(5).max(10).label("Password"),
});

// export const useAppNavigation2 = () => useNavigation<NavigationProp<AuthNavigatorStackParamList>>()

export const AuthScreen = ({}: AuthScreenPropsType) => {
    const navigation = useAppNavigation()

    const auth = getAuth();
    const [isRegistrationMode, setIsRegistrationMode] = useState(false);

    const {user, isLoading, login, register} = useAuth2()

    useLayoutEffect(() => {
        navigation.setOptions({
            title: isRegistrationMode ? "Register" : "Login"
        });
    }, [navigation, isRegistrationMode]);


    const handleSubmit = async (values: FormikValues, {resetForm}: FormikHelpers<any>) => {
        if (isRegistrationMode) await register(values.email, values.password)
        else await login(values.email, values.password)
        // resetForm()
    }

    return (
        <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={-90} style={styles.container}>
            <LinearGradient colors={['#ffedff', '#ffe3ff']} style={styles.gradient}>
                <CardWrapper style={styles.cardCont}>
                    {/*<ScrollView>*/}
                    <Formik initialValues={{email: "", password: ""}} validationSchema={validationSchema}
                            onSubmit={handleSubmit}
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
                                        {isLoading ? (
                                            <ActivityIndicator color={Colors.primary} size={"small"}/>
                                        ) : (
                                            <SubmitButton title={isRegistrationMode ? "Registration" : "Login"}/>
                                        )}
                                        {/*<Button color={Colors.primary} onPress={()=> handleSubmit}*/}
                                        {/*        title={isRegistrationMode ? "Registration" : "Login"}/>*/}

                                    </View>

                                    <View style={styles.button}>
                                        <Button color={Colors.accent}
                                            // onPress={() => navigation.navigate("AuthNavigator", {screen: "RegisterScreen"})}
                                                onPress={() => setIsRegistrationMode((prevState) => !prevState)}
                                                title={isRegistrationMode ? "Switch to Login" : "Switch to Registration"}/>
                                    </View>
                                </>
                            )}
                    </Formik>
                    {/*</ScrollView>*/}
                </CardWrapper>
            </LinearGradient>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    custButton: {
        backgroundColor: Colors.primary,
        padding: 8,
        alignItems: "center",
        justifyContent: "center",
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
