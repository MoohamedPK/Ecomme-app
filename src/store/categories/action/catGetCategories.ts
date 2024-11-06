import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { TCategoty } from "@types/category.types";
import axiosErrorHandler from "@util/axiosErrorHandler";

type TResponse = TCategoty[];

const getCategories = createAsyncThunk("categories/getCategories", async(_, thunkAPI) => {

    const {rejectWithValue, signal} = thunkAPI

    try {
        // TO DESCRIBE THE SHAPE OF DATA OBJ WE USE THE TYPE, SO HERE WE REFERED TO THIS TYPE BY <TResponse>  
        const response = await axios.get<TResponse>("/category", {signal});
        return response.data;

    } catch (error) {
        return rejectWithValue(axiosErrorHandler(error));
    }
})

export default getCategories;