import { useForm, SubmitHandler } from "react-hook-form"
import { Heading } from "@components/common/main";
import { registerSchema, TFormInputs } from "../validations/SignUpSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "@components/forms/input/Input";
import { useCheckEmailAvailability } from "@hooks/useCheckEmailAvailability";

function Register() {

  // HANDLE SUBMIT prop handle the submit form onClick by passing your function to it as a argument 
  // REGISTER handle the input data (the name="")
  const {register, handleSubmit,trigger , getFieldState ,formState:{errors}} = useForm<TFormInputs>({
    mode: "onBlur",
    resolver: zodResolver(registerSchema)
  }); 

const {emailStatus, entredEmail, checkEmailAvailability, resetEmailAvailability} = useCheckEmailAvailability();

  const submitForm: SubmitHandler<TFormInputs> = (data) => {
    console.log(data);
  }

  const emailOnBlurHandler = async (e: React.FocusEvent<HTMLInputElement>) => {
    await trigger("email")
    const {isDirty, invalid} = getFieldState("email");
    const value = e.target.value;
    if (isDirty && !invalid && entredEmail !== value) {
      //checking
      checkEmailAvailability(value)
    }

    if (entredEmail && value.length === 0) {
      resetEmailAvailability();
    }
  }

  return (
    <>
      <Heading title="Register"/>

          <form action="" className="flex flex-col items-center" onSubmit={handleSubmit(submitForm)}>

          <Input name='firstName' type="text" label='First Name' error={errors.firstName?.message} register={register} />

          <Input name='lastName' type="text" label='Last Name' error={errors.lastName?.message} register={register} />

          <Input name='email' type="email" label='Email' error={errors.email?.message} register={register}
          onBlur={emailOnBlurHandler}
          formText={emailStatus === "checking" ? "chekcing email, please wait..." : ""}
          success= {emailStatus === 'available'? "email allready used" :""}
          />

          <Input name='password' type="password" label='Password' error={errors.password?.message} register={register} />

          <Input name='confirmPassword' type="password" label='Confirm Password' error={errors.confirmPassword?.message} register={register} />

          <div>
            <button className="bg-blue-400 px-8 py-2 rounded-lg mb-10 mt-5" type="submit">Register</button>
          </div>
      </form>
    </>

  )
}

export default Register