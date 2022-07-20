import {createAction, createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {ProductType} from "../types/types";
import {Product} from "../models/products";
import {apiRequests} from "../api/requests";
import {setErrorAC, setIsLoadingAC} from "./appReducer";
import {Alert} from "react-native";
import {RootState} from "./store";


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
export const createProductAC = createAction<{ title: string, description: string, imageUrl: string, price: number, ownerID: string | null | undefined }>("product/createProductAC")
//export const createProductAC = createAction<{ title: string, description: string, imageUrl: string, price: number,
// ownerID: string | null | undefined }>("product/createProductAC")

export const updateProductAC = createAction<{ id: string, title: string, description: string, imageUrl: string }>("product/updateProductAC")

export const createProductTC = createAsyncThunk<{}, { title: string, description: string, imageUrl: string, price: number }, { state: RootState }>("product/createProductTC",
    async (param, {dispatch, getState}) => {
        dispatch(setIsLoadingAC({value: true}))
        try {
            // const res = await apiRequests.createProd(param.title, param.description, param.imageUrl, param.price)
            // 1 const res = await apiRequests.createProd(param.title, param.description, param.imageUrl, param.price,
            // getState().authReducer.token)

            const res = await apiRequests.createProd(param.title, param.description, param.imageUrl, param.price, getState().authReducer.token, getState().authReducer.id)


            // const res = await apiRequests.createProd(param.title, param.description, param.imageUrl, param.price,
            // getState().authReducer.token, getState().authReducer.id)

            dispatch(createProductAC({
                title: param.title,
                description: param.description,
                imageUrl: param.imageUrl,
                price: Number(param.price),
                ownerID: getState().authReducer.id
            }))
            dispatch(setIsLoadingAC({value: false}))
            return {data: res.config.data, id: res.data.name};
        } catch (error) {
            dispatch(setIsLoadingAC({value: false}))
            dispatch(setErrorAC({value: error.message}))
        }
    })


export const fetchProductTC = createAsyncThunk<any, undefined, { state: RootState }>("product/fetchProductTC", async (param, {
    dispatch,
    getState
}) => {
    try {
        const res = await apiRequests.fetchProducts()
        const ownerID = getState().authReducer.id
        return {data: res.data, ownerID}
        // console.log("userID", userID);
        // console.log(res.data);
        // console.log("ownerID", ownerID);
        // return res.data
    } catch (error) {

    }
})

export const updateProductTC = createAsyncThunk<void, { id: string, title: string, description: string, imageUrl: string }, { state: RootState }>("product/updateProductTC",
    async (param, {dispatch, getState}) => {
        dispatch(setIsLoadingAC({value: true}))
        try {
            // await apiRequests.updateProd(param.id, param.title, param.description, param.imageUrl)
            await apiRequests.updateProd(param.id, param.title, param.description, param.imageUrl, getState().authReducer.token)
            // await apiRequests.updateProd(param.id, param.title, param.description, param.imageUrl,
            // getState().authReducer.token)

            dispatch(updateProductAC({
                id: param.id,
                title: param.title,
                description: param.description,
                imageUrl: param.imageUrl
            }))

        } catch (error) {
            dispatch(setIsLoadingAC({value: false}))
            dispatch(setErrorAC({value: error.message}))
            Alert.alert("Request error", error.message)
        }

    })

export const deleteProductTC = createAsyncThunk<void, { id: string }, { state: RootState }>("product/deleteProductTC",
    async (param, {dispatch, getState}) => {
        try {
            await apiRequests.deleteProd(param.id, getState().authReducer.token)
            // await apiRequests.deleteProd(param.id, getState().authReducer.token)

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
                    // "u1",
                    action.payload.ownerID,
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
                const res = action.payload.data
                const ownersID = action.payload.ownerID;



                for (const key in res) {
                    loadedProduct.push(new Product(key, res[key].ownerID, res[key].title, res[key].imageUrl, res[key].description, res[key].price))
                }
                state.availableProducts = loadedProduct
                state.userProducts = loadedProduct.filter((product) => product.ownerId === ownersID)
            })
    },
})


export const productsReducer = slice.reducer

// .addCase(fetchProductTC.fulfilled, (state, action) => {
//     const loadedProduct = []
//     const res = action.payload
//
//     for (const key in res) {
//         loadedProduct.push(new Product(key, res[key].ownerID, res[key].title, res[key].imageUrl, res[key].description, res[key].price))
//     }
//     console.log(loadedProduct);
//     state.availableProducts = loadedProduct
//     state.userProducts = loadedProduct.filter((product) => product.ownerId === 'u1')
// })
