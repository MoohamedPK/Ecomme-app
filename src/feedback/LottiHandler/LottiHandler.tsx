import Lottie from 'lottie-react';
import noProducts from "../../assets/lottiFiles/noProducts.json";
import error from "../../assets/lottiFiles/notFound.json";
import loadingProds from "../../assets/lottiFiles/loadingProds.json";

const lottieFiles = {
    noProducts,
    error,
    loadingProds
}

type TLottiProps = {
    type: keyof typeof lottieFiles,
    message?: string
}

function LottiHandler({type, message}: TLottiProps) {

    const lottie = lottieFiles[type];
  return (
    <div>
        <Lottie animationData={lottie} className={type === "error" ? " flex justify-center items-center size-3/12 mx-auto" : "size-40"}/>
        {message &&  <h3>{message}</h3>}
    </div>
  )
}

export default LottiHandler