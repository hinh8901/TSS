"use client"

import React from "react"

import { RippleAnimation } from "../Animations"
import { Colors } from "@/themes"

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  animateColor?: string
}

const Button: React.FC<ButtonProps> = (props) => {
  const { children, className, animateColor = Colors.blue, ...restProps } = props

  return (
    <button className={`relative overflow-hidden border rounded py-2 px-8 ${className}`} {...restProps}>
      <RippleAnimation color={animateColor} />
      {children}
    </button>
  )
}

export default Button