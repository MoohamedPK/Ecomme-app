import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosErrorHandler from "@util/axiosErrorHandler";
import { RootState } from "@store/store";

const actPlaceOrder = createAsyncThunk("placeorder/actPlaceOrder", async(subTotal: number, thunkAPI) => {

    const {rejectWithValue, getState} = thunkAPI
    const {cart, auth} = getState() as RootState;

    const orderItems = cart.productsFullInfo.map((el) => ({
        id: el.id,
        img: el.img,
        title: el.title,
        price: el.price,
        quantity: cart.items[el.id]
    }));

    try {
        const response = await axios.post("/orders", {
            userId: auth.user?.id,
            items: orderItems,
            subTotal
        });
        return response.data
    } catch (error) {
        return rejectWithValue(axiosErrorHandler(error));
    }
})


export default actPlaceOrder;