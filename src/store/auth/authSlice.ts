import { createSlice } from "@reduxjs/toolkit";
import { TLoading } from "@types";
import registerAuthAction from "./act/actAuthRegister";
import logInAction from "./act/actLogin";

interface IAuthState {
    accessToken: string | null,
    user: {
        id:number,
        firstName: string,
        lastName:string,
        email:string
    } | null
    loading: TLoading,
    error : null | string
}

const initialState:IAuthState = {
    user: null,
    accessToken: null,
    loading: "idle",
    error : null
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        resetLogin: (state) => {
            state.loading = "idle";
            state.error = null;
        },
        logout : (state) => {
            state.user = null
            state.accessToken = null
        }
    },
    extraReducers: (builder) => {
        builder.addCase(registerAuthAction.pending, (state, action) => {
            state.loading = "pending"
        })
        builder.addCase(registerAuthAction.fulfilled, (state, action) => {
            state.loading = "succeeded"
        })
        builder.addCase(registerAuthAction.rejected, (state, action) => {
            state.loading = "failed"
            state.error = action.payload
        })

        // login action 

        builder.addCase(logInAction.pending, (state, action) => {
            state.loading = "pending"
        })
        builder.addCase(logInAction.fulfilled, (state, action) => {
            state.loading = "succeeded"
            state.accessToken = action.payload.accessToken
            state.user = action.payload.user
        })
        builder.addCase(logInAction.rejected, (state, action) => {
            state.loading = "failed"
            state.error = action.payload
        })
    }
})

export const {resetLogin, logout} = authSlice.actions;
export default authSlice.reducer;