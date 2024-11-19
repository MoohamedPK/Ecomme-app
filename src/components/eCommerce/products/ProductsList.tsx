import { TProduct } from "@types";
import { useAppDispatch } from "@store/hooks";
import { addToCart } from "@store/Cart/CartSlice";
import { useState, useEffect, memo } from "react";
import Spinner from "./Spinner";
import Like from "../../../assets/svg/heart.svg?react";
import ActiveLike from "../../../assets/svg/activeHeart.svg?react";
import actLikeToggle from "@store/wishlist/actions/likeAction";
import { ProductInfo } from "../productInfo/ProductInfo";

const ProductsList = memo(({id, title, img, price, max ,quantity, isLiked}: TProduct ) => {
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
    <div key={id} className="card bg-neutral-400/55 w-[250px] py-3 px-4 rounded-lg relative">
      
      <ProductInfo title={title} price={price} img={img} direction="flex-col">

      <div onClick={likeToggleHandler} className="LikeBtn flex justify-center items-center absolute top-0 right-0 w-[28px] h-[28px] cursor-pointer">
        {isLoading? <Spinner /> : isLiked ? <ActiveLike/> : <Like/>}
      </div>

          
          <div className="mt-5 text-sm font-medium">
            <button onClick={addToCartHandler} disabled={isBtnDisabled || reachedMax} className="py-2 px-3 bg-blue-300 rounded-lg">{isBtnDisabled ? <Spinner/> : "Add To Cart"}</button>
          </div>
          
      </ProductInfo>
    </div>
  )
})

export default ProductsList