"use client"

import React from "react"

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> { }

const Button: React.FC<ButtonProps> = (props) => {
  const { children } = props

  return (
    <button className="w-[200px] h-[200px] overflow-hidden border border-sky-500" onClick={(e) => console.log(e)}>
      {children}
    </button>
  )
}

export default Button