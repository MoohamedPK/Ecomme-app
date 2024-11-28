import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import axios from "axios";
import { TProduct } from "@types";
import axiosErrorHandler from "@util/axiosErrorHandler";

type TResponse = TProduct[];

const GetProductsByItems = createAsyncThunk("cart/GetProductsByItems", async(_, thunkAPI) => {

  const {rejectWithValue, fulfillWithValue ,getState, signal} = thunkAPI;
  const {cart} = getState() as RootState;
  const itemsId  = Object.keys(cart.items);

  if (!itemsId.length) {
    return fulfillWithValue([]);
  }
  
  try {
    const concatenatedIds = itemsId.map((el) => `id=${el}`).join("&");
    const response = await axios.get<TResponse>(`/products?${concatenatedIds}`, {signal});

    return response.data;
  }
   catch (error) {
    return rejectWithValue(axiosErrorHandler(error));
  }
})

export default GetProductsByItems;