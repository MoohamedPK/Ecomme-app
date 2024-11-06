import { createSlice } from "@reduxjs/toolkit";
import getCategories from "./action/catGetCategories";
import {TLoading, TCategoty} from "@types";

// INTERFACE It provides a way to describe the shape of objects, including their properties and methods, without implementing any functionality
interface ICategoriesState {
  records : TCategoty[];
  loading: TLoading;
  error : string | null;
}

// THE SHAPE THAT WE WANT TO DEFINE
const initialState: ICategoriesState = {records : [], loading: 'idle', error: null };

const categoriesSlice = createSlice({
  name:"categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCategories.pending, (state) => {
      state.loading = "pending"
      state.error = null
    })

    builder.addCase(getCategories.fulfilled, (state, action) => {
      state.loading = "succeeded"
      state.records = action.payload
    })

    builder.addCase(getCategories.rejected, (state, action) => {
      state.loading = "failed"
      
      // THE GUARD allows you to check the type of a variable at runtime, ensuring that the code inside a specific block knows the exact type of the variable.
      // Here we use the AS to check the value but also we can use the typeof === "string"

      if (action.payload) {
        state.error = action.payload as string;
      }
    })
  }
})

export default categoriesSlice.reducer;