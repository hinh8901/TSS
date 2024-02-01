import React, { RefObject, useCallback, useEffect, useLayoutEffect, useRef, useState } from "react"

import CanView from "../CanView"
import clsx from "clsx"

type Position = "top" | "bottom" | "left" | "right" | "top-left" | "top-right" | "bottom-left" | "bottom-right" | "left-top" | "left-bottom" | "right-top" | "right-bottom"

type TooltipPosition =
  { top: number | string, left: number | string } |
  { top: number | string, right: number | string } |
  { bottom: number | string, left: number | string } |
  { bottom: number | string, right: number | string }

interface TooltipProps {
  open?: boolean
  children: React.ReactNode
  title: string
  position?: Position
  containerRef?: RefObject<HTMLElement>
  offsetX?: number
  offsetY?: number
  event?: "hover" | "click" | "value"
  delay?: number
  animationIn?: number
  animationOut?: number
  tooltipClasses?: string
}

const Tooltip: React.FC<TooltipProps> = (props) => {
  const {
    open = false,
    children,
    title,
    position = "bottom",
    containerRef,
    offsetX = 6,
    offsetY = 6,
    event = "hover",
    delay = 500,
    animationIn = 500,
    animationOut = 250,
    tooltipClasses
  } = props

  const [isShowTooltip, setIsShowTooltip] = useState(open)
  const [tooltipPosition, setTooltipPosition] = useState<TooltipPosition>()
  const anchorRef = useRef<HTMLDivElement>(null)
  const tooltipRef = useRef<HTMLDivElement>(null)
  const timer = useRef<NodeJS.Timeout>()

  const handleShowTooltip = useCallback(() => {
    timer.current = setTimeout(() => {
      setIsShowTooltip(true)
    }, delay)
  }, [delay])

  const handleHideTooltip = useCallback(() => {
    clearTimeout(timer.current)
    if (!tooltipRef.current) return false
    tooltipRef.current.classList.remove("animate-[opacityIn_ease-out_forwards]")
    tooltipRef.current.classList.add("animate-[opacityOut_ease-out_forwards]")
    tooltipRef.current.style.animationDuration = `${animationOut}ms`
    timer.current = setTimeout(() => {
      setIsShowTooltip(false)
    }, animationOut)
  }, [animationOut])

  useLayoutEffect(() => {
    const getActualPosition = (anchorRect: DOMRect, tooltipRect: DOMRect, containerRect: DOMRect) => {
      let actualPosition = position

      if (["top", "bottom"].includes(position.split("-")[0])) {
        // Check if tooltip is overflow top or bottom (Vertical)
        if (actualPosition.includes("top")) {
          const isOverflowTop = anchorRect.top - containerRect.top - tooltipRect.height - offsetY < 0
          actualPosition = isOverflowTop ? actualPosition.replace("top", "bottom") as Position : actualPosition
        } else if (actualPosition.includes("bottom")) {
          const isOverflowBottom = anchorRect.bottom + tooltipRect.height + offsetY > containerRect.bottom
          actualPosition = isOverflowBottom ? actualPosition.replace("bottom", "top") as Position : actualPosition
        }
      } else {
        // Check is tooltip is overflow left or right (Horizontal)
        if (actualPosition.includes("left")) {
          const isOverflowLeft = anchorRect.left - containerRect.left - tooltipRect.width - offsetX < 0
          console.log(isOverflowLeft)
          actualPosition = isOverflowLeft ? actualPosition.replace("left", "right") as Position : actualPosition
        } else if (actualPosition.includes("right")) {
          const isOverflowRight = anchorRect.right + tooltipRect.width + offsetX > containerRect.right
          actualPosition = isOverflowRight ? actualPosition.replace("right", "left") as Position : actualPosition
        }
      }

      return actualPosition
    }

    const getStyleByActualPosition = (
      actualPosition: Position,
      anchorRect: DOMRect,
      tooltipRect: DOMRect
    ): TooltipPosition => {
      switch (actualPosition) {
        case "top":
          return { bottom: anchorRect.height + offsetY, left: anchorRect.width / 2 - tooltipRect.width / 2 }
        case "bottom":
          return { top: anchorRect.height + offsetY, left: anchorRect.width / 2 - tooltipRect.width / 2 }
        case "right":
          return { top: anchorRect.height / 2 - tooltipRect.height / 2, left: anchorRect.width + offsetX }
        case "left":
          return { top: anchorRect.height / 2 - tooltipRect.height / 2, right: anchorRect.width + offsetX }
        case "top-left":
          return { bottom: anchorRect.height + offsetY, left: 0 }
        case "top-right":
          return { bottom: anchorRect.height + offsetY, right: 0 }
        case "bottom-left":
          return { top: anchorRect.height + offsetY, left: 0 }
        case "bottom-right":
          return { top: anchorRect.height + offsetY, right: 0 }
        case "left-top":
          return { top: 0, right: anchorRect.width + offsetX }
        case "left-bottom":
          return { bottom: 0, right: anchorRect.width + offsetX }
        case "right-bottom":
          return { bottom: 0, left: anchorRect.width + offsetX }
        case "right-top":
        default:
          return { top: 0, left: anchorRect.width + offsetX }
      }
    }

    const calculateTooltipPosition = () => {
      if (!isShowTooltip || !tooltipRef.current || !anchorRef.current) return false
      const anchorRect = anchorRef.current.getBoundingClientRect()
      const tooltipRect = tooltipRef.current.getBoundingClientRect()
      const containerRect = containerRef?.current?.getBoundingClientRect() ?? new DOMRect(0, 0, window.innerWidth, window.innerHeight)

      const actualPosition = getActualPosition(anchorRect, tooltipRect, containerRect)
      setTooltipPosition(getStyleByActualPosition(actualPosition, anchorRect, tooltipRect))
    }

    calculateTooltipPosition()
  }, [isShowTooltip, offsetX, offsetY, position, containerRef])

  useEffect(() => {
    const handleToggleTooltipByValue = () => {
      if (event !== "value") return false
      open ? handleShowTooltip() : handleHideTooltip()
    }

    handleToggleTooltipByValue()
  }, [event, open, handleShowTooltip, handleHideTooltip])

  useEffect(() => {
    return () => {
      clearTimeout(timer.current)
    }
  }, [])

  return (
    <div className="relative">
      <div
        ref={anchorRef}
        onMouseEnter={event === "value" ? () => { } : handleShowTooltip}
        onMouseLeave={event === "value" ? () => { } : handleHideTooltip}
      >{children}</div>
      <CanView condition={isShowTooltip}>
        <div
          ref={tooltipRef}
          style={{ animationDuration: `${animationIn}ms`, ...tooltipPosition }}
          className={clsx(
            "z-10 max-w-full absolute min-w-max bg-gray1 text-white px-2.5 py-1.5 rounded-md text-xs animate-[opacityIn_ease-out_forwards]",
            tooltipClasses
          )}
        >
          {title}
        </div>
      </CanView>
    </div>
  )
}

export default Tooltip