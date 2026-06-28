import { readFileSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"
import sharp from "sharp"
import toIco from "to-ico"

const root = join(dirname(fileURLToPath(import.meta.url)), "..")
const svgPath = join(root, "src/brand/caribellm-mark.svg")
const appDir = join(root, "src/app")
const svg = readFileSync(svgPath)

/** High-DPI SVG raster → crisp downscale for small ICO/PNG sizes. */
const SVG_DENSITY = 384
const MASTER_PX = 512

async function rasterize(targetPx) {
  return sharp(svg, { density: SVG_DENSITY })
    .resize(MASTER_PX, MASTER_PX, {
      fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .resize(targetPx, targetPx, {
      kernel: sharp.kernel.lanczos3,
      fit: "fill",
    })
    .png({
      compressionLevel: 9,
      palette: false,
      quality: 100,
      effort: 10,
    })
    .toBuffer()
}

const png16 = await rasterize(16)
const png32 = await rasterize(32)
const png48 = await rasterize(48)
const png180 = await rasterize(180)

writeFileSync(join(appDir, "favicon.ico"), await toIco([png16, png32, png48]))
writeFileSync(join(appDir, "apple-icon.png"), png180)

console.log("Wrote src/app/favicon.ico (16/32/48) and apple-icon.png (180)")
