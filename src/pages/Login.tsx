import { Heading } from "@components/common/main";
import Input from "@components/forms/input/Input";
import { useForm , SubmitHandler } from "react-hook-form";
import { SignInSchema,  TFormInputs} from "../validations/SignInSchema";
import { zodResolver } from "@hookform/resolvers/zod";

function Login() {

  const {register, handleSubmit ,formState:{errors}} = useForm<TFormInputs>({
    mode:"onBlur",
    resolver:zodResolver(SignInSchema)
  })

  const loginForm:SubmitHandler<TFormInputs> = (data) => {
    console.log('HHHH', data);
  }

  return (
    <>
      <Heading title="Login"/>

          <form action="" className="flex flex-col items-center" onSubmit={handleSubmit(loginForm)}>

            <Input name='email' type="text" label='Email' error={errors.email?.message} register={register} />
            <Input name='password' type="password" label='Password' error={errors.password?.message} register={register} />

          {/* <label htmlFor="">Email</label>
          <input className="my-4 py-1 px-3 border-2 border-neutral-400 rounded-lg w-[300px]" type="text" name="email" id="" />

          <label htmlFor="">Password</label>
          <input className="my-4 py-1 px-3 border-2 border-neutral-400 rounded-lg w-[300px]" type="password" name="password" id="" /> */}

        <div>
          <button className="bg-blue-400 px-8 py-2 rounded-lg mb-10 mt-5" type="submit">Login</button>
        </div>
      </form>
    </>
  )
}

export default Login