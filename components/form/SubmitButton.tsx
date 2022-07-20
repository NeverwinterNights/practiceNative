import React from 'react';
import {Button, Keyboard, StyleSheet} from 'react-native';
import {useFormikContext} from "formik";
import Colors from "../../constants/Colors";


type SubmitButtonPropsType = {
    title: string

}

export const SubmitButton = ({title}: SubmitButtonPropsType) => {
    const {handleSubmit, errors, values} = useFormikContext<FormData>()

    // const index = Object.keys(values)[0]


    const onLoginButtonHandler = () => {
        Keyboard.dismiss()
        handleSubmit()
        // if (!values[index as keyof FormData]) {
        //     handleSubmit()
        // } else {
        //
        //     Keyboard.dismiss()
        //     handleSubmit()
        // }

    }

    return (
        <Button color={Colors.primary} title={title} onPress={onLoginButtonHandler}/>
    );
};

const styles = StyleSheet.create({
    container: {}
});
