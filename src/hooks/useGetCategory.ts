import { useAppDispatch, useAppSelector } from "@store/hooks";
import getCategories from "@store/categories/action/catGetCategories";
import { useEffect } from "react";

function useGetCategory() {
      const dispatch = useAppDispatch();
  const {records, error, loading} = useAppSelector(state => state.categories);

  useEffect(() => {
    // if (!records.length) {
      const promise = dispatch(getCategories());

      return () => {
        promise.abort();
      }
    // }

  }, [dispatch])

  return {error, loading, records}
}

export default useGetCategory