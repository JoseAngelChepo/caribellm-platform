import { renderBrandMarkSvg } from "@/brand/mark"

export const size = { width: 32, height: 32 }
export const contentType = "image/svg+xml"

export default function Icon() {
  return new Response(renderBrandMarkSvg(), {
    headers: {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  })
}
