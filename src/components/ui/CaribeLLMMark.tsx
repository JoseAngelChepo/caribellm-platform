import {
  brandMarkColor,
  brandMarkCrest,
  brandMarkUndertow,
  brandMarkViewBox,
} from "@/brand/mark"

type CaribeLLMMarkProps = {
  size?: number
  color?: string
  className?: string
  title?: string
}

export default function CaribeLLMMark({
  size = 20,
  color = brandMarkColor,
  className = "",
  title,
}: CaribeLLMMarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox={brandMarkViewBox}
      fill="none"
      shapeRendering="geometricPrecision"
      className={className}
      aria-hidden={title ? undefined : true}
      role={title ? "img" : undefined}
    >
      {title ? <title>{title}</title> : null}
      <path
        d={brandMarkCrest.d}
        stroke={color}
        strokeWidth={brandMarkCrest.width}
        strokeLinecap="round"
        strokeLinejoin="miter"
        strokeMiterlimit={4}
        fill="none"
      />
      <path
        d={brandMarkUndertow.d}
        stroke={color}
        strokeWidth={brandMarkUndertow.width}
        strokeLinecap="square"
        strokeLinejoin="miter"
        strokeMiterlimit={4}
        fill="none"
      />
    </svg>
  )
}
