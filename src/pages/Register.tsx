import { useForm, SubmitHandler } from "react-hook-form"
import { Heading } from "@components/common/main";

type TFormInputs = {
  firstName:string,
  lastName : string,
  email:string,
  password:string,
  confirmPassword:string
}

function Register() {

  // HANDLE SUBMIT prop handle the submit form onClick by passing your function to it as a argument 
  // REGISTER handle the input data 
  const {register, handleSubmit} = useForm<TFormInputs>(); 

  const submitForm: SubmitHandler<TFormInputs> = (data) => {
    console.log(data);
  }

  return (
    <>
      <Heading title="Register"/>

          <form action="" className="flex flex-col items-center" onClick={handleSubmit(submitForm)}>

          <label htmlFor="">First Name</label>
          <input className="my-4 py-1 px-3 border-2 border-neutral-400 rounded-lg w-[300px]" type="text" {...register("firstName")} />

          <label htmlFor="">Last Name</label>
          <input className="my-4 py-1 px-3 border-2 border-neutral-400 rounded-lg w-[300px]" type="text" {...register("lastName")} />

          <label htmlFor="">Email</label>
          <input className="my-4 py-1 px-3 border-2 border-neutral-400 rounded-lg w-[300px]" type="text" {...register("email")} />

          <label htmlFor="">Password</label>
          <input className="my-4 py-1 px-3 border-2 border-neutral-400 rounded-lg w-[300px]" type="password" {...register("password")} />

          <label htmlFor="">Confirm Password</label>
          <input className="my-4 py-1 px-3 border-2 border-neutral-400 rounded-lg w-[300px]" type="password" {...register("confirmPassword")} />

        <div>
          <button className="bg-blue-400 px-8 py-2 rounded-lg mb-10 mt-5" type="submit">Register</button>
        </div>
      </form>
    </>

  )
}

export default Register