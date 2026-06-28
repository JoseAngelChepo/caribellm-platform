import { BrandMarkGraphic } from "@/brand/BrandMarkGraphic"
import { brandMarkViewBox } from "@/brand/mark"

export const size = { width: 32, height: 32 }
export const contentType = "image/svg+xml"

export default function Icon() {
  return (
    <svg
      width={32}
      height={32}
      viewBox={brandMarkViewBox}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      shapeRendering="geometricPrecision"
    >
      <BrandMarkGraphic />
    </svg>
  )
}
