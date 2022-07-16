import {createAction, createSlice} from "@reduxjs/toolkit";


type initialStateType = {
    email:  string | null
    token:  string | null
    id: string | null
}


const initialState: initialStateType = {
    email: null,
    token: null,
    id: null
}

export const setUserAC = createAction<{ email: string | null, token: string | null, id: string | null, }>("auth/setUserAC")
export const removeUserAC = createAction("auth/removeUserAC")


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

    },
})


export const authReducer = slice.reducer
