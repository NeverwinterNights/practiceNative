import {createAction, createSlice} from "@reduxjs/toolkit";
import {PRODUCTS} from "../data/dummy-data";
import {ProductType} from "../types/types";


type initialStateType = {
    availableProducts: ProductType[]
    userProducts: ProductType[]
}


const initialState: initialStateType = {
    availableProducts: PRODUCTS,
    userProducts: PRODUCTS.filter((product)=> product.ownerId==="u1")
}

export const setLoadingAC = createAction<boolean>("product/setLoadingAC")


const slice = createSlice({
    name: "product",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder


    },
})


export const productsReducer = slice.reducer
