import {createAction, createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {Order} from "../models/order";
import {ModifiedCartItems, OrdersType} from "../types/types";
import {apiRequests} from "../api/requests";
import {setIsLoadingAC} from "./appReducer";
import {RootState} from "./store";
import {logOutAC} from "./authReducer";


type OrderType = {
    id: string,
    items: ModifiedCartItems[],
    totalAmount: number,
    date: Date
    correctDate: string
}


type initialStateType = {
    orders: OrderType[]
}


const initialState: initialStateType = {
    orders: []
}

export const addOrderAC = createAction<{ cartItem: ModifiedCartItems[], totalAmount: number, id: string, date: Date }>("order/addOrderAC")
// export const setOrdersAC = createAction<{ orders:OrderType[] }>("order/setOrdersAC")


export const createOrderTC = createAsyncThunk<void, { cartItem: ModifiedCartItems[], totalAmount: number }, { state: RootState }>("order/createOrderTC",
    async (param, {dispatch, getState}) => {
        dispatch(setIsLoadingAC({value: true}))
        const date = new Date()

        const response = await apiRequests.createOrder(param.cartItem, param.totalAmount, date.toString(), getState().authReducer.token, getState().authReducer.id)
        dispatch(addOrderAC({cartItem: param.cartItem, totalAmount: param.totalAmount, id: response.data.name, date}))
        dispatch(setIsLoadingAC({value: false}))
    })


export const setOrdersTC = createAsyncThunk<OrdersType, void, { state: RootState }>("order/setOrderTC",
    async (param, {dispatch, getState}) => {
        dispatch(setIsLoadingAC({value: true}))
        const response = await apiRequests.getOrders(getState().authReducer.id)
        dispatch(setIsLoadingAC({value: false}))
        return response.data
    })


const slice = createSlice({
    name: "order",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(logOutAC, (state, action) => {
                state.orders = []
            })
            .addCase(addOrderAC, (state, action) => {
                const newOrder = new Order(action.payload.id, action.payload.cartItem, action.payload.totalAmount, action.payload.date)
                state.orders = [...state.orders, newOrder]
            })
            .addCase(setOrdersTC.fulfilled, (state, action) => {
                const response = action.payload
                const ordersFromServer: OrderType[] = []
                for (const key in response) {
                    ordersFromServer.push(
                        new Order(key, response[key].cartItem, response[key].totalAmount, new Date(response[key].date))
                    )
                }
                state.orders = [...state.orders, ...ordersFromServer]
            })
    },
})


export const ordersReducer = slice.reducer


