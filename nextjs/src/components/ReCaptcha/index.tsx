import React, { useImperativeHandle, useRef } from "react"
import GoogleReCAPTCHA, { ReCAPTCHAProps as GoogleReCAPTCHAProps } from "react-google-recaptcha"

interface ReCAPTCHAProps extends GoogleReCAPTCHAProps { }

export type ReCAPTCHARef = {
  reset: () => void
  executeAsync: () => Promise<string | null> | undefined
}

const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "RECAPTCHA_SITE_KEY_DEFAULT"

const ReCAPTCHA = React.forwardRef<ReCAPTCHARef, ReCAPTCHAProps>(function ReCAPTCHA(props, ref) {
  const {
    sitekey,
    ...restProps
  } = props

  const reCaptchaRef = useRef<GoogleReCAPTCHA>(null)

  useImperativeHandle(ref, () => ({
    reset: () => reCaptchaRef.current?.reset(),
    executeAsync: () => reCaptchaRef.current?.executeAsync()
  }), [])

  return <GoogleReCAPTCHA ref={reCaptchaRef} sitekey={sitekey ?? RECAPTCHA_SITE_KEY} {...restProps} />
})

export default ReCAPTCHA