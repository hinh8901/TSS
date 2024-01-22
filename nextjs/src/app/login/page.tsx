import React from "react"
import Image from "@/components/Image"

const Login: React.FC = () => {
  return (
    <section className="w-full h-screen flex">
      <div className="sm:w-1/2 h-full flex justify-center items-center relative">
        <Image src="/images/banners/welcome.svg" alt="Welcome" width={385} height={422} priority />
        <Image src="/images/banners/wave1.svg" alt="wave" priority width={563} height={380} isBackground />
      </div>
      <div className="sm:w-1/2 h-full bg-gray-500 flex"></div>
    </section>
  )
}

export default Login