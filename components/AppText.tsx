import {Platform, StyleProp, StyleSheet, Text, TextProps, TextStyle} from 'react-native';
import {ReactNode} from "react";

type AppTextPropsType = {
    children: number | string | ReactNode
    style?: StyleProp<TextStyle>
}

export const AppText = ({children, style, ...restProps}: AppTextPropsType & TextProps) => {
    return (
        <Text style={[styles.text, style]} {...restProps}>{children}</Text>
    );
};

const styles = StyleSheet.create({
    text: {
        ...Platform.select({
            ios: {
                fontSize: 18,
                fontFamily: "Avenir",
            },
            android: {
                fontSize: 16,
                fontFamily: "Roboto",
            }
        })
    }
});
