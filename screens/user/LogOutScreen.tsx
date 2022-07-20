import React from 'react';
import {Button, StyleSheet, View} from 'react-native';
import {AppText} from "../../components/AppText";
import {useAuth2} from "../../hooks/useAuth";

type LogOutScreenPropsType = {}

export const LogOutScreen = ({}: LogOutScreenPropsType) => {
    const {logout} = useAuth2()
    return (
        <View style={styles.container}>
            <AppText>LogOut</AppText>
            <Button title={"LogOut"} onPress={()=> logout()}/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    }
});
