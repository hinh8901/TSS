import React, { HTMLAttributes } from "react"
import { clsx } from "clsx"

interface ErrorMessageProps extends HTMLAttributes<HTMLSpanElement> { }

const ErrorMessage: React.FC<ErrorMessageProps> = (props) => {
  const { children, className, ...restProps } = props

  return (
    <span className={clsx("text-red text-sm", className)} {...restProps}>{children}</span>
  )
}

export default ErrorMessage