import { GridList, Heading } from "@components/common/main";
import Loading from "../feedback/loading/Loading";
import ProductsList from "@components/eCommerce/products/ProductsList";
import { TProduct } from "@types";
import useWishlist from "@hooks/useWishlist";

function WishlistPage() {
  const {error, loading, wishlist_records} = useWishlist();

  return (
    <>
      <Heading title="Your Wishlist"/>
        <Loading loading={loading} error={error} type="product">
          <div className="flex items-center flex-wrap gap-y-10 gap-x-8">
            <GridList<TProduct> records={wishlist_records} renderItem={(record) => <ProductsList  {...record}/> } />
          </div>
        </Loading>
    </>
  )
}

export default WishlistPage
