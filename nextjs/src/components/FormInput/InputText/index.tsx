import clsx from "clsx"
import React from "react"

interface InputTextProps extends React.HTMLAttributes<HTMLInputElement> {
}

const InputText: React.FC<InputTextProps> = (props) => {
  const { } = props

  return (
    <input
      className={clsx(
        "px-2.5 py-2.5 rounded-md duration-200 w-full",
        "border-gray5 border outline-0 bg-white",
        "focus:shadow-[inset_0px_0px_0px_1px] focus:shadow-blue7 focus:border-blue6 focus:bg-blue8"
      )}
    />
  )
}

export default InputText