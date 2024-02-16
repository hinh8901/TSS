import React, { BaseSyntheticEvent, ChangeEvent, FocusEvent, InputHTMLAttributes, useId, useState } from "react"
import clsx from "clsx"
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5"
import { BiSolidError } from "react-icons/bi"

import CanView from "@/components/CanView"
import Tooltip from "@/components/Tooltip"

export interface InputTextProps extends InputHTMLAttributes<HTMLInputElement> {
  htmlInputType?: React.HTMLInputTypeAttribute
  error?: boolean
  helperText?: string
  disabled?: boolean
  prefixIcon?: React.ReactNode
  onChangeFormInput?: (value: string) => void
  onBlurFormInput?: (event: BaseSyntheticEvent) => void
  onFocusFormInput?: () => void
}

const InputText = React.forwardRef<HTMLInputElement, InputTextProps>(function InputText(props, ref) {
  const {
    className,
    htmlInputType = "text",
    error,
    helperText = "",
    disabled = false,
    onChange,
    onChangeFormInput,
    onBlur,
    onBlurFormInput,
    onFocus,
    onFocusFormInput,
    prefixIcon,
    ...restProps
  } = props

  const isHTMLInputTypePassword = htmlInputType === "password"
  const [isHideValue, setIsHideValue] = useState(isHTMLInputTypePassword)
  const [isFocus, setIsFocus] = useState(false)
  const id = useId()

  const handleToggleHidePassword = () => {
    setIsHideValue(!isHideValue)
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange?.(event)
    onChangeFormInput?.(event.target.value)
  }

  const handleFocus = (event: FocusEvent<HTMLInputElement>) => {
    onFocus?.(event)
    onFocusFormInput?.()
    setIsFocus(true)
  }

  const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
    onBlur?.(event)
    onBlurFormInput?.(event)
    setIsFocus(false)
  }

  return (
    <div className="relative">
      <Tooltip
        title={helperText}
        open={!!error && isFocus}
        event="value"
        position="bottom-left"
        delay={0}
        animationIn={0}
        animationOut={0}
        tooltipClasses="bg-red3 font-semibold px-4 py-2 min-w-min"
      >
        <input
          id={id}
          ref={ref}
          type={isHTMLInputTypePassword ? (isHideValue ? "password" : "text") : htmlInputType}
          className={clsx(
            "py-2 px-2.5 rounded-md duration-200 w-full text-gray1 border border-gray5 outline-0",
            "focus:shadow-[inset_0px_0px_0px_1px]",
            isHTMLInputTypePassword && "pr-[60px]",
            !!prefixIcon && "pl-10",
            !error ? "border-gray5 bg-gray11 focus:shadow-blue7 focus:border-blue6 focus:bg-blue8"
              : "border-red7 bg-red6 focus:shadow-red focus:border-red3",
            className
          )}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          autoComplete="off"
          {...restProps}
        />
      </Tooltip>
      <CanView condition={!!prefixIcon}>
        <label
          htmlFor={id}
          className={clsx(
            "absolute h-full w-10 flex items-center justify-center top-0 left-0 cursor-pointer duration-200",
            !error ? "text-gray3" : "text-red3",
            isFocus && !error && "text-blue6"
          )}
        >{prefixIcon}</label>
      </CanView>
      <CanView condition={isHTMLInputTypePassword}>
        <label
          htmlFor={id}
          className={clsx(
            "absolute top-1/2 -translate-y-1/2 right-3 cursor-pointer p-2 pr-0",
            !error ? "text-gray3" : "text-red3"
          )}
          onClick={handleToggleHidePassword}
        >
          <CanView condition={isHideValue} fallback={<IoEyeOutline />}>
            <IoEyeOffOutline />
          </CanView>
        </label>
      </CanView>
      <CanView condition={!!error}>
        <div className={clsx(
          "absolute top-1/2 -translate-y-1/2 pr-0 text-red3",
          isHTMLInputTypePassword ? "right-8" : "right-3"
        )}>
          <BiSolidError />
        </div>
      </CanView>
    </div>
  )
})

export default InputText