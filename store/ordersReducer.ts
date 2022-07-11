import {createAction, createSlice} from "@reduxjs/toolkit";
import {Order} from "../models/order";
import {ModifiedCartItems} from "../types/types";


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

export const addOrderAC = createAction<{ cartItem: any, totalAmount: number }>("order/addOrderAC")


const slice = createSlice({
    name: "order",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addOrderAC, (state, action) => {
                const newOrder = new Order(new Date().toString(), action.payload.cartItem, action.payload.totalAmount, new Date())
                state.orders = [...state.orders, newOrder]
            })
    },
})


export const ordersReducer = slice.reducer


