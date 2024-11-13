import { Path, UseFormRegister, FieldValues } from "react-hook-form";

type TInputProps<TFieldValue extends FieldValues> = {
    name : Path<TFieldValue>,
    type?: string,
    label: string,
    error?: string,
    register: UseFormRegister<TFieldValue>,
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void,
    formText?: string,
    success?: string,
}

function Input<TFieldValue extends FieldValues>({error, name, register, label, type, onBlur, formText, success}:TInputProps<TFieldValue>) {

  const onBlurHandler = (e:React.FocusEvent<HTMLInputElement>) => {
    if (onBlur) {
      onBlur(e);
      register(name).onBlur(e);
    }else {
      register(name).onBlur(e);
    }
  }
  return (
    <label htmlFor="" className="my-2 flex flex-col">{label}
            <input className={`my-1 py-1 px-3 border-2 border-neutral-400 rounded-lg w-[300px] outline-none ${error ? "border-2 border-red-400" : ''}`} 
            type={type} {...register(name)} onBlur={onBlurHandler}/>
            <span className="text-xs text-red-400 font-normal">{error}</span>
            {formText && (
              <span className="text-xs text-neutral-500 font-semibold">{formText}</span>
            )}
    </label>
  )
}

export default Input