"use client"

import React, { useState, useRef, useEffect } from "react"
import clsx from "clsx"
import { CgClose } from "react-icons/cg"

import CanView from "../CanView"

interface ModalProps {
  children?: React.ReactNode
  open?: boolean
  duration?: number
  onClose?: () => void
}

const Modal: React.FC<ModalProps> = (props) => {
  const {
    children,
    open: openModal = false,
    duration = 250,
    onClose
  } = props

  const [open, setOpen] = useState(openModal)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleClose = () => {
    onClose?.()
  }

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null

    const makeAnimation = () => {
      const myModal = containerRef.current?.querySelector(".myModal")

      if (openModal) {
        containerRef.current?.classList.remove("animate-opacityOut")
        containerRef.current?.classList.add("animate-opacityIn")
        myModal?.classList.remove("animate-fadeOut")
        myModal?.classList.add("animate-fadeIn")
        setOpen(true)
      } else {
        containerRef.current?.classList.remove("animate-opacityIn")
        containerRef.current?.classList.add("animate-opacityOut")
        myModal?.classList.remove("animate-fadeIn")
        myModal?.classList.add("animate-fadeOut")
        timer = setTimeout(() => {
          setOpen(false)
        }, duration)
      }
    }

    makeAnimation()

    return () => clearTimeout(timer as NodeJS.Timeout)
  }, [openModal, duration])

  return (
    <CanView condition={open}>
      <div
        ref={containerRef}
        style={{ animationDuration: `${duration}ms` }}
        className={clsx(
          "absolute flex justify-center items-center w-full h-full bg-gray7 z-[9999] backdrop-blur-sm",
          open ? "animate-opacityIn" : "animate-opacityOut"
        )}>
        <div
          style={{ animationDuration: `${duration}ms` }}
          className={clsx(
            "myModal",
            open ? "animate-fadeIn" : "animate-fadeOut",
            "py-5 px-6 bg-white rounded-xl w-[90%] overflow-hidden"
          )}
        >
          <div
            className="absolute bg-red right-0 top-0 w-16 h-16 clip-path-triangle cursor-pointer hover:bg-red3 duration-300"
            onClick={handleClose}
          >
            <CgClose className="absolute text-lg text-white left-3/4 -translate-x-1/2 top-1/2 -translate-y-full" />
          </div>
          <CanView condition={!!children} fallback={<div className="bg-white h-[280px] w-[280px] rounded-md" />}>
            {children}
          </CanView>
        </div>
      </div>
    </CanView>
  )
}

export default Modal