import { createSlice } from "@reduxjs/toolkit";
import { TLoading, TOrderItem } from "@types";

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
    reducers: {}
})

export default orderSlice.reducer;