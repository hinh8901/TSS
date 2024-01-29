import React, { useState } from "react"
import clsx from "clsx"
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5"
import CanView from "@/components/CanView"

export interface InputTextProps extends React.HTMLProps<HTMLInputElement> {
  htmlInputType?: React.HTMLInputTypeAttribute
  error?: boolean
  helperText?: string
  disabled?: boolean
}

const InputText: React.FC<InputTextProps> = (props) => {
  const {
    className,
    htmlInputType = "text",
    error,
    helperText,
    disabled = false,
    ...restProps
  } = props

  const isHTMLInputTypePassword = htmlInputType === "password"
  const [isHideValue, setIsHideValue] = useState(isHTMLInputTypePassword)

  const handleToggleHidePassword = () => {
    setIsHideValue(!isHideValue)
  }

  return (
    <div className="relative">
      <input
        type={isHTMLInputTypePassword ? (isHideValue ? "password" : "text") : htmlInputType}
        className={clsx(
          "py-2 px-2.5 rounded-md duration-200 w-full text-gray1",
          "border-gray5 border outline-0 bg-white",
          "focus:shadow-[inset_0px_0px_0px_1px] focus:shadow-blue7 focus:border-blue6 focus:bg-blue8",
          isHTMLInputTypePassword && "pr-[42px]",
          className
        )}
        {...restProps}
      />
      <CanView condition={isHTMLInputTypePassword}>
        <div
          className="absolute top-1/2 -translate-y-1/2 right-3 cursor-pointer p-2 pr-0 text-gray2"
          onClick={handleToggleHidePassword}
        >
          <CanView condition={isHideValue} fallback={<IoEyeOutline />}>
            <IoEyeOffOutline />
          </CanView>
        </div>
      </CanView>
    </div>
  )
}

export default InputText