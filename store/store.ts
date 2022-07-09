import {combineReducers, configureStore} from '@reduxjs/toolkit'
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import thunkMiddleware from 'redux-thunk'
import {productsReducer} from "./productsReducer";
import {cartReducer} from "./cartReducer";
import {ordersReducer} from "./ordersReducer";

const rootReducer = combineReducers({
    productsReducer: productsReducer,
    cartReducer: cartReducer,
    ordersReducer: ordersReducer
})


export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware(
        {
            serializableCheck: false,
        }
    ).prepend(thunkMiddleware)
})


export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()


export type RootState = ReturnType<typeof store.getState>
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
