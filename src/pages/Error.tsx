import { Link} from "react-router-dom"
import Lottie from "lottie-react";
import notFound from "../assets/lottiFiles/notFound.json";

function Error() {

  return (
    <div className="text-center">
        <Lottie animationData={notFound} className=" flex justify-center items-center size-3/12 mx-auto"/>
        {/* replace for not bring you back to this page */}
        <Link className="text-blue-500 font-medium mt-2" to="/" replace={true}>Go Back To Safety</Link>
    </div>
  )
}

export default Error