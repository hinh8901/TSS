import React from "react"
import Link, { LinkProps } from "next/link"
import NextImage, { ImageProps as NextImageProps } from "next/image"
import clsx from "clsx"

interface ImageProps {
  src: NextImageProps["src"]
  alt: NextImageProps["alt"]
  width: NextImageProps["width"]
  height: NextImageProps["height"]
  priority?: NextImageProps["priority"]
  href?: LinkProps["href"]
  isBackground?: boolean
  slots?: {
    link?: Omit<LinkProps, "href">
    image?: Omit<NextImageProps, "src" | "alt" | "width" | "height" | "priority">
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
    isBackground,
    slots
  } = props

  const customImage = (
    <NextImage
      src={src}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      className={clsx(
        isBackground ? "absolute bottom-0 left-0 w-full -z-1" : ""
      )}
      {...slots?.image}
    />
  )

  if (href) return (
    <Link href={href} {...slots?.link}>
      {customImage}
    </Link>
  )
  return customImage
}

export default Image