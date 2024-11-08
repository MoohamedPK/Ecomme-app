import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { actGetWishlist, clean_Wishlist_Products_FullInfo } from "@store/wishlist/Wishlist";

function useWishlist() {

  const dispatch = useAppDispatch();
  const {error, loading, productsFullInfo} = useAppSelector((state) => state.wishlist);
  const cartItems = useAppSelector(state => state.cart.items)

  useEffect(() => {
    const promise = dispatch(actGetWishlist());

    return () => {
      promise.abort();
      dispatch(clean_Wishlist_Products_FullInfo());
    }
  }, [dispatch])

  const wishlist_records = productsFullInfo.map(prod => (
    {...prod, quantity: cartItems[prod.id], isLiked: true}
))

  return {loading, error, wishlist_records}
}

export default useWishlist