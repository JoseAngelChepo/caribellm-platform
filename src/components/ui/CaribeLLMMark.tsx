import { BrandMarkGraphic } from "@/brand/BrandMarkGraphic"
import { brandMarkViewBox } from "@/brand/mark"

type CaribeLLMMarkProps = {
  size?: number
  color?: string
  className?: string
  title?: string
}

export default function CaribeLLMMark({
  size = 20,
  color,
  className = "",
  title,
}: CaribeLLMMarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox={brandMarkViewBox}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      shapeRendering="geometricPrecision"
      aria-hidden={title ? undefined : true}
      role={title ? "img" : undefined}
      style={{ display: "block" }}
    >
      {title ? <title>{title}</title> : null}
      <BrandMarkGraphic color={color} />
    </svg>
  )
}
