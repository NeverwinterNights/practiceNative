import {createAction, createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {Order} from "../models/order";
import {ModifiedCartItems} from "../types/types";
import {apiRequests} from "../api/requests";
import {setIsLoadingAC} from "./appReducer";


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


export const createOrderTC = createAsyncThunk("order/createOrderTC",
    async (param: { cartItem: ModifiedCartItems[], totalAmount: number }, {dispatch}) => {
        dispatch(setIsLoadingAC({value: true}))
        const date = new Date()

        const response = await apiRequests.createOrder(param.cartItem, param.totalAmount, date.toString())
        dispatch(addOrderAC({cartItem: param.cartItem, totalAmount: param.totalAmount, id: response.data.name, date}))
        dispatch(setIsLoadingAC({value: false}))
    })


export const setOrdersTC = createAsyncThunk("order/setOrderTC",
    async (param, {dispatch}) => {
        dispatch(setIsLoadingAC({value: true}))
        const response = await apiRequests.getOrders()
        dispatch(setIsLoadingAC({value: false}))
        return response.data
    })


const slice = createSlice({
    name: "order",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
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


