"use client"

import React, { useState } from "react"
import { useTranslations } from "next-intl"
import { FormProvider, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"

import Button from "@/components/Button"
import Modal from "@/components/Modal"
import FormInput from "@/components/FormInput"
import Divider from "@/components/Divider"
import Tooltip from "@/components/Tooltip"
import Image from "@/components/Image"
import { schema } from "./schema"

const FormLogin: React.FC = () => {
  const [open, setOpen] = useState(false)
  const t = useTranslations("login.client")
  const tErrMsg = useTranslations("errorMessages.client")
  const tField = useTranslations("fields.client")

  const OtherLoginMethod = [
    { name: "Google", description: t("loginGG"), iconURL: "/images/icons/google.svg" },
    { name: "Microsoft", description: t("loginMS"), iconURL: "/images/icons/microsoft.svg" },
    { name: "Twitter", description: t("loginTW"), iconURL: "/images/icons/twitter.svg" },
    { name: "Github", description: t("loginGit"), iconURL: "/images/icons/github.svg" },
    { name: "Phone number", description: t("loginPhone"), iconURL: "/images/icons/sms.svg" },
  ]

  const methods = useForm({
    resolver: yupResolver(schema),
  })

  const {
    handleSubmit,
    reset,
    formState: { errors }
  } = methods

  const getErrorMessage = (errorMessage?: string, dynamicValues: Record<string, any> = {}) => {
    return errorMessage && tErrMsg(errorMessage, dynamicValues)
  }

  const handleCloseModal = () => {
    setOpen(false)
    reset()
  }

  return (
    <>
      <Button
        className="!absolute bottom-[3%] right-[6%] text-white text-xl capitalize bg-transparent border-white hover:border-white"
        type="primary"
        onClick={() => setOpen(true)}
      >
        {t("login")}
      </Button>
      <Modal open={open} onClose={handleCloseModal}>
        <div>
          <h3 className="capitalize text-center font-bold text-2xl text-gray8">{t("login")}</h3>
          <p className="text-gray9 text-center text-sm font-semibold mt-2">{t("loginTitle")}</p>
        </div>
        <div className="mt-5 flex flex-col gap-y-2">
          <FormProvider {...methods}>
            <FormInput
              autoComplete="off"
              type="text"
              name="email"
              placeholder="Email"
              errorMessage={getErrorMessage(errors.email?.message, { field: tField("email") })}
            />
            <FormInput
              autoComplete="off"
              type="text"
              name="password"
              htmlInputType="password"
              placeholder="Password"
              errorMessage={getErrorMessage(errors.password?.message, { field: tField("pass"), min: 8, minSpecialChar: 1, minLower: 1, minUpper: 1, minNumber: 1 })}
            />
            <Button onClick={handleSubmit(() => { })} type="secondary" className="capitalize py-2 mt-2.5" rippleAnimation={{ duration: 750 }}>{t("login")}</Button>
          </FormProvider>
          <div className="flex items-center mt-2">
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
                <Tooltip key={index} title={name} delay={1000} >
                  <Image className="active:scale-[0.9] duration-200 cursor-pointer" src={iconURL} alt={description} width={28} height={28} />
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