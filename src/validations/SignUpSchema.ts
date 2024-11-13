import { z } from "zod";

const registerSchema = z.object({
  firstName: z.string().min(1, {message: "First Name Is Required"}),
  lastName: z.string().min(1, {message: "Last Name Is Required"}),
  email: z.string().min(1, {message: "Email Is Required"}).email(),
  password: z.string().min(8, {message: "Password contains at least 8 characters"})
  .regex( /.*[!@#$%^&*()_+{}[\]\\:";'<>?,./].*/, 
    {message: "password should contains 1 special charachter"}),

  // regex for using a special charachters ,
  confirmPassword: z.string().min(8, {message: "Confirm Password Is Required"}),
}).refine(val => val.password === val.confirmPassword, {
    message: "Your password doesn't match",

    // path allows you to decide where the message display (it takes ARRAY)
    path: ["confirmPassword"]
  })

type TFormInputs = z.infer<typeof registerSchema>

export {registerSchema, type TFormInputs}