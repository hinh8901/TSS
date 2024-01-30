"use client"

import React, { useState } from "react"

import Button from "@/components/Button"
import { useTranslations } from "next-intl"
import Modal from "@/components/Modal"
import FormInput from "@/components/FormInput"
import Divider from "@/components/Divider"
import Tooltip from "@/components/Tooltip"
import Image from "@/components/Image"

const FormLogin: React.FC = () => {
  const [open, setOpen] = useState(false)
  const t = useTranslations("login.client")

  const OtherLoginMethod = [
    { name: "Google", description: "Login with Google", iconURL: "/images/icons/google.svg" },
    { name: "Microsoft", description: "Login with Microsoft", iconURL: "/images/icons/microsoft.svg" },
    { name: "Twitter", description: "Login with Twitter", iconURL: "/images/icons/twitter.svg" },
    { name: "Github", description: "Login with Github", iconURL: "/images/icons/github.svg" },
    { name: "Phone number", description: "Login with Phone Number", iconURL: "/images/icons/sms.svg" },
  ]

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
        <div>
          <h3 className="capitalize text-center font-bold text-2xl text-gray8">{t("login")}</h3>
          <p className="text-gray9 text-center text-sm font-semibold mt-2">{t("loginTitle")}</p>
        </div>
        <div className="mt-5 flex flex-col gap-y-2">
          <FormInput type="text" name="email" placeholder="Email" />
          <FormInput type="text" name="password" htmlInputType="password" placeholder="Password" />
          <Button type="secondary" className="capitalize py-2 mt-2.5" rippleAnimation={{ duration: 750 }}>{t("login")}</Button>
          <div className="flex items-center justify-center mt-2">
            <p className="text-gray9 text-center text-sm font-semibold capitalize cursor-pointer hover:underline">{t("forgotPassword")}</p>
          </div>
        </div>
        <div className="mt-6">
          <div className="flex items-center gap-x-3">
            <Divider />
            <p className="text-gray9 text-sm shrink-0">{t("orLogin")}</p>
            <Divider />
          </div>
          <div className="flex justify-center items-center gap-x-4 mt-4">
            {
              OtherLoginMethod.map(({ name, description, iconURL }, index) => (
                <Tooltip key={index} title={name} >
                  <Image src={iconURL} alt={description} width={28} height={28} />
                </Tooltip>
              ))
            }
          </div>
        </div>
      </Modal>
    </>
  )
}

export default FormLogin