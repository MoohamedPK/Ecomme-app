import { Link , useRouteError, isRouteErrorResponse} from "react-router-dom"


function Error() {
  
  //this hook returns all the response 
  const error = useRouteError()
  let statusError:number;
  let statusText:string;

  if (isRouteErrorResponse(error)) {
    statusError = error.status;
    statusText = error.statusText;
  } else {
    statusError = 404;
    statusText = "Page Not Found";
  }

  return (
    <div className="text-center">
        <h1 className="text-6xl font-bold">{statusError}</h1>
        <p className="font-medium my-3">{statusText}</p>

        {/* replace for not bring you back to this page */}
        <Link className="text-blue-500 font-medium mt-2" to="/" replace={true}>Go Back To Safety</Link>
    </div>
  )
}

export default Error