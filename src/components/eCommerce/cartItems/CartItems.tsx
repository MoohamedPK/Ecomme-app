import { TProduct } from "src/types/product";
import { memo } from "react";


type CartItemsProps = TProduct & {changeQuantityHandler: (id:number, quantity:number) => void; removeCartItem: (id:number) => void};


const CartItems = memo(({title, img, price, max, quantity , changeQuantityHandler, id, removeCartItem}: CartItemsProps) => {
    // we change the max value to render it as an options elements
    const maxOption = Array(max).fill(0).map((_, index) =>{
        const quantity= ++index
        return (
            <option key={quantity} value={quantity}>{quantity}</option>
        )
})

    const changedQuantity = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const quantityValue = +e.target.value; 
        changeQuantityHandler(id, quantityValue);
    };

  return (
    <div className="main">
        <div className="product flex justify-between items-center my-5">
            <div className="flex items-center ">
                <div className="product_img w-[200px] h-[200px] bg-black rounded-lg">
                    <img className="object-cover w-full h-full" src={img} alt={title} />
                </div>

                <div className="ml-7">
                    <div>
                        <h1 className="mb-2">{title}</h1>
                        <p>${price.toFixed(2)}</p>
                    </div>

                    <div className="mt-8">
                        <button onClick={() => removeCartItem(id)} className="bg-neutral-500 rounded-lg px-3 text-white py-1">Remove</button>
                    </div>
                </div>
            </div>

            <div className="cartItemSelection mx-6 flex flex-col ">
                <span className="mb-4">Quantity</span>

                <select name="" id="" value={quantity} onChange={changedQuantity}>
                    {maxOption}
                </select>
            </div>
        </div>
        
    </div>
  )
})

export default CartItems

