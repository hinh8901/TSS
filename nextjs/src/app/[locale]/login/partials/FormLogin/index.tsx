import React from "react"
import { FormProvider, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { useTranslations } from "next-intl"
import { MdOutlineAlternateEmail } from "react-icons/md"
import { RiLockPasswordFill } from "react-icons/ri"
import { useMutation } from "@tanstack/react-query"
import clsx from "clsx"
import { UserCredential } from "firebase/auth"

import FormInput from "@/components/FormInput"
import Divider from "@/components/Divider"
import Tooltip from "@/components/Tooltip"
import Image from "@/components/Image"
import { schema } from "./schema"
import CanView from "@/components/CanView"
import ErrorMessage from "@/components/ErrorMessage"
import Button from "@/components/Button"
import { loginWithEmailAndPassword, loginWithGithub, loginWithGoogle, loginWithMicrosoft } from "./actions"

const FormLogin: React.FC = () => {
  const t = useTranslations("login.client")
  const tErrMsg = useTranslations("errorMessages.client")
  const tField = useTranslations("fields.client")

  const OTHER_LOGIN_METHODS = [
    { name: "Google", description: t("loginGG"), iconURL: "/images/icons/google.svg", onLogin: loginWithGoogle },
    { name: "Microsoft", description: t("loginMS"), iconURL: "/images/icons/microsoft.svg", onLogin: loginWithMicrosoft },
    { name: "Github", description: t("loginGit"), iconURL: "/images/icons/github.svg", onLogin: loginWithGithub }
  ]

  const methods = useForm({
    resolver: yupResolver(schema),
  })

  const {
    handleSubmit,
    formState: { errors }
  } = methods

  const handleLoginWithEmailAndPassword = useMutation({
    mutationFn: ({ email, password }: { email: string, password: string }) => {
      handleLoginWithOtherMethod.reset()
      return loginWithEmailAndPassword({ email, password })
    }
  })

  const handleLoginWithOtherMethod = useMutation({
    mutationFn: (loginMethod: () => Promise<UserCredential>) => {
      handleLoginWithEmailAndPassword.reset()
      return loginMethod()
    }
  })

  const isLogging = handleLoginWithEmailAndPassword.status === "pending" || handleLoginWithOtherMethod.status === "pending"

  const getValidationErrMsg = (errorMessage?: string, dynamicValues: Record<string, any> = {}) => {
    return errorMessage && tErrMsg(errorMessage, dynamicValues)
  }

  const renderLoginErrMsg = () => {
    const errCode = (handleLoginWithEmailAndPassword.error as any)?.code ||
      (handleLoginWithOtherMethod.error as any)?.code

    let errMsg = ""
    switch (errCode) {
      case "auth/network-request-failed":
        errMsg = "networkRequestFailed"
        break

      case "auth/invalid-email":
      case "auth/user-not-found":
      case "auth/wrong-password":
        errMsg = "emailPassIncorrect"
        break

      case "auth/too-many-requests":
        errMsg = "tooManyRequests"
        break

      case "auth/popups-blocked":
        errMsg = "popupsBlocked"
        break

      case "auth/popup-closed-by-user":
        errMsg = "popupClosedByUser"
        break

      case "auth/cancelled-popup-request":
        errMsg = "cancelledPopupRequest"
        break

      case "auth/user-cancelled":
        errMsg = "userCancelled"
        break

      default:
        return tErrMsg("errOccur", { errCode })
    }

    return tErrMsg(errMsg)
  }

  return (
    <>
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
            errorMessage={getValidationErrMsg(errors.email?.message, { field: tField("email") })}
            prefixIcon={<MdOutlineAlternateEmail />}
          />
          <FormInput
            autoComplete="off"
            type="text"
            name="password"
            htmlInputType="password"
            placeholder="Password"
            errorMessage={getValidationErrMsg(errors.password?.message, { field: tField("pass"), min: 8, minSpecialChar: 1, minLower: 1, minUpper: 1, minNumber: 1 })}
            prefixIcon={<RiLockPasswordFill />}
          />
          <Button
            onClick={handleSubmit(({ email, password }) => handleLoginWithEmailAndPassword.mutate({ email, password }))}
            type="secondary"
            htmlType="submit"
            className="capitalize py-2 mt-2.5"
            rippleAnimation={{ duration: 750 }}
            isLoading={isLogging}
          >{t("login")}</Button>
          <CanView
            condition={handleLoginWithEmailAndPassword.isError || handleLoginWithOtherMethod.isError}
          >
            <ErrorMessage>{renderLoginErrMsg()}</ErrorMessage>
          </CanView>
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
        <div className="flex justify-center items-center gap-x-5 mt-4">
          {
            OTHER_LOGIN_METHODS.map(({ name, description, iconURL, onLogin }, index) => (
              <Tooltip key={index} title={name} delay={1000} >
                <Image
                  className={clsx(
                    "duration-200",
                    isLogging ? "cursor-default grayscale-[0.6]" : "active:scale-[0.9] cursor-pointer"
                  )}
                  src={iconURL}
                  alt={description}
                  width={28}
                  height={28}
                  onClick={() => !isLogging && handleLoginWithOtherMethod.mutate(onLogin)}
                />
              </Tooltip>
            ))
          }
        </div>
      </div>
    </>
  )
}

export default FormLogin