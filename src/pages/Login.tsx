import { Heading } from "@components/common/main";

function Login() {
  return (
    <>
      <Heading title="Login"/>

          <form action="" className="flex flex-col items-center">

          <label htmlFor="">Email</label>
          <input className="my-4 py-1 px-3 border-2 border-neutral-400 rounded-lg w-[300px]" type="text" name="email" id="" />

          <label htmlFor="">Password</label>
          <input className="my-4 py-1 px-3 border-2 border-neutral-400 rounded-lg w-[300px]" type="password" name="password" id="" />

        <div>
          <button className="bg-blue-400 px-8 py-2 rounded-lg mb-10 mt-5" type="submit">Register</button>
        </div>
      </form>
    </>
  )
}

export default Login