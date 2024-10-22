import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { TProduct } from "src/types/product";

type TResponse = TProduct[];

const getProducts = createAsyncThunk("products/getProducts", async(prefix, thunkAPI) => {

    const {rejectWithValue} = thunkAPI;

    try {
        // TO DESCRIBE THE SHAPE OF DATA OBJ WE USE THE TYPE, SO HERE WE REFERED TO THIS TYPE BY <TResponse>  
        const response = await axios.get<TResponse>(`/products?cat_prefix=${prefix}`);
        return response.data;

    } catch (error) {

        // WE MUST MAKE SURE THAT THE ERROR WE HAVE IS FROM AXIOS
        if(axios.isAxiosError(error)) {
            return rejectWithValue(error.response?.data.message || error.message) 
        } else {
            return rejectWithValue("Unexpected type of error")
        }
    }
})

export default getProducts;