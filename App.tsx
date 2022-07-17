import {StatusBar} from 'expo-status-bar';
import {LogBox, StyleSheet, View} from 'react-native';
import {Provider} from "react-redux";
import {store} from "./store/store";
import {NavigationContainer} from "@react-navigation/native";
import {Main} from "./components/Main";
import * as Font from "expo-font"
import {useCallback, useEffect, useState} from "react";
import * as SplashScreen from 'expo-splash-screen'
// import "./firebase"
import {initializeApp} from 'firebase/app';
import {firebaseConfig} from "./firebase";
import {AuthProvider} from "./providers/AuthProvider";

LogBox.ignoreLogs(['Warning: AsyncStorage has been extracted from react-native core']);


const app = initializeApp(firebaseConfig);

export default function App() {
    const [isLoaded, setIsLoaded] = useState(false);

    const fetchFonts = () => {
        return Font.loadAsync({
            "open-sans": require("./fonts/OpenSans-Regular.ttf"),
            "open-sans-bold": require("./fonts/OpenSans-Bold.ttf")
        })
    }

    useEffect(() => {
        async function prepare() {
            try {
                await SplashScreen.preventAutoHideAsync();
                await fetchFonts()
                await new Promise(resolve => setTimeout(resolve, 2000));
            } catch (e) {
                console.warn(e);
            } finally {
                setIsLoaded(true);
            }
        }

        prepare();
    }, []);

    const onLayoutRootView = useCallback(async () => {
        if (isLoaded) {
            await SplashScreen.hideAsync();
        }
    }, [isLoaded]);

    if (!isLoaded) {
        return null;
    }


    return (
        <Provider store={store}>
            <View onLayout={onLayoutRootView} style={styles.container}>
                <NavigationContainer>
                    <AuthProvider>
                        <StatusBar style="auto"/>
                        <Main/>
                    </AuthProvider>
                </NavigationContainer>

            </View>
        </Provider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
