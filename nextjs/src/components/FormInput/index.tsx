"use client"

import React, { BaseSyntheticEvent, useState } from "react"
import { Control, useController, useFormContext } from "react-hook-form"

import InputText, { InputTextProps } from "./InputText"
import useCustomFormStatus from "@/hooks/useCustomFormStatus"

type InputTypes = "text" | "number"

interface BaseProps {
  name: string
  control?: Control
  label?: string
  defaultValue?: any
  required?: boolean
  disabled?: boolean
  errorMessage?: string
  clearErrorOnFocus?: boolean
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
    control,
    name,
    defaultValue,
    disabled = false,
    helperText,
    errorMessage,
    clearErrorOnFocus,
    ...restProps
  } = props

  const [hideErrorStatus, setHideErrorStatus] = useState(false)
  const { active } = useCustomFormStatus()
  const hookFormMethods = useFormContext()

  const hookFormControl = control || hookFormMethods?.control
  if (!hookFormControl) throw new Error("control(react-hook-form) is required")

  const {
    field: { onChange, onBlur, ref: hookFormRef, value = "", ...restHookFormFields },
    fieldState: { invalid: hookFormInvalid }
  } = useController({ name, control: hookFormControl, defaultValue })

  const onChangeFormInput = (value: any) => {
    onChange(value)
  }

  const onBlurFormInput = (event: BaseSyntheticEvent) => {
    clearErrorOnFocus && setHideErrorStatus(false)
    onBlur()
  }

  const onFocusFormInput = () => {
    clearErrorOnFocus && setHideErrorStatus(true)
  }

  const inputProps: any = {
    value,
    ref: ref || hookFormRef,
    error: hideErrorStatus ? false : !!errorMessage || hookFormInvalid,
    disabled: !active || disabled,
    onChangeFormInput,
    onBlurFormInput,
    onFocusFormInput,
    helperText: hideErrorStatus ? helperText || null : errorMessage || helperText || null,
    ...restHookFormFields,
    ...restProps
  }

  const Input = InputComponents[type]

  return <Input {...inputProps} />
})

export default FormInput