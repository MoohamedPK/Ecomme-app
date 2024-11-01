// PAGES
import Home from '@pages/Home';
import Products from '@pages/Products';
import Categories from '@pages/Categories';
import About from '@pages/About';
import MainLayouts from '@components/layouts/MainLayouts/MainLayouts';
import LogOut from '@pages/LogOut';
import Login from '@pages/Login';
import Error from '@pages/Error';
import Cart from '@pages/Cart';
import WishlistPage from '@pages/WishlistPage';

import {createBrowserRouter , RouterProvider } from 'react-router-dom';


const router = createBrowserRouter([
  {
    path:"/",
    element: <MainLayouts/>,
    errorElement: <Error/>,
    children: [{
      index:true,
      element:<Home/> ,
    },
    {
      path:"categories/products/:prefix",
      element:<Products/>,
      loader: ({ params }) => {
        if ( typeof params.prefix !== "string" || !/^[a-z]+$/i.test(params.prefix)) {
          throw new Response("bad Request", {
            statusText: "Category not found",
            status: 400,
          })
        }
        return true;
      },
    },

    {
      path:"categories",
    element:<Categories/>,
    },
    {
      path:"wishlist",
    element:<WishlistPage/>,
    },
    {
      path:"about",
    element:<About/>,
    },
    {
      path:"login",
    element:<Login/>,
    },
    {
      path:"logout",
    element:<LogOut/>,
    },
    {
      path: "cart",
      element: <Cart/>
    }
  ]
  },

])

function AppRouter() {
  return <RouterProvider router={router}></RouterProvider>
}

export default AppRouter