import { TProduct } from "@types";
import { useAppDispatch } from "@store/hooks";
import { addToCart } from "@store/Cart/CartSlice";
import { useState, useEffect, memo } from "react";
import Spinner from "./Spinner";
import Like from "../../../assets/svg/heart.svg?react";
import ActiveLike from "../../../assets/svg/activeHeart.svg?react";
import actLikeToggle from "@store/wishlist/actions/likeAction";
import { ProductInfo } from "../productInfo/ProductInfo";

const ProductsList = memo(({id, title, img, price, max ,quantity, isLiked, isAuthenticated}: TProduct ) => {
  const dispatch = useAppDispatch();
  const [isBtnDisabled, setIsBtnDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

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

    if(isAuthenticated) {

      if (!isLoading) {
        setIsLoading(true);
        dispatch(actLikeToggle(id))
          .unwrap()
          .then(() => setIsLoading(false))
          .catch(() => setIsLoading(false));
      }
    } else {
      setShowModal(true);
    }
  };

  return (


    <>
      
      {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Login Required
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                    Please login to add product to your wishlist
                    
                  </p>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
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
    </>
  )
})

export default ProductsList