import {createAction, createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {ProductType} from "../types/types";
import {Product} from "../models/products";
import {apiRequests} from "../api/requests";
import {setErrorAC, setIsLoadingAC} from "./appReducer";


type initialStateType = {
    availableProducts: ProductType[]
    userProducts: ProductType[]
}


const initialState: initialStateType = {
    // availableProducts: PRODUCTS,
    // userProducts: PRODUCTS.filter((product) => product.ownerId === "u1")
    availableProducts: [],
    userProducts: []
}

export const deleteProductAC = createAction<string>("product/deleteProductAC")
export const createProductAC = createAction<{ title: string, description: string, imageUrl: string, price: number }>("product/createProductAC")
export const updateProductAC = createAction<{ id: string, title: string, description: string, imageUrl: string }>("product/updateProductAC")

export const createProductTC = createAsyncThunk("product/createProductTC",
    async (param: { title: string, description: string, imageUrl: string, price: number }, {dispatch}) => {
        dispatch(setIsLoadingAC({value: true}))
        try {
            const res = await apiRequests.createProd(param.title, param.description, param.imageUrl, param.price)
            dispatch(createProductAC({
                title: param.title,
                description: param.description,
                imageUrl: param.imageUrl,
                price: Number(param.price)
            }))
            return {data: res.config.data, id: res.data.name};
        } catch (error) {
            dispatch(setIsLoadingAC({value: false}))
            dispatch(setErrorAC({value: error.message}))
        }
    })


export const fetchProductTC = createAsyncThunk("product/fetchProductTC", async (param, {dispatch}) => {
    try {
        const res = await apiRequests.fetchProducts()
        return res.data
    } catch (error) {

    }
})

export const updateProductTC = createAsyncThunk("product/updateProductTC",
    async (param: { id: string, title: string, description: string, imageUrl: string }, {dispatch}) => {

        dispatch(setIsLoadingAC({value: true}))
        try {
            await apiRequests.updateProd(param.id, param.title, param.description, param.imageUrl)
            dispatch(updateProductAC({
                id: param.id,
                title: param.title,
                description: param.description,
                imageUrl: param.imageUrl
            }))

        } catch (error) {
            dispatch(setIsLoadingAC({value: false}))
            dispatch(setErrorAC({value: error.message}))
        }

    })

export const deleteProductTC = createAsyncThunk("product/deleteProductTC",
    async (param: { id: string }, {dispatch}) => {
        try {
            await apiRequests.deleteProd(param.id)
        } catch (error) {

        }
    })

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
            .addCase(createProductTC.fulfilled, (state, action) => {

            })

            .addCase(fetchProductTC.fulfilled, (state, action) => {
                const loadedProduct = []
                const res = action.payload
                for (const key in res) {
                    loadedProduct.push(new Product(key, "u1", res[key].title, res[key].imageUrl, res[key].description, res[key].price))
                }
                state.availableProducts = loadedProduct
                state.userProducts = loadedProduct.filter((product) => product.ownerId === 'u1')
            })
    },
})


export const productsReducer = slice.reducer
