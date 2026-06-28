import {
  brandMarkColor,
  brandMarkStrokes,
} from "@/brand/mark"

type BrandMarkGraphicProps = {
  color?: string
}

/** Shared paths for the brand mark (header, app icons). */
export function BrandMarkGraphic({ color = brandMarkColor }: BrandMarkGraphicProps) {
  return (
    <>
      {brandMarkStrokes.map((stroke) => (
        <path
          key={stroke.d}
          d={stroke.d}
          stroke={color}
          strokeWidth={stroke.width}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      ))}
    </>
  )
}
