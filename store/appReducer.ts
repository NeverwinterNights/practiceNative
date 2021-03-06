import {createAction, createSlice} from "@reduxjs/toolkit";
import {logOutAC} from "./authReducer";


type initialStateType = {
    isLoading: boolean
    error: string
}


const initialState: initialStateType = {
    isLoading: false,
    error: ""
}

export const setErrorAC = createAction<{ value: string }>("app/setErrorAC")
export const setIsLoadingAC = createAction<{ value: boolean }>("app/setIsLoadingAC")


const slice = createSlice({
    name: "app",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(setErrorAC, (state, action) => {
                state.error = action.payload.value
            })
            .addCase(setIsLoadingAC, (state, action) => {
                state.isLoading = action.payload.value
            })
            .addCase(logOutAC, (state, action) => {
                state.isLoading = false
                state.error = ""
            })
    },
})


export const appReducer = slice.reducer


