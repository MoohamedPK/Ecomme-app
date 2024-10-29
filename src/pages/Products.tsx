import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import getProducts from "@store/products/action/getProductsByPrefix"
import { useParams } from "react-router-dom";
import {cleanupProduct} from "../store/products/productsSlice";

import ProductsList from "@components/eCommerce/products/ProductsList"
import Loading from "../feedback/loading/Loading";
import {GridList, Heading } from "@components/common/main";

function Products() {

  const dispatch = useAppDispatch();
  const params = useParams();

  const {records, loading, error} = useAppSelector(state => state.prods)
  const cartItems = useAppSelector(state => state.cart.items)
  const wishlistItemsId = useAppSelector(state => state.wishlist.itemsId);
  
  const prod_full_info = records.map(el => (
    {...el, quantity: cartItems[el.id], isLiked: wishlistItemsId.includes(el.id)}
  )) 

  useEffect(() => {
      dispatch(getProducts(params.prefix as string));
      return () => {
        dispatch(cleanupProduct());
      }
  }, [dispatch, params])

  return (
    <>
      <Heading> <span className="uppercase text-blue-500">{params.prefix}</span> Products</Heading>
      <div className="flex items-center flex-wrap gap-y-10 gap-x-8">
        <Loading error={error} loading={loading}>
          <GridList records={prod_full_info} renderItem={(record) => <ProductsList  {...record}/> }/>
        </Loading>
      </div>
    </>
  )
}

export default Products