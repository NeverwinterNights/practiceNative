import React, {ReactNode} from 'react';
import {StyleProp, StyleSheet, TextStyle, View} from 'react-native';
import Colors from "../../constants/Colors";

type CardWrapperPropsType = {
    children?: ReactNode
    style?: StyleProp<TextStyle>
}

export const CardWrapper = ({children, style}: CardWrapperPropsType) => {
    return (
        <View style={[styles.container, style]}>
            {children}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        shadowColor: "black",
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.26,
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: Colors.white,
    }
});
