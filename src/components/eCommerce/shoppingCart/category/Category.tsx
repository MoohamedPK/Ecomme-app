import { Link } from "react-router-dom";
import { TCategoty } from "@types";

function Category({title, img, prefix}:TCategoty) {

  return (
    <>
        <div className=" w-[250px] h-[150px] group mt-8 shadow-lg shadow-neutral-300">
            <Link to={`products/${prefix}`}>
                <div className="cat-img  rounded-lg shadow-lg ">
                    <img className="w-[250px] object-cover h-[150px]" src={img} alt={title} />
                </div>

                <div className="title text-center my-3 p-2 font-medium capitalize group-hover:text-red-300">
                    <p>{title}</p>
                </div>
            </Link>
        </div>
    </>
  )
}

export default Category