import { NavLink } from "react-router-dom";
import ReusableCompo from "./reusableCompo/ReusableCompo";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "@store/hooks";
import { logout } from "@store/auth/authSlice";

function Header() {

  const disptach = useAppDispatch()
  const [isOpen, setIsOpen] = useState(false);
  const {accessToken ,user} = useAppSelector(state => state.auth)

    const handleDropDown = () => {
      setIsOpen(!isOpen)
  }

  return (
    <header className="">
      
      <div className="main flex justify-between py-3 px-6">
        <div className="logo">
          <h1>My<span> Ecom</span></h1>
        </div>

        <ReusableCompo/>
      </div>

      <nav className=" flex justify-between items-center bg-neutral-800 text-neutral-400">
        <ul className="flex items-center py-3 px-6 ">
          <li  className=" py-1 px-3 mx-2 "> <NavLink to="/">Home</NavLink> </li>
          <li className="py-1 px-3 mx-2"><NavLink to="products">Products</NavLink></li>
          <li className="py-1 px-3 mx-2"><NavLink to="categories">Categories</NavLink></li>
          <li className="py-1 px-3 mx-2"><NavLink to="about">About</NavLink></li>
        </ul>

        <div className="flex items-center mx-3">

          {!accessToken ? (
            <div>
              <NavLink className="mx-2 py-1 px-2" to="logout">Register</NavLink>
              <NavLink className="mx-2 py-1 px-2" to="login">Log in</NavLink>
            </div>
            
          ) : (
          <div className="dropdown">
            <div className="dropdown_items" onClick={handleDropDown}>
              <div className="relative cursor-pointer">{`${user?.firstName} ${user?.lastName}`}

                {isOpen && (
                  <div className="absolute top-10 right-1 bg-gray-400/80 w-[120px] text-center py-3 flex flex-col text-black">
                    <Link to={"profile"} className="my-1">profile</Link>
                    <Link to={"/"} className="my-3">orders</Link>
                    <Link to={''} onClick={() => {disptach(logout())}} className="my-1 before:w-full before:h-[1px] before:bg-gray-400 before:absolute before:left-0 ">logOut</Link>
                </div>
                )}
              </div>
                
            </div>
          </div>
          )}

        </div>
      </nav>
    </header>
  )
}

export default Header