import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosErrorHandler from "@util/axiosErrorHandler";
import { TProduct } from "@types";
import { RootState } from "@store/store";

type TDataType = "productFullInfo" | "productIds"
type TResponse = TProduct[];

const actGetWishlist = createAsyncThunk("wishlist/actGetWishlist", async(dataType: TDataType, thunkAPI) => {
    const {rejectWithValue, signal, getState} = thunkAPI;
    const {auth} = getState() as RootState

    try {
        const userWishlist = await axios.get<{productId : number}[]>(
            `/wishlist?userId=${auth.user?.id}`, {signal}
        );
        
        if (!userWishlist.data.length) {
            return {data: [], dataType: "productFullInfo"};
        }

        if (dataType === "productFullInfo") {
            
            const concatenateWishlistItems = userWishlist.data.map((el) => `id=${el.productId}`).join("&");
            const response = await axios.get<TResponse>(`/products?${concatenateWishlistItems}`)
            return {data: response.data, dataType: "productFullInfo"}
        } else {
            const concatenateWishlistItems = userWishlist.data.map((el) => el.productId);
            return {data: concatenateWishlistItems, dataType: "productIds"}
        }
        
    } catch (error) {
        return rejectWithValue(axiosErrorHandler(error));
    }
})


export default actGetWishlist;