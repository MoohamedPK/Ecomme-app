import useProducts from "@hooks/useProducts";
import { TProduct } from "@types/product.types";
import ProductsList from "@components/eCommerce/products/ProductsList"
import Loading from "../feedback/loading/Loading";
import {GridList, Heading } from "@components/common/main";

function Products() {

  const {loading, prod_full_info, error, paramsPrefix} = useProducts();

  return (
    <>
      <Heading title= {`${paramsPrefix?.toUpperCase()} Products`}/>
      <div className="flex items-center flex-wrap gap-y-10 gap-x-8">
        <Loading error={error} loading={loading}>
          <GridList<TProduct> records={prod_full_info} renderItem={(record) => <ProductsList  {...record}/> }/>
        </Loading>
      </div>
    </>
  )
}

export default Products