import { TProduct } from "@types";
import { CartItems } from "../main";

type CartItemPros = {products: TProduct[]
  changeQuantityHandler: (id:number, quantity:number) => void;
  removeCartItem: (id:number) => void;
};

function CartItemsList({products, changeQuantityHandler, removeCartItem}: CartItemPros) {
    const renderList = products.map(prod => <CartItems key={prod.id} {...prod} changeQuantityHandler={changeQuantityHandler} removeCartItem={removeCartItem}/>)
  return (
    <div>{renderList}</div>
  )
}

export default CartItemsList