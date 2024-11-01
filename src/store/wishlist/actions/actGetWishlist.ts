import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { TProduct } from "src/types/product";

type TResponse = TProduct[];

const actGetWishlist = createAsyncThunk("wishlist/actGetWishlist", async(_, thunkAPI) => {
    const {rejectWithValue, fulfillWithValue} = thunkAPI;
    try {
        const userWishlist = await axios.get<{productId : number}[]>(
            "/wishlist?userId=1"
        );
        
        if (!userWishlist.data.length) {
            return fulfillWithValue([]);
        }
        
        const concatenateWishlistItems = userWishlist.data.map(el => `id=${el.productId}`).join("&");
        const response = await axios.get<TResponse>(`/products?${concatenateWishlistItems}`)
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return rejectWithValue(error.message as string)
        } else {
            rejectWithValue("Error Undefined");
        }
    }
})


export default actGetWishlist;