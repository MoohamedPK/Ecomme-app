import actLikeToggle from "./actions/likeAction";
import actGetWishlist from "./actions/actGetWishlist";
import { createSlice } from "@reduxjs/toolkit";
import { TLoading, TProduct } from "@types";
import { logout } from "@store/auth/authSlice";

interface IWishlistItems {
    itemsId: number[],
    error: null | string,
    loading: TLoading,
    productsFullInfo: TProduct[]
}

const initialState: IWishlistItems = {
    itemsId : [],
    error: null,
    loading: "idle",
    productsFullInfo: []
}

const WishlistSlice = createSlice({
    name: "wishlist",
    initialState,
    reducers: {
        clean_Wishlist_Products_FullInfo: (state) => {
            state.productsFullInfo = [];
        }
    },
    extraReducers: (builder) => {
        builder.addCase(actLikeToggle.pending, (state) => {
            state.error = null
        })
        builder.addCase(actLikeToggle.fulfilled, (state, action) => {
            if (action.payload?.type === "add") {
                state.itemsId.push(action.payload.id);
            } else if (action.payload?.type === "remove") {
                state.itemsId = state.itemsId.filter((el) => el !== action.payload?.id);
                state.productsFullInfo = state.productsFullInfo?.filter((el) => el.id !== action.payload?.id);
            }
        })
        builder.addCase(actLikeToggle.rejected, (state, action) => {  
            if(action.payload && typeof action.payload === "string") {
                state.error = action.payload;
            }
        });

        // get wishlist items
    builder.addCase(actGetWishlist.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actGetWishlist.fulfilled, (state, action) => {
      state.loading = "succeeded";

      if (action.payload.dataType === "productFullInfo") {
        state.productsFullInfo = action.payload.data as TProduct[];
      } else if (action.payload.dataType === "productIds") {
        state.itemsId = action.payload.data as number[];
      }
    });
    builder.addCase(actGetWishlist.rejected, (state, action) => {
      state.loading = "failed";
      if (action.payload && typeof action.payload === "string") {
        state.error = action.payload;
      }
    });

    // when logout reset 
    builder.addCase(logout, (state) => {
        state.itemsId = []
        state.productsFullInfo = []
    })
    }
})

export {actLikeToggle, actGetWishlist}
export const {clean_Wishlist_Products_FullInfo} = WishlistSlice.actions;
export default WishlistSlice.reducer;