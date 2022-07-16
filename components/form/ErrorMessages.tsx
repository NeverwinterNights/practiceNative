import React from 'react';
import {StyleSheet, View} from 'react-native';
import { AppText } from '../AppText';


type ErrorMessagesPropsType = {
    error?: string
    visible?: boolean
}

export const ErrorMessages = ({error}: ErrorMessagesPropsType) => {
    return (
        <View>
            {error ? <AppText style={styles.error}>{error}</AppText> : null}
        </View>
    );
};
const styles = StyleSheet.create({
    error: {
        color: "red",
    }
});
