import React, { ComponentProps } from "react"
import {
  IntlProvider,
  NextIntlClientProvider as OriginalNextIntlClientProvider,
  useMessages
} from "next-intl"

type OriginalNextIntlClientProviderProps = Omit<ComponentProps<typeof IntlProvider>, 'locale'> & {
  locale?: string;
}

interface NextIntlClientProviderProps extends Omit<OriginalNextIntlClientProviderProps, "message"> { }

const NextIntlClientProvider: React.FC<NextIntlClientProviderProps> = ({ children, ...restProps }) => {
  const messages = useMessages()

  return (
    <OriginalNextIntlClientProvider messages={messages} {...restProps} >
      {children}
    </OriginalNextIntlClientProvider>
  )
}

export default NextIntlClientProvider
