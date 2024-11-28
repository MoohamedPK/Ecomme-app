import { useAppSelector } from "@store/hooks"
import { Heading } from "@components/common/main"

function Profile() {

  const accountInfo = useAppSelector(state => state.auth.user);

  return (
    <>
      <Heading title='Account Info'/>

      <div>
        <ul className="flex flex-col">
          <li>First Name: {accountInfo?.firstName}</li>
          <li>Last Name : {accountInfo?.lastName}</li>
          <li>Email : {accountInfo?.email}</li>
        </ul>
      </div>
    </>
  )
}

export default Profile