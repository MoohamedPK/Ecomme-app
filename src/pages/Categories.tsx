import Category from "@components/eCommerce/shoppingCart/category/Category";
import Loading from "../feedback/loading/Loading";
import { GridList, Heading } from "@components/common/main";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import getCategories from "@store/categories/action/catGetCategories";
import { useEffect } from "react";

function Categories() {

  const dispatch = useAppDispatch();
  const {records, error, loading} = useAppSelector(state => state.categories);

  useEffect(() => {
    if (!records.length) {
      dispatch(getCategories());
    }
  }, [dispatch, records])


  return (
    <div className="">  
    <Heading title="Your Categories"/>
    <Loading error = {error} loading= {loading}>
      <GridList records={records} renderItem={(record) => <Category  {...record}/> }/>
    </Loading>
    </div>
  )
}

export default Categories