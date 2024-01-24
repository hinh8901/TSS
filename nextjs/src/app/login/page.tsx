import React from "react"

import Image from "@/components/Image"
import Background from "@/components/Background"
import Button from "@/components/Button"
import { Colors } from "@/themes"

const Login: React.FC = () => {
  return (
    <section className="w-full h-screen relative">
      <div className="w-full sm:w-1/2 max-w-[400px] h-full flex justify-center items-center relative">
        <Background>
          <Image src="/images/banners/wave1.svg" className="w-full absolute bottom-0 left-0" alt="wave" priority width={563} height={380} />
          <div className="w-full h-1/2 absolute left-0 top-0">
            <Image src="/images/banners/wave2.svg" className="w-full absolute top left-0 top-0" alt="wave-2" priority width={634} height={438} />
            <Image src="/images/banners/wave3.svg" className="w-full absolute top left-0 top-0" alt="wave-3" priority width={563} height={380} />
          </div>
        </Background>
        <Image src="/images/banners/welcome.svg" alt="Welcome" width={385} height={422} priority />
      </div>
      <div className="h-full w-full absolute left-0 top-0">
        <h1 className="capitalize text-4xl text-white font-semibold absolute top-[6%] left-[10%]">manage work effectively</h1>
        <Button className="!absolute bottom-[6%] right-[6%] text-white text-xl capitalize" animateColor={Colors.white}>get started</Button>
      </div>
    </section>
  )
}

export default Login