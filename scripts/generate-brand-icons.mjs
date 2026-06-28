import { readFileSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"
import sharp from "sharp"
import toIco from "to-ico"

const root = join(dirname(fileURLToPath(import.meta.url)), "..")
const svgPath = join(root, "src/brand/caribellm-mark.svg")
const appDir = join(root, "src/app")
const svg = readFileSync(svgPath)

// Rasterize at high density, then downscale for sharper favicon edges.
const master = await sharp(svg, { density: 384 })
  .resize(128, 128, { kernel: sharp.kernel.lanczos3 })
  .png({ compressionLevel: 9, palette: false })
  .toBuffer()

const png32 = await sharp(master)
  .resize(32, 32, { kernel: sharp.kernel.lanczos3 })
  .png({ compressionLevel: 9 })
  .toBuffer()

const png16 = await sharp(master)
  .resize(16, 16, { kernel: sharp.kernel.lanczos3 })
  .png({ compressionLevel: 9 })
  .toBuffer()

const png180 = await sharp(master)
  .resize(180, 180, { kernel: sharp.kernel.lanczos3 })
  .png({ compressionLevel: 9 })
  .toBuffer()

writeFileSync(join(appDir, "icon.png"), png32)
writeFileSync(join(appDir, "apple-icon.png"), png180)
writeFileSync(join(appDir, "favicon.ico"), await toIco([png16, png32]))

console.log("Wrote src/app/icon.png, apple-icon.png, favicon.ico")
