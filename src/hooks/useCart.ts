import { useAppDispatch, useAppSelector } from "@store/hooks";
import { useEffect, useCallback } from "react";
import GetProductsByItems from "@store/Cart/action/GetProductsByItems";
import { addChangedQuantity, removeItemFromCart, cleanCartProductsFullInfo} from "@store/Cart/CartSlice";

function useCart() {
    
    const dispatch = useAppDispatch();
    const {items, loading, error, productsFullInfo} = useAppSelector(state => state.cart);

    useEffect(() => {
        const promise = dispatch(GetProductsByItems())

        return () => {
            promise.abort();
            dispatch(cleanCartProductsFullInfo());
        }
    }, [dispatch])

    const products = productsFullInfo.map(prod => ({...prod, quantity: items[prod.id]}))

    const changeQuantityHandler = useCallback((id:number , quantity: number) => {
        dispatch(addChangedQuantity({id, quantity }));
    }, [dispatch]);

    const removeCartItem = useCallback((id:number) => {
        dispatch(removeItemFromCart(id));
    }, [dispatch]);

  return {loading, error, products, changeQuantityHandler, removeCartItem}
}

export default useCart