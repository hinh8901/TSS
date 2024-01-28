import clsx from "clsx"
import React from "react"

export interface InputNumberProps extends React.HTMLAttributes<HTMLInputElement> {
  numberType: "integer" | "decimal"
}

const InputNumber: React.FC<InputNumberProps> = (props) => {
  const { } = props

  return (
    <input
      className={clsx(
        "py-2 px-2.5 rounded-md duration-200 w-full",
        "border-gray5 border outline-0 bg-white",
        "focus:shadow-[inset_0px_0px_0px_1px] focus:shadow-blue7 focus:border-blue6 focus:bg-blue8"
      )}
    />
  )
}

export default InputNumber