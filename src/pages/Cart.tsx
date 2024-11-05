import { Heading } from "@components/common/main";
import { CartItemsList, CartSubtotalPrice } from "@components/eCommerce/main";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { useEffect, useCallback } from "react";
import GetProductsByItems from "@store/Cart/action/GetProductsByItems";
import { addChangedQuantity, removeItemFromCart, cleanCartProductsFullInfo} from "@store/Cart/CartSlice";
import Loading from "src/feedback/loading/Loading";

function Cart() {

    const dispatch = useAppDispatch();
    const {items, loading, error, productsFullInfo} = useAppSelector(state => state.cart);

    useEffect(() => {
        dispatch(GetProductsByItems())

        return () => {
            dispatch(cleanCartProductsFullInfo());
        }
    }, [dispatch])

    const products = productsFullInfo.map(prod => ({...prod, quantity: items[prod.id]}))

    const changeQuantityHandler = useCallback((id:number , quantity: number) => {
        dispatch(addChangedQuantity({id, quantity }));
    }, [dispatch]);

    const removeCartItem = useCallback((id:number) => {
        dispatch(removeItemFromCart(id));
    }, [dispatch])

  return (
    <>
        <Heading title="Your Cart"/>
    <Loading loading={loading} error={error}>
        {products.length ? (
            <>
                <CartItemsList products = {products} changeQuantityHandler = {changeQuantityHandler} removeCartItem={removeCartItem}/>
                <CartSubtotalPrice products= {products}/>
            </>
        ) : <div className=" text-center font-semibold ">Your Cart Is Empty</div>}
    </Loading>
    </>
  )
}

export default Cart