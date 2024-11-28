import { Heading } from "@components/common/main";
import { CartItemsList, CartSubtotalPrice } from "@components/eCommerce/main";
import Loading from "../feedback/loading/Loading";
import useCart from "@hooks/useCart";
import LottiHandler from "../feedback/LottiHandler/LottiHandler";

function Cart() {

    const {loading, error, products, changeQuantityHandler, removeCartItem, userAccessToken, placeOrderStatus} = useCart();

  return (
    <>
        <Heading title="Your Cart"/>
    <Loading loading={loading} error={error} type="cart">
        {products.length ? (
            <>
                <CartItemsList products = {products} changeQuantityHandler = {changeQuantityHandler} removeCartItem={removeCartItem}/>
                <CartSubtotalPrice userAccessToken={userAccessToken}  products= {products}/>
            </>
        ) :  (
            placeOrderStatus === "succeeded" ?
                <div className=" text-center font-semibold flex flex-col justify-center items-center">
                    <LottiHandler type="success" message="Your order has been placed successfully"/>
                </div>
                
             : (
                <div className=" text-center font-semibold flex flex-col justify-center items-center">
                    <LottiHandler type="loadingProds" message="Your Cart Is Empty"/>
                </div>
            ) 
        )}
    </Loading>
    </>
  )
}

export default Cart