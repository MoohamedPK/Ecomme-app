import { createSlice } from "@reduxjs/toolkit";
import { TLoading } from "@types";
import registerAuthAction from "./act/actAuthRegister";

interface IAuthState {
    loading: TLoading,
    error : null | string
}
const initialState:IAuthState = {
    loading: "idle",
    error : null
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
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
    }
})

export default authSlice.reducer