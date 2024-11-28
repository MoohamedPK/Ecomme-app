import { Outlet, Link } from "react-router-dom"
const ProfileLayout = () => {
  return (
    <div className="grid grid-cols-12 gap-x-5">
        <div className="col-span-2 bg-blue-300 h-screen p-2">
            <ul className="flex flex-col space-y-4">
                <Link to=''>Profile Info</Link>
                <Link to='orders'>Orders</Link>
            </ul>
        </div>

        <div className="col-span-10">
            <Outlet/>
        </div>
    </div>
  )
}

export default ProfileLayout