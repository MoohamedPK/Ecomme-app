import { TProduct } from "@types";
import { useState } from "react";
import actPlaceOrder from "@store/order/act/actPlaceOrder";
import { useAppDispatch } from "@store/hooks";
import { clearCartAfterPlaceorder } from "@store/Cart/CartSlice";
import Spinner from "../products/Spinner";

type TProdPrice = {
  products: TProduct[];
  userAccessToken: string | null
};

const CartSubtotalPrice = ({products, userAccessToken}: TProdPrice) => {

    const [showModal, setShowModal] = useState(false);
    const dispatch = useAppDispatch();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null >(null);

    const totalPrice = products.reduce((acc, curr) => {
        const price = curr.price;
        const quantity = curr.quantity as number;

        return acc + price * quantity ;
    }, 0);

    const modalHandler = () => {
        setShowModal(!showModal)
        setError(null)
    }
    const placeOrderHandler = () => {
        dispatch(actPlaceOrder(totalPrice))
        .unwrap()
        .then(() => {dispatch(clearCartAfterPlaceorder())
          setShowModal(false)
        })
        .catch((error) => {setError(error)})
        .finally(() => {setLoading(false)})
    }

  return (
    <>
      
      {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Order Confirmation
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={modalHandler}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                    Are you sure you want to place order with Total Of:{" "}
                    <span className="bg-blue-300 p-1 rounded-lg text-base font-semibold">
                        ${totalPrice.toFixed(2)}
                    </span>
                  </p>
                  {!loading && error && (
                    <p>{error}</p>
                  )} 
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={modalHandler}
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={placeOrderHandler}
                  >
                    {loading ? (
                      <>
                        <Spinner /> 
                      </>
                    ): "Confirm"}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    <div className="flex justify-end">
        <div className=" p-6 mt-8 w-fit">
            <div className="flex justify-end items-center">
                <div className="mx-32">
                    <p>Subtotal:</p>
                </div>

                <div>
                    <span className="font-bold text-xl">${totalPrice.toFixed(2)}</span>
                </div>
            </div>

            {userAccessToken && (
              <div className="flex justify-end mt-10" onClick={modalHandler}>
                  <button className="py-2 px-3 bg-blue-300 rounded-lg">Place Order</button>
              </div>
            )}

        </div>
    </div>
    </>
  )
}

export default CartSubtotalPrice;