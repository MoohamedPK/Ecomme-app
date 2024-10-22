import Svg from "../../../assets/svg/cart.svg?react";
import { useAppSelector } from "@store/hooks";
import { getTotalQuantity } from "@store/Cart/selectors";
import style from "./shopingcart.module.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const {basquet_quantity} = style;


function ShoppingCart() {

  const [animate, setAnimate] = useState(false);
  const totalQuantity = useAppSelector(getTotalQuantity);
  const quantity_style = `${animate ? basquet_quantity : ""}`

  const navigate = useNavigate();

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
    <div className="relative cursor-pointer" onClick={() => {navigate("/cart")}}>
        <Svg/>
        <div className={`basquet_quantity w-[22px] h-[22px] bg-blue-400 rounded-full absolute top-[-10px] right-[-8px] text-center font-medium ${quantity_style}`}>{totalQuantity}</div>
    </div>
  )
}

export default ShoppingCart

// basquet_quantity w-[22px] h-[22px] bg-blue-400 rounded-full absolute top-[-10px] right-[-8px] text-center font-medium