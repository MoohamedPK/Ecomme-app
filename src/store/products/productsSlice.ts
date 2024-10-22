import { createSlice } from "@reduxjs/toolkit";
import getProducts from "./action/getProductsByPrefix";
import {TLoading} from "../../types/shared";
import { TProduct } from "src/types/product";

// INTERFACE It provides a way to describe the shape of objects, including their properties and methods, without implementing any functionality
interface IProductssState {
  records : TProduct[];
  loading: TLoading;
  error : string | null;
}

// THE SHAPE THAT WE WANT TO DEFINE
const initialState: IProductssState = {records : [], loading: 'idle', error: null };

const productsSlice = createSlice({
  name:"products",
  initialState,
  reducers: {
    cleanupProduct: (state) => {
        state.records = [];
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getProducts.pending, (state) => {
      state.loading = "pending"
      state.error = null
    })

    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.loading = "succeeded"
      state.records = action.payload
    })

    builder.addCase(getProducts.rejected, (state, action) => {
      state.loading = "failed"
      
      // THE GUARD allows you to check the type of a variable at runtime, ensuring that the code inside a specific block knows the exact type of the variable.
      // Here we use the AS to check the value but also we can use the typeof === "string"
      if (action.payload) {
        state.error = action.payload as string;
      }
    })
  }
})

export const {cleanupProduct} = productsSlice.actions;
export default productsSlice.reducer;