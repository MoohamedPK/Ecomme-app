import { lazy, Suspense } from 'react';

// PAGES
// import Home from '@pages/Home';
const Home = lazy(() => import("@pages/Home"))
const Products = lazy(() => import("@pages/Products"))
const Categories = lazy(() => import("@pages/Categories"))
const About = lazy(() => import("@pages/About"))
const LogOut = lazy(() => import("@pages/LogOut"))
const Login = lazy(() => import("@pages/Login"))
const Error = lazy(() => import("@pages/Error"))
const Cart = lazy(() => import("@pages/Cart"))
const WishlistPage = lazy(() => import("@pages/WishlistPage"))
const MainLayouts = lazy(() => import("@components/layouts/MainLayouts/MainLayouts"))


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
        <Suspense fallback="Please Wait...">
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
        <Suspense fallback="Please Wait...">
          <Categories/>
        </Suspense>
      ),
    },
    {
      path:"wishlist",
    element:(
        <Suspense fallback="Please Wait...">
          <WishlistPage/>
        </Suspense>
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
        <Suspense fallback="Please Wait...">
          <Cart/>
        </Suspense>
      )
    }
  ]
  },

])

function AppRouter() {
  return <RouterProvider router={router}></RouterProvider>
}

export default AppRouter