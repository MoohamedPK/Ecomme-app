import { TProduct } from "src/types/product"

type TProdPrice = TProduct[];

const CartSubtotalPrice = ({products}: TProdPrice) => {
 
    const totalPrice = products.reduce((acc, curr) => {

        const price = curr.price;
        const quantity = curr.quantity;

        return acc + price * quantity;
    }, 0)

  return (
        <div className="flex justify-end items-center p-6 mt-8">
            <div className="mx-32">
                <p>Subtotal:</p>
            </div>

            <div>
                <span className="font-bold text-xl">${totalPrice.toFixed(2)}</span>
            </div>
        </div>
  )
}

export default CartSubtotalPrice;