import { configureStore, combineReducers } from "@reduxjs/toolkit";
import CategoriesReducer from "../store/categories/categoriesSlice";
import productsReducer from "../store/products/productsSlice";
import cartReducer from "../store/Cart/CartSlice";

// PRESIST
import { persistStore, persistReducer, FLUSH, REHYDRATE, REGISTER, PAUSE, PERSIST, PURGE } from 'redux-persist';
import storage from "redux-persist/lib/storage";

const Cart_Config = {
    key: "cart",
    storage, 
    whiteList: ["items"]
}

const rootReducer = combineReducers({
    categories: CategoriesReducer,
    prods: productsReducer,
    // the persist reducer is wrap your app root reducers 
    cart: persistReducer(Cart_Config, cartReducer),
})

const store = configureStore ({
    reducer: rootReducer,
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