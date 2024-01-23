"use client"

import React, { MouseEvent, useState } from "react"

interface RippleProps {
  color?: string
  duration?: number
  size?: number
  opacity?: number
  className?: string
}

const Ripple: React.FC<RippleProps> = (props) => {
  const { color, duration, size, opacity, className } = props
  const [ripples, setRipples] = useState([])

  const handleAddRipple = (event: MouseEvent<HTMLDivElement>) => {
    
  }

  return (
    <div className="absolute top-0 right-0 bottom-0 left-0" onClick={handleAddRipple}>
      {
        ripples.map((ripple, index) => (
          <span
            key={index}
            className={`absolute scale-0 duration-[${duration}ms] opacity-[${opacity}] bg-[${color}] h-[${size}px] w-[${size}px] rounded-full ${className}`}
          />
        ))
      }
    </div>
  )
}

export default Ripple