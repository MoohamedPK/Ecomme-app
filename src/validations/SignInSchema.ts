import { z } from "zod";

const SignInSchema = z.object({
  email: z.string().min(1, {message: "Email Is Required"}).email(),
  password: z.string().min(8, {message: "Password contains at least 8 characters"})
})

type TFormInputs = z.infer<typeof SignInSchema>

export {SignInSchema, type TFormInputs}