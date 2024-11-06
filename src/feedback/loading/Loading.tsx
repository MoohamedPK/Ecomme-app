import React from "react";
import { TLoading } from "@types"; 

type TLoadingProps = {
    loading: TLoading,
    error: null | string,

    // this is how we define a children prop in type || interface
    children: React.ReactNode
}

function Loading({error, loading, children}: TLoadingProps ) {
    if (loading === "pending") {
        return <p>Please Wait...</p>
    }else if (loading === "failed") {
        return <p>{error}</p>
    }

  return (
    <>{children}</>
  )
}

export default Loading