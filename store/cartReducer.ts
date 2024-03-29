import {createAction, createSlice} from "@reduxjs/toolkit";
import {ProductType} from "../types/types";
import {CartItem} from "../models/cartItem";
import {addOrderAC} from "./ordersReducer";
import {deleteProductAC} from "./productsReducer";
import {logOutAC} from "./authReducer";


type ItemType = {
    quantity: number
    price: number
    title: string
    sum: number
}


type initialStateType = {
    items: { [key: string]: ItemType },
    totalAmount: number
    quantity: number
}


const initialState: initialStateType = {
    items: {} as { [key: string]: ItemType },
    totalAmount: 0,
    quantity: 0
}

export const addToCartAC = createAction<{ product: ProductType }>("cart/addToCartAC")
export const removeFromCartAC = createAction<{ id: string }>("cart/removeFromCartAC")
 export const changeQuantityAC = createAction<{ value: number }>("cart/changeQuantityAC")


const slice = createSlice({
    name: "cart",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(logOutAC, (state, action) => {
                state.items = {}
                state.totalAmount = 0
            })
            .addCase(addToCartAC, (state, action) => {
                const product: ProductType = action.payload.product
                const price = action.payload.product.price
                const title = action.payload.product.title
                if (state.items[product.id]) {
                    const updatedCartItem = new CartItem(
                        state.items[product.id].quantity + 1,
                        price,
                        title,
                        state.items[product.id].sum + price
                    )
                    state.items = {...state.items, [action.payload.product.id]: updatedCartItem}
                    state.totalAmount = state.totalAmount + product.price
                } else {
                    const newCartItem = new CartItem(1, price, title, price)
                    state.items = {...state.items, [action.payload.product.id]: newCartItem}
                    state.totalAmount = state.totalAmount + product.price
                }
            })
            .addCase(removeFromCartAC, (state, action) => {
                const currentAmount = state.items[action.payload.id].quantity
                const currentItem = state.items[action.payload.id]
                if (currentAmount > 1) {
                    state.items[action.payload.id] = new CartItem(currentItem.quantity - 1, currentItem.price, currentItem.title, currentItem.sum - currentItem.price)
                    state.totalAmount = state.totalAmount - state.items[action.payload.id].price
                } else {
                    state.totalAmount = state.totalAmount - state.items[action.payload.id].price
                    delete state.items[action.payload.id]
                    // console.log("state.totalAmount", state.totalAmount );
                    // console.log("state.items[action.payload.id].price", state.items[action.payload.id].price );
                }
            })
            .addCase(addOrderAC, (state, action) => {
                return initialState
            })
            .addCase(deleteProductAC, (state, action) => {
                if (!state.items[action.payload]) {
                    return
                } else {
                    const totalSum = state.items[action.payload].sum
                    delete state.items[action.payload]
                    state.totalAmount = state.totalAmount - totalSum
                }
            })
            .addCase(changeQuantityAC, (state, action) => {
                state.quantity = action.payload.value
            })
    },
})


export const cartReducer = slice.reducer


