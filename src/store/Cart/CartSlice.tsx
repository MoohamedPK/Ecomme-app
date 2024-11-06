import { createSlice } from "@reduxjs/toolkit";
import { TProduct, TLoading } from "@types";
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
        },
        removeItemFromCart : (state, action) => {
            delete state.items[action.payload];
            state.productsFullInfo = state.productsFullInfo.filter(prod => prod.id !== action.payload)
        },

        cleanCartProductsFullInfo: (state) => {
            state.productsFullInfo = [];
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


export const {addToCart, addChangedQuantity, removeItemFromCart, cleanCartProductsFullInfo} = cartSlice.actions;
export default cartSlice.reducer;