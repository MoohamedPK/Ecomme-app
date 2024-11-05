import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { actGetWishlist, clean_Wishlist_Products_FullInfo } from "@store/wishlist/Wishlist";
import { GridList, Heading } from "@components/common/main";
import Loading from "src/feedback/loading/Loading";
import ProductsList from "@components/eCommerce/products/ProductsList";
import { TProduct } from "src/types/product";

function WishlistPage() {

  const dispatch = useAppDispatch();
  const {error, loading, productsFullInfo} = useAppSelector((state) => state.wishlist);
  const cartItems = useAppSelector(state => state.cart.items)

  useEffect(() => {
    dispatch(actGetWishlist());

    return () => {
      dispatch(clean_Wishlist_Products_FullInfo());
    }
  }, [dispatch])

  const wishlist_records = productsFullInfo.map(prod => (
    {...prod, quantity: cartItems[prod.id], isLiked: true}
))

  return (
    <>
      <Heading title="Your Wishlist"/>
        <Loading loading={loading} error={error}>
          <div className="flex items-center flex-wrap gap-y-10 gap-x-8">
            <GridList<TProduct> records={wishlist_records} renderItem={(record) => <ProductsList  {...record}/> } />
          </div>
        </Loading>
    </>
  )
}

export default WishlistPage
