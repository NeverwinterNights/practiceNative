import React, {createContext, FC, useEffect, useMemo, useState} from "react";
import {onAuthStateChanged, User} from "firebase/auth"
import {Alert} from "react-native";
import {authMy, login, logout, register} from "../firebase";
import {useAppDispatch} from "../store/store";
import {logOutAC} from "../store/authReducer";

type ContextAuthType = {
    user: User | null
    isLoading: boolean
    register: (email: string, password: string) => Promise<void>
    login: (email: string, password: string) => Promise<void>
    logout: () => Promise<void>
}

export const AuthContext = createContext<ContextAuthType>({} as ContextAuthType)

export const AuthProvider: FC = ({children}) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoadingInitial, setIsLoadingInitial] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useAppDispatch()



    const registerHandler = async (email: string, password: string) => {
        setIsLoading(true)
        try {
            const {user} = await register(email, password)
        } catch (error: any) {
            Alert.alert("Error registration", error)
        } finally {
            setIsLoading(false)
        }
    }

    const loginHandler = async (email: string, password: string) => {
        setIsLoading(true)
        try {
            await login(email, password)
        } catch (error: any) {
            Alert.alert("Error login", error)
        } finally {
            setIsLoading(false)
        }
    }

    const logOutHandler = async () => {
        setIsLoading(true)
        try {
            await logout()
            dispatch(logOutAC()) // clear data after log out
        } catch (error: any) {
            Alert.alert("Error logOut", error)
        } finally {
            setIsLoading(false)
        }
    }
    useEffect(() => onAuthStateChanged(authMy, user => {
        setUser(user || null)
        setIsLoadingInitial(false)
    }), [])

    const value = useMemo(() => ({
        user, isLoading, register: registerHandler, login: loginHandler, logout: logOutHandler
    }), [user, isLoading]);

    return <AuthContext.Provider value={value}>
        {!isLoadingInitial && children}
    </AuthContext.Provider>
}

