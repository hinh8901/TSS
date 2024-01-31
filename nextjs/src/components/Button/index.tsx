"use client"

import React from "react"

import { RippleAnimation } from "../Animations"
import CanView from "../CanView"

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  type?: ButtonTypes
  rippleAnimation?: false | {
    color?: string
    duration?: number
  }
}

type ButtonTypes = "primary" | "success" | "danger" | "secondary"

const Button: React.FC<ButtonProps> = (props) => {
  const {
    children,
    className,
    type = "primary",
    rippleAnimation = {},
    ...restProps
  } = props


  const getTypeClass = (type: ButtonTypes) => {
    switch (type) {
      case "danger":
        return "text-white bg-red3 border-red3 hover:bg-red4 hover:border-red4"

      case "success":
        return "text-white bg-green4 border-green4 hover:bg-green5 hover:border-green5"

      case "secondary":
        return "text-white bg-gray8 border-gray8 hover:bg-gray10 hover:border-gray10"

      case "primary":
      default:
        return "text-white bg-blue4 border-blue4 hover:bg-blue5 hover:border-blue5"
    }
  }

  return (
    <button className={`relative overflow-hidden border rounded-md py-2 px-8 duration-300 ${getTypeClass(type)} ${className}`} {...restProps}>
      <CanView condition={!!rippleAnimation}>
        <RippleAnimation
          color={(rippleAnimation as { color: string }).color}
          duration={(rippleAnimation as { duration: number }).duration}
        />
      </CanView>
      {children}
    </button>
  )
}

export default Button