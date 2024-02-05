"use client"

import React, { useState } from "react"
import { useTranslations } from "next-intl"

import Button from "@/components/Button"
import Modal from "@/components/Modal"
import FormLogin from "../FormLogin"
import FormRegister from "../FormRegister"
import CanView from "@/components/CanView"

type Entrance = "login" | "register"

const Entrances: React.FC = () => {
  const [openModal, setOpenModal] = useState(false)
  const [entrance, setEntrance] = useState<Entrance>("login")
  const t = useTranslations("login.client")

  const handleOpenModal = (entrance: Entrance) => {
    setEntrance(entrance)
    setOpenModal(true)
  }

  return (
    <>
      <p className="absolute text-white capitalize bottom-[3%] left-[6%]">
        {t("newHere")}
        <span
          className="ml-1.5 font-semibold cursor-pointer hover:underline"
          onClick={handleOpenModal.bind(null, "register")}
        >{t("register")}</span>
      </p>
      <Button
        className="!absolute bottom-[3%] right-[6%] text-white text-xl capitalize bg-transparent border-white hover:border-white"
        type="primary"
        onClick={handleOpenModal.bind(null, "login")}
      >{t("login")}</Button>
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <CanView condition={entrance === "login"} fallback={<FormRegister />}>
          <FormLogin />
        </CanView>
      </Modal>
    </>
  )
}

export default Entrances