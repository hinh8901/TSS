"use client"

import { useState } from "react"
import Button from "../Button"
import Modal from "../Modal"

const Demo = () => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button className="!fixed top-1/2 left-0 z-[9999999999]" onClick={() => setOpen(!open)}>Demo</Button>
      <Modal open={open} />
    </>
  )
}

export default Demo