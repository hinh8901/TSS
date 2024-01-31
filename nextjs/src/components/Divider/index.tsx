import React, { HTMLProps } from "react"
import clsx from "clsx"

interface DividerProps extends HTMLProps<HTMLDivElement> {
  direction?: "horizontal" | "vertical"
}

const Divider: React.FC<DividerProps> = (props) => {
  const {
    className,
    direction = "horizontal",
    ...restProps
  } = props

  const getTypeClass = (direction: DividerProps["direction"]) => {
    switch (direction) {
      case "vertical":
        return "w-px h-full bg-gray5"

      case "horizontal":
      default:
        return "h-px w-full bg-gray5"
    }
  }

  return <div className={clsx(getTypeClass(direction), className)} {...restProps} />
}

export default Divider