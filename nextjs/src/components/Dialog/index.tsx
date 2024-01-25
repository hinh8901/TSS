"use client"

import React, { useState } from "react"

import CanView from "../CanView"

interface DialogProps {
  children?: React.ReactNode
  open?: boolean
}

const Dialog: React.FC<DialogProps> = (props) => {
  const {
    children,
    // open = true
  } = props

  const [open, setOpen] = useState(false)

  const toggleDialog = () => {
    if (!open) return setOpen(true)
    setTimeout(() => {
      setOpen(false)
    }, 250)
  }

  return (
    <div>
      <button className="absolute z-[99999999]" onClick={toggleDialog}>Open Dialog</button>
      <CanView condition={open}>
        <div className="absolute flex justify-center items-center w-full h-full bg-gray7 z-[9999] backdrop-blur-sm animate-opacityIn">
          <div className="bg-white h-1/4 w-3/4 rounded-md animate-fadeIn">
            {children}
          </div>
        </div>
      </CanView>
    </div>
  )
}

export default Dialog