import Category from "@components/eCommerce/shoppingCart/category/Category";
import Loading from "../feedback/loading/Loading";
import { GridList, Heading } from "@components/common/main";
import useGetCategory from "@hooks/useGetCategory";

function Categories() {

  const {loading, error, records} = useGetCategory();
  return (
    <div className="">  
    <Heading title="Your Categories"/>
    <Loading error = {error} loading= {loading} type="category">
      <GridList records={records} renderItem={(record) => <Category  {...record}/> }/>
    </Loading>
    </div>
  )
}

export default Categories