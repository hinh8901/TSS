import React from "react"

interface CanViewProps {
  condition: boolean
  children: React.ReactNode
  fallback?: React.ReactNode
}

const CanView: React.FC<CanViewProps> = (props) => {
  const { condition, children, fallback } = props
  return condition ? children : fallback
}

export default CanView