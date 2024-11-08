import { Heading } from "@components/common/main";
import { CartItemsList, CartSubtotalPrice } from "@components/eCommerce/main";
import Loading from "../feedback/loading/Loading";
import useCart from "@hooks/useCart";

function Cart() {

    const {loading, error, products, changeQuantityHandler, removeCartItem} = useCart();

  return (
    <>
        <Heading title="Your Cart"/>
    <Loading loading={loading} error={error} type="cart">
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