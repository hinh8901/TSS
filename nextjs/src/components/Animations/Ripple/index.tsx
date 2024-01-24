"use client"

import useDebouncedArrayCleanUp from "@/hooks/useDebouncedArrayCleanUp"
import React, { MouseEvent, useState } from "react"

interface RippleProps {
  color?: string
  duration?: number
  className?: string
}

type RippleState = {
  x: number
  y: number
  size: number
}

const Ripple: React.FC<RippleProps> = (props) => {
  const { color, duration = 500, className = "" } = props
  const [ripples, setRipples] = useState<RippleState[]>([])

  useDebouncedArrayCleanUp(ripples, setRipples, duration)

  const handleAddRipple = (event: MouseEvent<HTMLDivElement>) => {
    const rippleContainer = event.currentTarget.getBoundingClientRect()
    const width = rippleContainer.width
    const height = rippleContainer.height
    const size = width > height ? width : height

    const x = event.pageX - rippleContainer.left - size / 2
    const y = event.pageY - rippleContainer.top - size / 2

    setRipples(prev => [...prev, { x, y, size }])
  }

  return (
    <div className="absolute top-0 right-0 bottom-0 left-0" onClick={handleAddRipple}>
      {
        ripples.map(({ x, y, size }, index) => (
          <span
            key={index}
            style={{
              backgroundColor: color,
              animationDuration: `${duration}ms`,
              top: y,
              left: x,
              width: size,
              height: size
            }}
            className={`absolute scale-0 opacity-60 rounded-full animate-ripple ${className}`}
          />
        ))
      }
    </div>
  )
}

export default Ripple