import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosErrorHandler from "@util/axiosErrorHandler";
import axios from "axios";

type TLoginData = {
    email: string,
    password: string
}

type TResponse = {
    accessToken: string,
    user: {
        id : number
        firstName: string,
        lastName:string,
        email:string,
    }
}

const logInAction = createAsyncThunk("login/logInAction", async(loginData:TLoginData, thunkAPI) => {

    const {rejectWithValue} = thunkAPI;

    try {
        const response = await axios.post<TResponse>("/signin", loginData);
        return response.data
    } catch (error) {
        return rejectWithValue(axiosErrorHandler(error))
    }
})

export default logInAction