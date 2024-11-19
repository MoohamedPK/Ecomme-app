
type TProductInfo = {
    title: string,
    img: string,
    price: number,
    children?: React.ReactNode,
    direction?: "flex-col", 
}

export const ProductInfo = ({title, img, price, children, direction}:TProductInfo) => {
  return (
    <div className={`flex ${direction} items-center`}>
                <div className="product_img w-[200px] h-[200px] bg-black rounded-lg">
                    <img className="object-cover w-full h-full" src={img} alt={title} />
                </div>

                <div className="ml-7">
                    <div>
                        <h1 className="mb-2">{title}</h1>
                        <p>${price.toFixed(2)}</p>
                    </div>

                    {children}
                </div>
    </div>
  )
}
