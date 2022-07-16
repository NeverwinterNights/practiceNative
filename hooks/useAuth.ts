import {useAppSelector} from "../store/store";

export function useAuth() {
    const {email, token, id} = useAppSelector(state => state.authReducer);

    return {
        isAuth: !!email,
        email,
        token,
        id,
    };
}