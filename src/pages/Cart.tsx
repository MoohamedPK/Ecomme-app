import { Heading } from "@components/common/main";
import { CartItemsList, CartSubtotalPrice } from "@components/eCommerce/main";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { useEffect, useCallback } from "react";
import GetProductsByItems from "@store/Cart/action/GetProductsByItems";
import { addChangedQuantity } from "@store/Cart/CartSlice";
import Loading from "src/feedback/loading/Loading";

function Cart() {

    const dispatch = useAppDispatch();
    const {items, loading, error, productsFullInfo} = useAppSelector(state => state.cart);

    useEffect(() => {
        dispatch(GetProductsByItems())
    }, [dispatch])

    const products = productsFullInfo.map(prod => ({...prod, quantity: items[prod.id]}))

    const changeQuantityHandler = useCallback((id:number , quantity: number) => {
        dispatch(addChangedQuantity({id, quantity }));
    }, [dispatch]);

  return (
    <>
        <Heading>Cart</Heading>
    <Loading loading={loading} error={error}>
        <>
            <CartItemsList products = {products} changeQuantityHandler = {changeQuantityHandler}/>
            <CartSubtotalPrice/>
        </>
    </Loading>
    </>
  )
}

export default Cart