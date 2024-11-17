import { lazy, Suspense } from 'react';
import Lottie from 'lottie-react';
import noProducts from "../assets/lottiFiles/noProducts.json";

// PAGES
// import Home from '@pages/Home';
const Home = lazy(() => import("@pages/Home"))
const Products = lazy(() => import("@pages/Products"))
const Categories = lazy(() => import("@pages/Categories"))
const About = lazy(() => import("@pages/About"))
const LogOut = lazy(() => import("@pages/Register"))
const Login = lazy(() => import("@pages/Login"))
// const Error = lazy(() => import("@pages/Error")) erro shouldn't be on the lazy mode 
const Cart = lazy(() => import("@pages/Cart"))
const WishlistPage = lazy(() => import("@pages/WishlistPage"))
const MainLayouts = lazy(() => import("@components/layouts/MainLayouts/MainLayouts"))
const Profile = lazy(() => import("@pages/Profile"))
import Error from '@pages/Error';

// AUTH PROTECTION 
import AuthProtection from '@components/Auth/AuthProtection';

import {createBrowserRouter , RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path:"/",
    element: (
        <Suspense fallback="Please Wait...">
          <MainLayouts/>
        </Suspense>
      ),
    errorElement: <Error/>,
    children: [{
      index:true,
      element:(
        <Suspense fallback="Please Wait...">
          <Home/>
        </Suspense>
      ) ,
    },
    {
      path:"categories/products/:prefix",
      element:(
        <Suspense fallback={<Lottie animationData={noProducts} className=" flex justify-center items-center size-40 mx-auto"/>}>
          <Products/>
        </Suspense>
      ),
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
    element:(
        <Suspense fallback={<Lottie animationData={noProducts} className=" flex justify-center items-center size-40 mx-auto"/>}>
          <Categories/>
        </Suspense>
      ),
    },
    {
      path:"wishlist",
    element:(
      <AuthProtection>  
        <Suspense fallback={<Lottie animationData={noProducts} className=" flex justify-center items-center size-40 mx-auto"/>}>
          <WishlistPage/>
        </Suspense>
      </AuthProtection>
      ),
    },
    {
      path:"about",
    element:(
        <Suspense fallback="Please Wait...">
          <About/>
        </Suspense>
      ),
    },
    {
      path:"login",
    element:(
        <Suspense fallback="Please Wait...">
          <Login/>
        </Suspense>
      ),
    },
    {
      path:"logout",
    element:(
        <Suspense fallback="Please Wait...">
          <LogOut/>
        </Suspense>
      ),
    },
    {
      path: "cart",
      element: (
        <AuthProtection>
          <Suspense fallback={<Lottie animationData={noProducts} className=" flex justify-center items-center size-40 mx-auto"/>}>
            <Cart/>
          </Suspense>
        </AuthProtection>
      )
    },

    {
      path: "profile",
      element: (
        <AuthProtection>
          <Suspense fallback={<Lottie animationData={noProducts} className=" flex justify-center items-center size-40 mx-auto"/>}>
            <Profile/>
          </Suspense>
        </AuthProtection>
      )
    },
  ]
  },

])

function AppRouter() {
  return <RouterProvider router={router}></RouterProvider>
}

export default AppRouter