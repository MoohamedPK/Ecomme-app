import { Heading } from "@components/common/main";
import Input from "@components/forms/input/Input";
import { useForm , SubmitHandler } from "react-hook-form";
import { SignInSchema,  TFormInputs} from "../validations/SignInSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import logInAction from "@store/auth/act/actLogin";
import { useNavigate } from "react-router-dom";
import Spinner from "@components/eCommerce/products/Spinner";
import { resetLogin } from "@store/auth/authSlice";
import { useEffect } from "react";

function Login() {

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {error, loading} = useAppSelector(state => state.auth)


  // const {error, loading} = useAppSelector(state => state.auth)
  const [searchParams, setSearchParams] = useSearchParams();
  const {register, handleSubmit ,formState:{errors}} = useForm<TFormInputs>({
    mode:"onBlur",
    resolver:zodResolver(SignInSchema)
  })

  const loginForm:SubmitHandler<TFormInputs> = (data) => {
    if (searchParams.get("message")) {
      setSearchParams("");
    }

    dispatch(logInAction(data)).unwrap().then(() => {
      navigate("/");
    })
  }

  useEffect(() => {
    dispatch(resetLogin())
  }, [dispatch])

  return (
    <>
      <Heading title="Login"/>
      {searchParams.get("message") === "account_created" && (
        <div className="text-center"><p className="bg-green-300/50  px-8 py-4 m-5 max-w-[450px] inline-block rounded-lg text-gray-600 text-sm font-semibold border border-gray-600"><span className="mr-3">&#10003;</span>“Thanks for signing up. Your account has been created.”</p></div>
      )}

      {searchParams.get("message") === "login_required" && (
        <div className="text-center"><p className="bg-red-300/90  px-8 py-4 m-5 w-[450px] inline-block rounded-lg text-gray-600 text-sm font-semibold border border-gray-600">“You need to login first.”</p></div>
      )}
        <form action="" className="w-[500px] py-10 m-auto my-8 flex flex-col items-center bg-neutral-400/70 rounded-lg" onSubmit={handleSubmit(loginForm)}>
              <Input name='email' type="text" label='Email' error={errors.email?.message} register={register} />
              <Input name='password' type="password" label='Password' error={errors.password?.message} register={register} />
              {error && (
                <span className="text-sm text-red-400 font-semibold">{error}</span>
              )}

            <button className="bg-blue-400 px-8 py-2 rounded-lg  mb-2 mt-7" type="submit">
                {loading === "pending" ? (
                <>
                  <Spinner></Spinner>
                </>
              ) : ("Login")}
            </button>
        </form>
    </>
  )
}

export default Login