import * as yup from "yup"

export const schema = yup.object().shape({
  email: yup.string().required("fieldRequired").email("fieldInvalid"),
  password: yup
    .string()
    .required("fieldRequired")
    .min(8, "fieldMin")
    .matches(/[A-Z]/, "fieldMustUpperCase")
    .matches(/[a-z]/, "fieldMustLowerCase")
    .matches(/[0-9]/, "fieldMustNumber")
    .matches(/[^A-Za-z0-9]/, "fieldMustSpecialChar")
})
