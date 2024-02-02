import React from "react"
import { LinkProps } from "next/link"
import NextImage, { ImageProps as NextImageProps } from "next/image"
import { useLocale } from "next-intl"

import { Link } from "@/navigation"

interface ImageProps {
  src: NextImageProps["src"]
  alt: NextImageProps["alt"]
  width: NextImageProps["width"]
  height: NextImageProps["height"]
  priority?: NextImageProps["priority"]
  href?: LinkProps["href"]
  className?: NextImageProps["className"]
  onClick?: NextImageProps["onClick"]
  slots?: {
    link?: Omit<LinkProps, "href" | "locale"> & { locale?: string }
    image?: Omit<NextImageProps, "src" | "alt" | "width" | "height" | "priority" | "className" | "onClick">
  }
}

const Image: React.FC<ImageProps> = (props) => {
  const {
    src,
    alt,
    width,
    height,
    priority,
    href,
    className,
    onClick,
    slots
  } = props

  const locale = useLocale()

  const customImage = (
    <NextImage
      src={src}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      className={className}
      onClick={onClick}
      {...slots?.image}
    />
  )

  if (href) return (
    <Link href={href} locale={locale} {...slots?.link}>
      {customImage}
    </Link>
  )
  return customImage
}

export default Image