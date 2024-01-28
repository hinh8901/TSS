"use client"

import React, { useState } from "react"

import Button from "@/components/Button"
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
        type="primary"
        onClick={() => setOpen(!open)}
      >
        {t("login")}
      </Button>
      <Modal open={open}>
        <div className="">
          <h3 className="capitalize text-center font-bold text-2xl text-gray8">{t("login")}</h3>
          <p className="text-gray9 text-center text-sm font-semibold mt-2">{t("loginTitle")}</p>
        </div>
        <div className="mt-5 flex flex-col gap-y-2">
          <FormInput />
          <FormInput />
          <Button type="secondary" className="capitalize py-2">{t("login")}</Button>
        </div>
      </Modal>
    </>
  )
}

export default FormLogin