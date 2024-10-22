import {Header, Footer} from "../../common/main";
import { Outlet } from "react-router-dom";

function MainLayouts() {

  return (
    <div className="container flex flex-col h-screen px-[15px] mx-auto">
      <Header/>

      <div className="wrapper mt-8"><Outlet/></div>

    <Footer/>
    </div>
  )
}

export default MainLayouts