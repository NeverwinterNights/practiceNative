import React from 'react';
import {HeaderButton} from 'react-navigation-header-buttons'
import Ionicons from '@expo/vector-icons/Ionicons';
import Colors from "../../constants/Colors";
import { Platform } from 'react-native';


export const CustomHeaderButton = (props: any) => {
    return (

        <HeaderButton {...props} IconComponent={Ionicons} iconSize={23}
                      color={Platform.OS === "android" ? Colors.white : Colors.primary}/>


    )
};


