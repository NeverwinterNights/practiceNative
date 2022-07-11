import {createAction, createSlice} from "@reduxjs/toolkit";
import {PRODUCTS} from "../data/dummy-data";
import {ProductType} from "../types/types";
import {Product} from "../models/products";


type initialStateType = {
    availableProducts: ProductType[]
    userProducts: ProductType[]
}


const initialState: initialStateType = {
    availableProducts: PRODUCTS,
    userProducts: PRODUCTS.filter((product) => product.ownerId === "u1")
}

export const deleteProductAC = createAction<string>("product/deleteProductAC")
export const createProductAC = createAction<{ title: string, description: string, imageUrl: string, price: number }>("product/createProductAC")
export const updateProductAC = createAction<{ id: string, title: string, description: string, imageUrl: string }>("product/updateProductAC")


const slice = createSlice({
    name: "product",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(deleteProductAC, (state, action) => {
                state.userProducts = state.userProducts.filter((product) => product.id !== action.payload)
                state.availableProducts = state.availableProducts.filter((product) => product.id !== action.payload)
            })
            .addCase(createProductAC, (state, action) => {
                const newProduct = new Product(
                    new Date().toString(),
                    "u1",
                    action.payload.title,
                    action.payload.imageUrl,
                    action.payload.description,
                    action.payload.price,
                )
                state.availableProducts = [newProduct, ...state.availableProducts]
                state.userProducts = [newProduct, ...state.userProducts]
            })
            .addCase(updateProductAC, (state, action) => {
                const index = state.userProducts.findIndex((product) => product.id === action.payload.id)
                const updatedProd = new Product(
                    action.payload.id,
                    state.userProducts[index].ownerId,
                    action.payload.title,
                    action.payload.imageUrl,
                    action.payload.description,
                    state.userProducts[index].price
                )
                state.userProducts[index] = updatedProd
                const availableIndex = state.availableProducts.findIndex((product) => product.id === action.payload.id)
                state.availableProducts[availableIndex] = updatedProd
            })
    },
})


export const productsReducer = slice.reducer
