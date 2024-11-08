import { Link} from "react-router-dom"
import LottiHandler from "../feedback/LottiHandler/LottiHandler"

function Error() {

  return (
    <div className="text-center">
        <LottiHandler type="error"/>
        {/* replace for not bring you back to this page */}
        <Link className="text-blue-500 font-medium mt-2" to="/" replace={true}>Go Back To Safety</Link>
    </div>
  )
}

export default Error