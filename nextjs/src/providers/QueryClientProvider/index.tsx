"use client"

import React from "react"
import { QueryClient, QueryClientProvider, QueryClientProviderProps } from "@tanstack/react-query"

interface TanStackQueryClientProviderProps extends Omit<QueryClientProviderProps, "client"> { }

const queryClient = new QueryClient()

const TanStackQueryClientProvider: React.FC<TanStackQueryClientProviderProps> = ({ children, ...restProps }) => {
  return (
    <QueryClientProvider client={queryClient} {...restProps}>
      {children}
    </QueryClientProvider>
  )
}

export default TanStackQueryClientProvider