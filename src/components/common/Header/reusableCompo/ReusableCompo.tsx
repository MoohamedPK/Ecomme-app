import HeaderCounter from "../headerCounter/HeaderCounter";
import WishlistIcon from "../../../../assets/svg/wishlist.svg?react";
import CartIcon from "../../../../assets/svg/cart.svg?react";
import { getTotalQuantity } from "@store/Cart/selectors";
import { useAppSelector } from "@store/hooks";

function ReusableCompo() {
    
  const wishlistTotalQuantity = useAppSelector((state) => state.wishlist.itemsId.length);
  
  const cartTotalQuantity = useAppSelector(getTotalQuantity);

  return (
    <div className="flex items-center">
          
          <HeaderCounter  svgIcon= {<WishlistIcon/>} totalQuantity= {wishlistTotalQuantity} page="wishlist"/>
          <HeaderCounter svgIcon= {<CartIcon/>} totalQuantity= {cartTotalQuantity} page="cart"/>

    </div>
  )
}

export default ReusableCompo