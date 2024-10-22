import { TProduct } from "src/types/product";
import { CartItems } from "../main";

type CartItemPros = {products: TProduct[]
  changeQuantityHandler: (id:number, quantity:number) => void
};

function CartItemsList({products, changeQuantityHandler}: CartItemPros) {
    const renderList = products.map(prod => <CartItems key={prod.id} {...prod} changeQuantityHandler={changeQuantityHandler}/>)
  return (
    <div>{renderList}</div>
  )
}

export default CartItemsList