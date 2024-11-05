
import style from "../headerCounter/shopingcart.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect  } from "react";

type HeaderCounterProps = {
  navigation: string, 
  svgIcon: React.ReactNode,
  totalQuantity: number
}

const {basquet_quantity} = style;

function HeaderCounter({navigation, svgIcon, totalQuantity }:HeaderCounterProps) {

  const [animate, setAnimate] = useState(false);
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
    <div className="relative cursor-pointer before:content-[''] before:absolute before:right-9 before:w-[2px] before:h-full before:bg-black" onClick={() => navigate({navigation})}>
        {svgIcon}
        <div className={`basquet_quantity w-[22px] h-[22px] bg-blue-400 rounded-full absolute top-[-10px] right-[-8px] text-center font-medium ${quantity_style}`}>{totalQuantity}</div>
    </div>
  )
}

export default HeaderCounter