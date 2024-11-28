import style from "../../Header/headerCounter/shopingcart.module.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type HeaderCounterProps = {
  svgIcon: React.ReactNode,
  totalQuantity: number,
  page: string,
}

const {basquet_quantity} = style;

function HeaderCounter({svgIcon, totalQuantity, page}: HeaderCounterProps) { 
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
    <div className="relative cursor-pointer mr-6 " onClick={() => navigate(page)}>
      
        {svgIcon}
        {totalQuantity > 0 && (
            <div className={`basquet_quantity w-[22px] h-[22px] bg-blue-400 rounded-full absolute top-[-10px] right-[-8px] text-center font-medium  ${quantity_style}`}>{totalQuantity}</div>
          )}
    </div>
  )
}

export default HeaderCounter