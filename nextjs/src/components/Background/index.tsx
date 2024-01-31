import clsx from "clsx"
import React from "react"

interface BackgroundProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children" | "className"> {
  children: React.HTMLAttributes<HTMLDivElement>["children"]
  className?: React.HTMLAttributes<HTMLDivElement>["className"]
}

const Background: React.FC<BackgroundProps> = (props) => {
  const { children, className, ...restProps } = props

  return (
    <div className={clsx("absolute bottom-0 left-0 w-full h-full z-[-1]", className)} {...restProps}>{children}</div>
  )
}

export default Background