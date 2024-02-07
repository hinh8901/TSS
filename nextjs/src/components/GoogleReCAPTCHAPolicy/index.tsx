import React from "react"

const GoogleReCAPTCHAPolicy: React.FC = () => {
  return (
    <p className="text-xs text-gray4">
      This site is protected by reCAPTCHA and the Google
      <a className="text-blue6" target="_blank" href="https://policies.google.com/privacy"> Privacy Policy</a> and
      <a className="text-blue6" target="_blank" href="https://policies.google.com/terms"> Terms of Service</a> apply.
    </p>
  )
}

export default GoogleReCAPTCHAPolicy