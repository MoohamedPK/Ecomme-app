import React from "react";
import { TLoading } from "@types";

// SKELETONS 
import {CartSkeleton, CategorySkeleton, ProductsSkeleton} from "../skeletons/index";

const skeletonsTypes = {
  // the names here should be the same as the names in the TYPE;
  category: CategorySkeleton,
  product:ProductsSkeleton,
  cart: CartSkeleton
}

type TLoadingProps = {
    loading: TLoading,
    error: null | string,

    // this is how we define a children prop in type || interface
    children: React.ReactNode
    
    type?: keyof typeof skeletonsTypes;
}

function Loading({error, loading, children, type = "category"}: TLoadingProps ) {

  const Component = skeletonsTypes[type];

    if (loading === "pending") {
        return <Component/>
    }else if (loading === "failed") {
        return <p>{error}</p>
    }

  return (
    <>{children}</>
  )
}

export default Loading