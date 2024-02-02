"use client"

import React, { useState } from "react"
import { useTranslations } from "next-intl"

import Button from "@/components/Button"
import Modal from "@/components/Modal"
import FormToLogin from "../FormToLogin"

const FormLogin: React.FC = () => {
  const [open, setOpen] = useState(false)
  const t = useTranslations("login.client")

  return (
    <>
      <Button
        className="!absolute bottom-[3%] right-[6%] text-white text-xl capitalize bg-transparent border-white hover:border-white"
        type="primary"
        onClick={() => setOpen(true)}
      >{t("login")}</Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <FormToLogin />
      </Modal>
    </>
  )
}

export default FormLogin