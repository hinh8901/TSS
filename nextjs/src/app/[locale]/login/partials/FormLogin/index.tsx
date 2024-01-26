"use client"

import React, { useState } from "react"

import Button from "@/components/Button"
import { Colors } from "@/themes"
import { useTranslations } from "next-intl"
import Modal from "@/components/Modal"
import FormInput from "@/components/FormInput"

const FormLogin: React.FC = () => {
  const [open, setOpen] = useState(false)
  const t = useTranslations("login")

  return (
    <>
      <Button
        className="!absolute bottom-[3%] right-[6%] text-white text-xl capitalize bg-transparent border-white hover:border-white"
        rippleAnimation={{ color: Colors.white }}
        type="primary"
        onClick={() => setOpen(!open)}
      >
        {t("login")}
      </Button>
      <Modal open={open}>
        <FormInput />
      </Modal>
    </>
  )
}

export default FormLogin