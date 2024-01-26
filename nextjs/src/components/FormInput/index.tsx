import React from "react"
import InputText from "./InputText"

type InputTypes = "text"

const InputComponents = {
  text: InputText
}

interface BaseProps {
  type?: InputTypes
  label?: string
  defaultValue?: any
  required?: boolean
  disabled?: boolean
  errorMessage?: string
  clearErrorOnFocus?: boolean
}

interface FormInputProps extends BaseProps {

}

const FormInput = React.forwardRef<HTMLInputElement, FormInputProps>(function FormInput(props, ref) {
  const {
    type = "text",
    ...rest
  } = props

  const Input = InputComponents[type]

  return <Input {...rest} />
})

export default FormInput