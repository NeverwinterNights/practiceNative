import {StyleSheet} from 'react-native';
import {DrawerNavigator} from "../navigation/DrawerNavigation";
import {MainNavigator} from "../navigation/MainNavigator";
import {AuthScreen} from "../screens/user/AuthScreen";
import {AuthNavigator} from "../navigation/AuthNavigator";


export const Main = () => {
    return (
        // <DrawerNavigator/>
        // <MainNavigator/>-
        <AuthNavigator/>
    );
};

const styles = StyleSheet.create({});
