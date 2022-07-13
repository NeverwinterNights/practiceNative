import React, {useState} from 'react';
import {TextInput, TextInputProps} from 'react-native';

import {ErrorMessages} from "./ErrorMessages";
import {useFormikContext} from "formik";
import {ProductType} from "../../types/types";

type FormData = {
    [key: string]: string;
};

type AppFormFieldPropsType = {
    name: keyof FormData
    width?: number | string
    editedProducts?: ProductType
}


export const AppFormField = ({name, width, editedProducts, ...restProps}: AppFormFieldPropsType & TextInputProps) => {

    const {setFieldTouched, handleChange, setFieldValue, values, touched, errors} = useFormikContext<FormData>()


    return (
        <>
            <TextInput
                onBlur={() => setFieldTouched(name as string)}
                onChangeText={text => setFieldValue(name as string, text)}
                value={values[name]}
                {...restProps}
            />
            {touched[name] && <ErrorMessages error={errors[name]}/>}
        </>
    );
};

