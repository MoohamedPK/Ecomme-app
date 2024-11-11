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
  .regex(/.*[!@#$%^&*( ) _+{ } ] [\]\\:"; '<>?, ./].*/,
  ),
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

          <label htmlFor="">First Name</label>
          <input className={`my-4 py-1 px-3 border-2 border-neutral-400 rounded-lg w-[300px] outline-none ${errors.firstName?.message ? "border-2 border-red-400" : ''}`} type="text" {...register("firstName")}/>

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