
import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "@store/store";
import axios from "axios";

const actLikeToggle = createAsyncThunk("wishlist/actLikeToggle", async(id:number, thunkAPI) => {
    const {rejectWithValue, getState} = thunkAPI;
    const {auth} = getState() as RootState
    try {

        const isRecordExist = await axios.get(`/wishlist?userId=${auth.user?.id}&productId=${id}`)

        if (isRecordExist.data.length > 0) {
            await axios.delete(`/wishlist/${isRecordExist.data[0].id}`);
            return {type: "remove", id};
        } else {
            await axios.post("/wishlist", {userId: auth.user?.id, productId: id});
            return {type: "add", id};
        }
        
    } catch (error) {
        if(axios.isAxiosError(error)) {
            rejectWithValue(error.message)
        } else {
            return rejectWithValue("Undefined Error");
        }
    }
})      

export default actLikeToggle;