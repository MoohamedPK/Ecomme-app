import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import axios from "axios";
import { TProduct } from "src/types/product";

type TResponse = TProduct[];

const GetProductsByItems = createAsyncThunk("cart/GetProductsByItems", async(_, thunkAPI) => {

  const {rejectWithValue, fulfillWithValue ,getState} = thunkAPI;
  const {cart} = getState() as RootState;
  const itemsId  = Object.keys(cart.items);

  if (!itemsId.length) {
    return fulfillWithValue([]);
  }
  
  try {
    const concatenatedIds = itemsId.map(el => `id=${el}`).join("&");
    const response = await axios.get<TResponse>(`/products?${concatenatedIds}`);

    return response.data;
  }
   catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.message);
    } else {
      return rejectWithValue("Unexpected Error")
    }
  }
})

export default GetProductsByItems;