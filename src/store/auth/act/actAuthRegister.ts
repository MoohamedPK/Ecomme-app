import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosErrorHandler from "@util/axiosErrorHandler";

type TFormData = {
    firstName: string,
    lastName: string,
    email: string,
    password: string
}

const registerAuthAction = createAsyncThunk("auth/registerAuthAction", async(formData: TFormData, thunkAPI) => {
    const {rejectWithValue} = thunkAPI;

    try {
        const resposne = await axios.post("/users",formData)
        return resposne.data;
    } catch (error) {
        rejectWithValue(axiosErrorHandler(error))
    }
})

export default registerAuthAction