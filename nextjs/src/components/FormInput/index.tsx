"use client"

import React, { useState } from "react"
import InputText, { InputTextProps } from "./InputText"

type InputTypes = "text" | "number"

interface BaseProps {
  label?: string
  name: string
  defaultValue?: any
  required?: boolean
  disabled?: boolean
  errorMessage?: string
  clearErrorOnFocus?: boolean
  helperText?: string
}


type FormInputProps<T extends InputTypes> =
  T extends "text" ? { type: T } & BaseProps & InputTextProps :
  never

const InputComponents = {
  text: InputText,
}

const FormInput = React.forwardRef<HTMLInputElement, FormInputProps<InputTypes>>(function FormInput(props, ref) {
  const {
    type = "text",
    name,
    defaultValue,
    disabled = false,
    helperText,
    errorMessage,
    clearErrorOnFocus,
    ...restProps
  } = props

  const [hideErrorStatus, setHideErrorStatus] = useState(false)
  // const { active } = useActiveFormContext()

  const inputProps: any = {
    ref,
    error: hideErrorStatus ? false : !!errorMessage,
    // disabled: !active || disabled,
    disabled: disabled,
    helperText: hideErrorStatus ? helperText || null : errorMessage || helperText || null,
    ...restProps
  }

  const Input = InputComponents[type]

  return <Input {...inputProps} />
})

export default FormInput