import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosErrorHandler from "@util/axiosErrorHandler";
import axios from "axios";
import { RootState } from "@store/store";


const actGetOrder = createAsyncThunk("orders/actGetOrder", async(_, {rejectWithValue, getState, signal}) => {

    const {auth} = getState() as RootState;

    try {

        const response = await axios.get(`/orders?userId=${auth.user?.id}`, {signal})

        return response.data
        
    } catch (error) {
        rejectWithValue(axiosErrorHandler(error))
    }
})




export default actGetOrder;