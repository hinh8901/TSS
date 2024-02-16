import { useEffect } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { useTranslations } from "next-intl"
import { MdOutlineAlternateEmail, MdOutlinePassword } from "react-icons/md"
import { RiLockPasswordFill } from "react-icons/ri"
import { useMutation } from "@tanstack/react-query"

import FormInput from "@/components/FormInput"
import CanView from "@/components/CanView"
import ErrorMessage from "@/components/ErrorMessage"
import Button from "@/components/Button"
import GoogleReCAPTCHAPolicy from "@/components/GoogleReCAPTCHAPolicy"
import { createUserWithEmailAndPassword } from "./actions"
import { schema } from "./schema"

const FormRegister: React.FC = () => {
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

  const handleCreateUserWithEmailAndPassword = useMutation({
    mutationFn: createUserWithEmailAndPassword,
  })

  const getValidationErrMsg = (errorMessage?: string, dynamicValues: Record<string, any> = {}) => {
    return errorMessage && tErrMsg(errorMessage, dynamicValues)
  }

  const renderRegisterErrMsg = () => {
    const errCode = (handleCreateUserWithEmailAndPassword.error as any)?.code
    let errMsg = ""
    switch (errCode) {
      case "auth/email-already-in-use":
        errMsg = "emailInUse"
        break

      case "auth/invalid-email":
        errMsg = "emailInvalid"
        break

      case "auth/operation-not-allowed":
        errMsg = "operationNotAllowed"
        break

      case "auth/weak-password":
        errMsg = "passwordWeak"
        break

      default:
        return tErrMsg("errOccur", { errCode })
    }
    return tErrMsg(errMsg)
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
            type="text"
            name="email"
            placeholder="Email"
            errorMessage={getValidationErrMsg(errors.email?.message, { field: tField("email") })}
            prefixIcon={<MdOutlineAlternateEmail />}
          />
          <FormInput
            type="text"
            name="password"
            htmlInputType="password"
            placeholder="Password"
            errorMessage={getValidationErrMsg(errors.password?.message, { field: tField("pass"), min: 8, minSpecialChar: 1, minLower: 1, minUpper: 1, minNumber: 1 })}
            prefixIcon={<RiLockPasswordFill />}
          />
          <FormInput
            type="text"
            name="rePassword"
            htmlInputType="password"
            placeholder="Confirm Password"
            errorMessage={getValidationErrMsg(errors.rePassword?.message, { field: tField("pass"), min: 8, minSpecialChar: 1, minLower: 1, minUpper: 1, minNumber: 1 })}
            prefixIcon={<MdOutlinePassword />}
          />
          <Button
            onClick={handleSubmit(({ email, password }) => handleCreateUserWithEmailAndPassword.mutate({ email, password }))}
            type="secondary"
            htmlType="submit"
            className="capitalize py-2 mt-2.5"
            rippleAnimation={{ duration: 750 }}
            isLoading={handleCreateUserWithEmailAndPassword.status === "pending"}
          >{t("register")}</Button>
          <CanView condition={handleCreateUserWithEmailAndPassword.isError}>
            <ErrorMessage>{renderRegisterErrMsg()}</ErrorMessage>
          </CanView>
          <GoogleReCAPTCHAPolicy />
        </FormProvider>
      </div>
    </>
  )
}

export default FormRegister