import {useAppSelector} from "../store/store";
import {useContext} from "react";
import {AuthContext} from "../providers/AuthProvider";

export function useAuth() {
    const {email, token, id} = useAppSelector(state => state.authReducer);

    return {
        isAuth: !!email,
        email,
        token,
        id,
    };
}


export const useAuth2 = () => useContext(AuthContext)