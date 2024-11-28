
type TProductInfo = {
    title: string,
    img: string,
    price: number,
    children?: React.ReactNode,
    direction?: "flex-col", 
    quantity: number | undefined
}

export const ProductInfo = ({title, img, price, children, direction, quantity}:TProductInfo) => {
  
  return (
    <div className={`flex ${direction} items-center my-3`}>
                <div className="product_img w-[200px] h-[200px] bg-black rounded-lg">
                    <img className="object-cover w-full h-full" src={img} alt={title} />
                </div>

                <div className="ml-7">
                    <div>
                        <h1 className="mb-2">{title}</h1>
                        <p>${price.toFixed(2)}</p>
                    </div>

                    {children}
                {quantity && <h3>total quantity: {quantity}</h3>}
                {quantity && <h3>total price: {(quantity * price).toFixed(2)}</h3>}
                </div>

    </div>
  )
}
