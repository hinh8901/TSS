import { useState } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { UserCredential } from "firebase/auth"
import { useTranslations } from "next-intl"

import FormInput from "@/components/FormInput"
import Divider from "@/components/Divider"
import Tooltip from "@/components/Tooltip"
import Image from "@/components/Image"
import { schema } from "./schema"
import CanView from "@/components/CanView"
import ErrorMessage from "@/components/ErrorMessage"
import Button from "@/components/Button"
import { loginWithEmailAndPassword, loginWithGithub, loginWithGoogle, loginWithMicrosoft } from "../../actions"

type LoginWithEmailAndPasswordResponse = UserCredential | string | { message: string; errCode: string | number }

const FormToLogin: React.FC = () => {
  const [loginResponse, setLoginResponse] = useState<LoginWithEmailAndPasswordResponse>("")
  const t = useTranslations("login.client")
  const tErrMsg = useTranslations("errorMessages.client")
  const tField = useTranslations("fields.client")

  const OtherLoginMethod = [
    { name: "Google", description: t("loginGG"), iconURL: "/images/icons/google.svg", onLogin: loginWithGoogle },
    { name: "Microsoft", description: t("loginMS"), iconURL: "/images/icons/microsoft.svg", onLogin: loginWithMicrosoft },
    { name: "Github", description: t("loginGit"), iconURL: "/images/icons/github.svg", onLogin: loginWithGithub },
    { name: "Phone number", description: t("loginPhone"), iconURL: "/images/icons/sms.svg", onLogin: () => { } },
  ]

  const methods = useForm({
    resolver: yupResolver(schema),
  })

  const {
    handleSubmit,
    formState: { errors }
  } = methods

  const handleLoginWithEmailAndPassword = async ({ email, password }: { email: string, password: string }) => {
    const res = await loginWithEmailAndPassword(email, password)
    setLoginResponse(res)
  }

  const getValidationErrMsg = (errorMessage?: string, dynamicValues: Record<string, any> = {}) => {
    return errorMessage && tErrMsg(errorMessage, dynamicValues)
  }

  const getLoginErrMsg = () => {
    if (!loginResponse) return ""

    switch (typeof loginResponse) {
      case "string":
        return tErrMsg(loginResponse)

      case "object":
      default: {
        if ("message" in loginResponse && loginResponse.message === "errOccur" && "errCode" in loginResponse)
          return tErrMsg(loginResponse.message, { errCode: loginResponse.errCode })
        return ""
      }
    }
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
          />
          <FormInput
            autoComplete="off"
            type="text"
            name="password"
            htmlInputType="password"
            placeholder="Password"
            errorMessage={getValidationErrMsg(errors.password?.message, { field: tField("pass"), min: 8, minSpecialChar: 1, minLower: 1, minUpper: 1, minNumber: 1 })}
          />
          <CanView condition={!!loginResponse}>
            <ErrorMessage>{getLoginErrMsg()}</ErrorMessage>
          </CanView>
          <Button
            onClick={handleSubmit(handleLoginWithEmailAndPassword)}
            type="secondary"
            htmlType="submit"
            className="capitalize py-2 mt-2.5"
            rippleAnimation={{ duration: 750 }}
          >{t("login")}</Button>
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
            OtherLoginMethod.map(({ name, description, iconURL, onLogin }, index) => (
              <Tooltip key={index} title={name} delay={1000} >
                <Image
                  className="active:scale-[0.9] duration-200 cursor-pointer"
                  src={iconURL}
                  alt={description}
                  width={28}
                  height={28}
                  onClick={onLogin}
                />
              </Tooltip>
            ))
          }
        </div>
      </div>
    </>
  )
}

export default FormToLogin