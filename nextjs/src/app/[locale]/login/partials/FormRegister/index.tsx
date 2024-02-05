import { useEffect, useState } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { UserCredential } from "firebase/auth"
import { useTranslations } from "next-intl"
import { MdOutlineAlternateEmail, MdOutlinePassword } from "react-icons/md"
import { RiLockPasswordFill } from "react-icons/ri"

import FormInput from "@/components/FormInput"
import { schema } from "./schema"
import CanView from "@/components/CanView"
import ErrorMessage from "@/components/ErrorMessage"
import Button from "@/components/Button"
import { createUserWithEmailAndPassword } from "./actions"

type LoginWithEmailAndPasswordResponse = UserCredential | string | { message: string; errCode: string | number }

const FormRegister: React.FC = () => {
  const [loginResponse, setLoginResponse] = useState<LoginWithEmailAndPasswordResponse>("")
  const t = useTranslations("login.client")
  const tErrMsg = useTranslations("errorMessages.client")
  const tField = useTranslations("fields.client")

  const methods = useForm({
    resolver: yupResolver(schema),
  })

  const {
    handleSubmit,
    trigger,
    watch,
    formState: { errors, isSubmitted }
  } = methods

  const password = watch("password")

  const handleCreateUserWithEmailAndPassword = async ({ email, password }: { email: string, password: string }) => {
    const res = await createUserWithEmailAndPassword(email, password)
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

  useEffect(() => {
    const checkPasswordConfirm = () => {
      if (!isSubmitted) return false
      trigger("rePassword")
    }

    checkPasswordConfirm()
  }, [trigger, isSubmitted, password])

  return (
    <>
      <div>
        <h3 className="capitalize text-center font-bold text-2xl text-gray8">{t("register")}</h3>
        <p className="text-gray9 text-center text-sm font-semibold mt-2">{t("registerTitle")}</p>
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
          <FormInput
            autoComplete="off"
            type="text"
            name="rePassword"
            htmlInputType="password"
            placeholder="Confirm Password"
            errorMessage={getValidationErrMsg(errors.rePassword?.message, { field: tField("pass"), min: 8, minSpecialChar: 1, minLower: 1, minUpper: 1, minNumber: 1 })}
            prefixIcon={<MdOutlinePassword />}
          />
          <CanView condition={!!loginResponse}>
            <ErrorMessage>{getLoginErrMsg()}</ErrorMessage>
          </CanView>
          <Button
            onClick={handleSubmit(handleCreateUserWithEmailAndPassword)}
            type="secondary"
            htmlType="submit"
            className="capitalize py-2 mt-2.5"
            rippleAnimation={{ duration: 750 }}
          >{t("register")}</Button>
        </FormProvider>
      </div>
    </>
  )
}

export default FormRegister