import { createContext, useContext } from "react"

type FormStatus = {
  active: boolean
}

const FormStatusContext = createContext<FormStatus>({
  active: true,
})

const useCustomFormStatus = (): FormStatus => {
  const formStatus = useContext(FormStatusContext)
  return formStatus
}

export const CustomFormStatusProvider = FormStatusContext.Provider
export default useCustomFormStatus
