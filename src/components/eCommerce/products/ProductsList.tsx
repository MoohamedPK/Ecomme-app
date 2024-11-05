import { TProduct } from "src/types/product";
import { useAppDispatch } from "@store/hooks";
import { addToCart } from "@store/Cart/CartSlice";
import { useState, useEffect, memo } from "react";
import Spinner from "./Spinner";
import Like from "../../../assets/svg/heart.svg?react";
import ActiveLike from "../../../assets/svg/activeHeart.svg?react";
import actLikeToggle from "@store/wishlist/actions/likeAction";

const ProductsList = memo(({id, title, img, price, max ,quantity, isLiked}: TProduct ) => {
  console.log("fire prods list")
  const dispatch = useAppDispatch();
  const [isBtnDisabled, setIsBtnDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const quantity_remaining = max - (quantity ?? 0)
  const reachedMax = quantity_remaining <= 0 ? true : false;
  
  useEffect(() => {
    if (!isBtnDisabled) {
      return;
    }

    const debounce = setTimeout(() => {
      setIsBtnDisabled(false);
    }, 300);

    return () => clearTimeout(debounce);
  }, [isBtnDisabled]);

  const addToCartHandler = () => {
    dispatch(addToCart(id));
    setIsBtnDisabled(true);
  };

  const likeToggleHandler = () => {
    if (!isLoading) {
      setIsLoading(true);
      dispatch(actLikeToggle(id))
        .unwrap()
        .then(() => setIsLoading(false))
        .catch(() => setIsLoading(false));
    }
  };

  return (
    <div key={id}>
      
      <div className="card bg-neutral-400/55 w-[250px] py-3 px-4 rounded-lg relative">

      <div onClick={likeToggleHandler} className="LikeBtn flex justify-center items-center absolute top-0 right-0 w-[28px] h-[28px] cursor-pointer">
        {isLoading? <Spinner /> : isLiked ? <ActiveLike/> : <Like/>}
      </div>

        <div className="w-full h-[250px] rounded-lg">
          <img className="w-full h-full object-cover rounded-lg" src={img} alt={title} />
        </div>

        <div>
          <h1>{title}</h1>
          <p>$<span>{price}</span></p>
          <p className="font-light">{quantity_remaining === 0 ? "you reached the limit prods" : `you have only ${quantity_remaining} item to add`}</p>
          <div className="mt-5 text-sm font-medium">
            <button onClick={addToCartHandler} disabled={isBtnDisabled || reachedMax} className="py-2 px-3 bg-blue-300 rounded-lg">{isBtnDisabled ? <Spinner/> : "Add To Cart"}</button>
          </div>
          
        </div>
      </div>
    </div>
  )
})

export default ProductsList