import React from "react"
import Link, { LinkProps } from "next/link"
import NextImage, { ImageProps as NextImageProps } from "next/image"

interface ImageProps {
  src: NextImageProps["src"]
  alt: NextImageProps["alt"]
  width: NextImageProps["width"]
  height: NextImageProps["height"]
  priority?: NextImageProps["priority"]
  href?: LinkProps["href"]
  className?: NextImageProps["className"]
  slots?: {
    link?: Omit<LinkProps, "href">
    image?: Omit<NextImageProps, "src" | "alt" | "width" | "height" | "priority" | "className">
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
    slots
  } = props

  const customImage = (
    <NextImage
      src={src}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      className={className}
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