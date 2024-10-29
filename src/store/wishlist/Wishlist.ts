// import { createSlice } from "@reduxjs/toolkit";
// import toggleLike from "./actions/likeAction";

// interface IWishlistItems {
//     itemsId : number[],
//     error: null | string
// }
// const initialState: IWishlistItems = {
//     itemsId : [],
//     error: null
// }

// const WishList = createSlice({
//     name: "wishlist",
//     initialState,
//     reducers: {},
//     extraReducers: (builder) => {
//     builder.addCase(toggleLike.pending, (state) => {
//         state.error = null
//     })
//     builder.addCase(toggleLike.pending, (state, action) => {
//         state.error = null;
//         if(action.payload.type === "add") {
//             state.itemsId.push(action.payload.id);
//         }else {
//             state.itemsId = state.itemsId.filter(el => el !== action.payload.id);
//         }
//     })

//     builder.addCase(toggleLike.pending, (state, action) => {
//         // state.error = action.payload
//         if(action.payload && typeof action.payload === "string") {
//             state.error = action.payload;
//         }
//     })
// }
// })

// export {toggleLike};
// export default WishList;


import { createSlice } from "@reduxjs/toolkit";
import actLikeToggle from "./actions/likeAction";

interface IWishlistItems {
    itemsId: number[],
    error: null | string
}

const initialState: IWishlistItems = {
    itemsId : [],
    error: null
}

const WishlistSlice = createSlice({
    name: "wishlist",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(actLikeToggle.pending, (state) => {
            state.error = null
        })
        builder.addCase(actLikeToggle.fulfilled, (state, action) => {
            state.error = null
            if (action.payload.type === "add") {
                state.itemsId.push(action.payload.id);
            } else {
                state.itemsId = state.itemsId.filter(el => el !== action.payload.id);
            }
        })
        builder.addCase(actLikeToggle.rejected, (state, action) => {
            if(action.payload) {
                state.error = action.payload as string
            }
        })
    }
})

export default WishlistSlice.reducer;