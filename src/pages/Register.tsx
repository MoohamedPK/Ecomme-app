import { useForm, SubmitHandler } from "react-hook-form"
import { Heading } from "@components/common/main";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";


const registerSchema = z.object({
  firstName: z.string().min(1, {message: "First Name Is Required"}),
  lastName: z.string().min(1, {message: "Last Name Is Required"}),
  email: z.string().min(1, {message: "Email Is Required"}).email(),
  password: z.string().min(8, {message: "Password contains at least 8 characters"})

  // regex for using a special charachters 
  .regex(/.*[!@#$%^&*( ) _+{ } ] [\]\\:"; '<>?, ./].*/),
  confirmPassword: z.string().min(8, {message: "Confirm Password Is Required"}),
}).refine(val => val.password === val.confirmPassword, {
    message: "Your Password Is Not Correct",

    // path allows you to decide where the message display (it takes ARRAY)
    path: ["confirmPassword"]
  })

type TFormInputs = z.infer<typeof registerSchema>

function Register() {

  // HANDLE SUBMIT prop handle the submit form onClick by passing your function to it as a argument 
  // REGISTER handle the input data (the name="")
  const {register, handleSubmit, formState:{errors}} = useForm<TFormInputs>({
    resolver: zodResolver(registerSchema)
  }); 

  
  const submitForm: SubmitHandler<TFormInputs> = (data) => {
    console.log(data);
  }

  return (
    <>
      <Heading title="Register"/>

          <form action="" className="flex flex-col items-center" onSubmit={handleSubmit(submitForm)}>

          <label htmlFor="" className="my-2 flex flex-col">First Name
            <input className={`my-1 py-1 px-3 border-2 border-neutral-400 rounded-lg w-[300px] outline-none ${errors.firstName?.message ? "border-2 border-red-400" : ''}`} type="text" {...register("firstName")}/>
            <span className="text-xs text-red-400 font-semibold">{errors.firstName?.message}</span>
          </label>

          <label htmlFor="" className="my-2 flex flex-col">Last Name   
            <input className={`my-1 py-1 px-3 border-2 border-neutral-400 rounded-lg w-[300px] outline-none ${errors.lastName?.message ? "border-2 border-red-400" : ''}`} type="text" {...register("lastName")} />
            <span className="text-xs text-red-400 font-semibold">{errors.lastName?.message}</span>
          </label>

          <label htmlFor="" className="my-2 flex flex-col">Email
            <input className={`my-1 py-1 px-3 border-2 border-neutral-400 rounded-lg w-[300px] outline-none ${errors.email?.message ? "border-2 border-red-400" : ''}`} type="text" {...register("email")} />
            <span className="text-xs text-red-400 font-semibold">{errors.email?.message}</span>
          </label>

          <label htmlFor="" className="my-2 flex flex-col">Password
            <input className={`my-1 py-1 px-3 border-2 border-neutral-400 rounded-lg w-[300px] outline-none ${errors.password?.message ? "border-2 border-red-400" : ''}`} type="password" {...register("password")} />
            <span className="text-xs text-red-400 font-semibold">{errors.password?.message}</span>
          </label>

          <label htmlFor="" className="my-2 flex flex-col">Confirm Password
            <input className={`my-1 py-1 px-3 border-2 border-neutral-400 rounded-lg w-[300px] outline-none ${errors.confirmPassword?.message ? "border-2 border-red-400" : ''}`} type="password" {...register("confirmPassword")} />
            <span className="text-xs text-red-400 font-semibold">{errors.confirmPassword?.message}</span>
          </label>

        <div>
          <button className="bg-blue-400 px-8 py-2 rounded-lg mb-10 mt-5" type="submit">Register</button>
        </div>
      </form>
    </>

  )
}

export default Register