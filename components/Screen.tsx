import {SafeAreaView, StyleSheet, View} from 'react-native';
import Constants from "expo-constants";




export const Screen = ({children, style}: any) => {
    return (
        <SafeAreaView style={[styles.screen, style]}>
            <View style={[style, {flex: 1}]}>{children}</View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    screen: {
        paddingTop: Constants.statusBarHeight,
        flex: 1,
    }
});
