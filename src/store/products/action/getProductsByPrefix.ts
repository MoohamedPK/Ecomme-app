import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosErrorHandler from "@util/axiosErrorHandler";
import { TProduct } from "@types/product.types";

type TResponse = TProduct[];

const getProducts = createAsyncThunk("products/getProducts", async(prefix, thunkAPI) => {

    const {rejectWithValue, signal} = thunkAPI;

    try {
        // TO DESCRIBE THE SHAPE OF DATA OBJ WE USE THE TYPE, SO HERE WE REFERED TO THIS TYPE BY <TResponse>  
        const response = await axios.get<TResponse>(`/products?cat_prefix=${prefix}`, {signal});
        return response.data;

    } catch (error) {
        return rejectWithValue(axiosErrorHandler(error));
    }
})

export default getProducts;