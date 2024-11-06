import { NavLink } from "react-router-dom";
import ReusableCompo from "./reusableCompo/ReusableCompo";

function Header() {
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

        <div>
          <NavLink className="mx-2 py-1 px-2" to="login">Log in</NavLink>
          <NavLink className="mx-2 py-1 px-2" to="logout">Log out</NavLink>
        </div>
      </nav>
    </header>
  )
}

export default Header