import { useAppSelector, useAppDispatch } from "@store/hooks";
import actGetOrder from "@store/order/act/actGetOrders";
import { Heading } from "@components/common/main";
import { useEffect, useState } from "react";
import Loading from "../feedback/loading/Loading";
import { TProduct } from "@types";
import { ProductInfo } from "@components/eCommerce/productInfo/ProductInfo";
import { resetOrderStatus } from "@store/order/orderSlice";

function Orders() {

  const dispatch = useAppDispatch();
  const {loading, error, orderList} = useAppSelector(state => state.order);

  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<TProduct[]>([]);

  const selectedProductHandler = (id:number) => {
    const productDetails = orderList.find(el => el.id === id )
    
    const newItems = productDetails?.items ?? []
    
    setShowModal(true)
    setSelectedProduct(prev => [...prev, ...newItems])
  }
  
  const closeModalHandler = () => {
    setShowModal(false);
    setSelectedProduct([]);
  }

  useEffect(() => {
    const promise = dispatch(actGetOrder())

    return () => {
      promise.abort()
      dispatch(resetOrderStatus())
    }
  }, [dispatch])

  return (
    <>  
      <Heading title="Your Orders"/>
    <Loading error={error} loading={loading}>

      {/* MODAL */}
      {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto  my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg overflow-y-scroll h-[600px] relative flex flex-col w-[500px] bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Orders
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={closeModalHandler}
                  >
                    <span className="bg-transparent font-bold text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      X
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6">
                  {selectedProduct.map(el => <ProductInfo key={el.id} img={el.img} price={el.price} title={el.title} quantity={el.quantity} />) }
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={closeModalHandler}
                  >
                    Close
                  </button>
                  
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </>
      ) : null}
      {/* END MODAL */}

      <table className="w-full text-center">
        
        <thead >
          <tr >
            <th >Order Number</th>
            <th>Items</th>
            <th>Total Price</th>
          </tr>
        </thead>

        <tbody className="">
          
          {orderList.map((el) => (
            <tr key={el.id} className="">
              <td className="p-2">{el.id}</td>
              <td>{el.items.length} item(s){" / "} <span onClick={() => {selectedProductHandler(el.id)}} className="underline underline-offset-1 cursor-pointer">Product Details</span></td>
              <td>{el.subtotal}</td>
            </tr>
          ))}
        </tbody>

      </table>
    </Loading>
    </>
  )
}

export default Orders;
