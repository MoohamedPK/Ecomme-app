import { configureStore, combineReducers } from "@reduxjs/toolkit";
import CategoriesReducer from "../store/categories/categoriesSlice";
import productsReducer from "../store/products/productsSlice";
import cartReducer from "../store/Cart/CartSlice";
import WishlistSlice from "./wishlist/Wishlist";
import authSlice from "../store/auth/authSlice";
import orderSlice from "../store/order/orderSlice";

// PRESIST
import { persistStore, persistReducer, FLUSH, REHYDRATE, REGISTER, PAUSE, PERSIST, PURGE } from 'redux-persist';
import storage from "redux-persist/lib/storage";

const rootPersistConfig = {
    key:"root",
    storage,
    whiteList: ["cart", "auth"]
}

const authPersistConfig = {
    key: "auth",
    storage,
    whiteList: ["user", "accessToken"]
}

const Cart_Config = {
    key: "cart",
    storage, 
    whiteList: ["items"]
}

const rootReducer = combineReducers({
    auth: persistReducer(authPersistConfig, authSlice),
    categories: CategoriesReducer,
    prods: productsReducer,
    order:orderSlice,

    // the persist reducer is wrap your app root reducers 
    cart: persistReducer(Cart_Config, cartReducer),
    wishlist: WishlistSlice
})

const persistedReducer = persistReducer(rootPersistConfig, rootReducer)

const store = configureStore ({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, REGISTER, PAUSE, PERSIST, PURGE ],
            }
        })
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


const persistor = persistStore(store);
export {store, persistor};