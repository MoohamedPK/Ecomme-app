import { useAppDispatch, useAppSelector } from "@store/hooks";
import { useEffect, useCallback } from "react";
import GetProductsByItems from "@store/Cart/action/GetProductsByItems";
import { addChangedQuantity, removeItemFromCart, cleanCartProductsFullInfo} from "@store/Cart/CartSlice";
import { resetOrderStatus } from "@store/order/orderSlice";

function useCart() {
    
    const dispatch = useAppDispatch();
    const {items, loading, error, productsFullInfo} = useAppSelector(state => state.cart);
    const userAccessToken = useAppSelector(state => state.auth.accessToken);
    const placeOrderStatus = useAppSelector(state => state.order.loading)

    
    const products = productsFullInfo.map(prod => ({...prod, quantity: items[prod.id]}))
    
    const changeQuantityHandler = useCallback((id:number , quantity: number) => {
        dispatch(addChangedQuantity({id, quantity }));
    }, [dispatch]);
    
    const removeCartItem = useCallback((id:number) => {
        dispatch(removeItemFromCart(id));
    }, [dispatch]);
    
    useEffect(() => {
        const promise = dispatch(GetProductsByItems())

        return () => {
            promise.abort();
            dispatch(cleanCartProductsFullInfo());
            dispatch(resetOrderStatus());
        }
    }, [dispatch])

  return {loading, error, products, changeQuantityHandler, removeCartItem, userAccessToken, placeOrderStatus}
}

export default useCart