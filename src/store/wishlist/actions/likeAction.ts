// import { createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// const toggleLike = createAsyncThunk("wishlist/toggleLike", async(id: number, thunkAPI) => {
    
//     const {rejectWithValue} = thunkAPI;
    
//     try {
//         const isRecordExist = await axios.get(`/wishlist?userId=1&productId=${id}`)
//         console.log(isRecordExist.data);
//         if (isRecordExist.data.length > 0) {
//             await axios.delete(`/wishlist/${isRecordExist.data[0].id}`);
//             return {type: "delete", id};
//         }else {
//             await axios.post("/wishlist", {userId: "1", productId: id});
//             return {type: "add", id};
//         }
//     } catch (error) {
//         if (axios.isAxiosError(error)) {
//             return rejectWithValue(error.message)
//         } else {
//             return rejectWithValue("error undefined")
//         }
//     }
// })

// export default toggleLike;


import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const actLikeToggle = createAsyncThunk("wishlist/actLikeToggle", async(id, thunkAPI) => {
    const {rejectWithValue} = thunkAPI;
    try {

        const isRecordExist = await axios.get(`/wishlist?userId=1&productId=${id}`)

        if (isRecordExist.data.length > 0) {
            await axios.delete(`/wishlist/${isRecordExist.data[0].id}`);
            return {type: "delete", id};
        } else {
            await axios.post("/wishlist", {userId: "1", productId: id});
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