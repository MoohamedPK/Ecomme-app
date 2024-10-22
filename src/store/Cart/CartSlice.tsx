import { createSlice } from "@reduxjs/toolkit";
import { TProduct } from "src/types/product";
import { TLoading } from "src/types/shared";
import GetProductsByItems from "./action/GetProductsByItems";

interface ICartState {
    items : {[key: string]: number} //1:1
    productsFullInfo : TProduct[],
    loading: TLoading,
    error : null | string,
}

const initialState: ICartState ={
    items: {},
    productsFullInfo : [],
    loading: "idle",
    error:null,
}

const cartSlice = createSlice({
    name:"cart",
    initialState,
    reducers: {
        addToCart : (state, action) => {
            const id = action.payload;

            if (state.items[id]) {
                state.items[id]++
            }else {
                state.items[id] = 1
            }
        },
        addChangedQuantity: (state, action) => {
            state.items[action.payload.id] = action.payload.quantity
            // console.log(state.items[action.payload.id] = action.payload.quantity)
            // console.log(action.payload.quantity)
        }
    },
    extraReducers: (builder) => {
        builder.addCase(GetProductsByItems.pending, (state) => {
            state.loading = "pending"
            state.error = null
        })
        builder.addCase(GetProductsByItems.fulfilled, (state, action) => {
            state.loading = "succeeded"
            state.error = null
            state.productsFullInfo = action.payload;
        })
        builder.addCase(GetProductsByItems.rejected, (state, action) => {
            state.loading = "failed"
            state.error = action.payload as string
        })
    }
})


export const {addToCart, addChangedQuantity} = cartSlice.actions;
export default cartSlice.reducer;