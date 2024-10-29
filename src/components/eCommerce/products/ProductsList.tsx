import { TProduct } from "src/types/product";
import { useAppDispatch } from "@store/hooks";
import { addToCart } from "@store/Cart/CartSlice";
import { useState, useEffect } from "react";
import Spinner from "./Spinner";
import Like from "../../../assets/svg/heart.svg?react";
import ActiveLike from "../../../assets/svg/activeHeart.svg?react";
import actLikeToggle from "@store/wishlist/actions/likeAction";

const ProductsList = ({id, title, img, price, max ,quantity, isLiked}: TProduct ) => {
console.log("fire")
  const dispatch = useAppDispatch();
  const [isBtnClicked, setIsBtnClicked] = useState(false);

  const quantity_remaining = max - (quantity ?? 0)
  const reachedMax = quantity_remaining <= 0 ? true : false;

  const addToCartHandler = () => {
    dispatch(addToCart(id))
    setIsBtnClicked(true);
  }

  useEffect(() => {

    const debounce = setTimeout(() => {
      setIsBtnClicked(false);
      return () => {
        clearTimeout(debounce);
      }
    }, 300)

  }, [isBtnClicked])

  const likeHandler = () => {
    dispatch(actLikeToggle(id))
  }

  return (
    <div key={id}>
      
      <div className="card bg-neutral-400/55 w-[250px] py-3 px-4 rounded-lg relative">

      <div onClick={likeHandler} className="LikeBtn flex justify-center items-center absolute top-0 right-0 w-[28px] h-[28px] cursor-pointer">
        {isLiked ? <ActiveLike/> : <Like/>}
      </div>

        <div className="w-full h-[250px] rounded-lg">
          <img className="w-full h-full object-cover rounded-lg" src={img} alt={title} />
        </div>

        <div>
          <h1>{title}</h1>
          <p>$<span>{price}</span></p>
          <p className="font-light">{quantity_remaining === 0 ? "you reached the limit prods" : `you have only ${quantity_remaining} item to add`}</p>
          <div className="mt-5 text-sm font-medium">
            <button onClick={addToCartHandler} disabled={isBtnClicked || reachedMax} className="py-2 px-3 bg-blue-300 rounded-lg">{isBtnClicked ? <Spinner/> : "Add To Cart"}</button>
          </div>
          
        </div>
      </div>
    </div>
  )
}

export default ProductsList