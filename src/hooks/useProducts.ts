import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import getProducts from "@store/products/action/getProductsByPrefix"
import { useParams } from "react-router-dom";
import {cleanupProduct} from "../store/products/productsSlice";

function useProducts() {
    
  const dispatch = useAppDispatch();
  const params = useParams();
  const paramsPrefix = params.prefix;
  const {records, loading, error} = useAppSelector(state => state.prods)
  const cartItems = useAppSelector(state => state.cart.items)
  const wishlistItemsId = useAppSelector(state => state.wishlist.itemsId);

  const userAccessToken = useAppSelector(state => state.auth.accessToken);
  
  
  useEffect(() => {
    const promise = dispatch(getProducts(params.prefix as string));

    return () => {
      promise.abort();
      dispatch(cleanupProduct());
    }
  }, [dispatch, params])
  
  const prod_full_info = records.map(el => (
    {...el, quantity: cartItems[el.id], isLiked: wishlistItemsId.includes(el.id), isAuthenticated: userAccessToken ? true : false}
  )) 

  return {loading, error, prod_full_info, paramsPrefix}
}

export default useProducts