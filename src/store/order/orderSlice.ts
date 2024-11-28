import { createSlice } from "@reduxjs/toolkit";
import { TLoading, TOrderItem } from "@types";
import actPlaceOrder from "./act/actPlaceOrder";
import actGetOrder from "./act/actGetOrders";

interface IOrderSlice {
    orderList: TOrderItem[]
    loading:TLoading,
    error: null | string
}

const initialState:IOrderSlice= {
    orderList: [],
    loading: "idle",
    error: null,
}

const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {
        resetOrderStatus : (state) => {
            state.loading = "idle"
            state.error = null
        } 
    },
    extraReducers: (builder) => {
        builder.addCase(actPlaceOrder.pending, (state) => {
            state.loading = "pending"
            state.error = null
        });

        builder.addCase(actPlaceOrder.fulfilled, (state, ) => {
            state.loading = "succeeded"
            state.error= null
        });

        builder.addCase(actPlaceOrder.rejected, (state, action) => {
            state.loading = "failed"
            if (action.payload) {
                state.error = action.payload as string;
            }
        });


        //GET ORDERS 
        builder.addCase(actGetOrder.pending, (state) => {
            state.loading = "pending"
            state.error = null
        });

        builder.addCase(actGetOrder.fulfilled, (state, action) => {
            state.loading = "succeeded"
            state.error= null
            state.orderList = action.payload
        });

        builder.addCase(actGetOrder.rejected, (state, action) => {
            state.loading = "failed"
            if (action.payload) {
                state.error = action.payload as string;
            }
        });
    }
})

export const {resetOrderStatus} = orderSlice.actions;

export default orderSlice.reducer;