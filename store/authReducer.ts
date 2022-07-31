import {createAction, createSlice} from "@reduxjs/toolkit";

type initialStateType = {
    email: string | null | undefined
    token: string | null | undefined
    id: string | null | undefined
}


const initialState: initialStateType = {
    email: null,
    token: null,
    id: null
}

export const setUserAC = createAction<{ email: string | null | undefined, token: string | null | undefined, id: string | null | undefined, }>("auth/setUserAC")
export const removeUserAC = createAction("auth/removeUserAC")
export const logOutAC = createAction("auth/logOutAC")


const slice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(setUserAC, (state, action) => {

                state.email = action.payload.email
                state.token = action.payload.token
                state.id = action.payload.id
            })
            .addCase(removeUserAC, (state, action) => {
                state.email = ""
                state.token = ""
                state.id = ""
            })
            .addCase(logOutAC, (state, action) => {
                state.email = ""
                state.token = ""
                state.id = ""
            })
    },
})


export const authReducer = slice.reducer



