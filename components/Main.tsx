import {StyleSheet} from 'react-native';
import {MainNavigator} from "../navigation/MainNavigator";
import {useAuth2} from "../hooks/useAuth";
import {AuthNavigator} from "../navigation/AuthNavigator";
import {useEffect} from "react";
import {setUserAC} from "../store/authReducer";
import {useAppDispatch} from "../store/store";


export const Main = () => {
    const {user} = useAuth2()
    const dispatch = useAppDispatch()
    const getToken = async () => {
        return user?.getIdToken();
    }

    useEffect( ()=> {
        getToken().then((res)=> {
            dispatch(setUserAC({email: user?.email, token: res, id: user?.uid}))
        })

    }, [user])


    return (
        <>
            {/*<AuthNavigator/>*/}
            {user ? <MainNavigator/> : <AuthNavigator/>}
        </>
    );
};

const styles = StyleSheet.create({});
