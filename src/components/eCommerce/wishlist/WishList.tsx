import { Link } from "react-router-dom";
import WishlistIcon from "../../../assets/svg/wishlist.svg?react";
import style from "../shoppingCart/shopingcart.module.css";
import { useAppSelector } from "@store/hooks";
import { useEffect, useState } from "react";

const {basquet_quantity} = style;

function WishList() {  

    const [animate, setAnimate] = useState(false);
    const totalQuantity = useAppSelector(state => state.wishlist.itemsId);
    const quantity_style = `${animate ? basquet_quantity : ""}`

    useEffect (() => {
    // if there the quantity = 0 don't animate 
    if (!totalQuantity) {
      return;
    }
    setAnimate(true);

    const bounce = setTimeout(() => {
      setAnimate(false);
    }, 300)

    return () => {
      clearTimeout(bounce);
    }
  }, [totalQuantity]);

  return (
    <Link to={"/wishlist"} className="relative cursor-pointer mr-6 ">
        <WishlistIcon/>
        {totalQuantity.length > 0 && (
            <div className={`basquet_quantity w-[22px] h-[22px] bg-blue-400 rounded-full absolute top-[-10px] right-[-8px] text-center font-medium  ${quantity_style}`}>{totalQuantity.length}</div>
        )}
    </Link>
  )
}

export default WishList