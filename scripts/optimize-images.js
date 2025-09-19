const fs = require('fs')
const path = require('path')
const sharp = require('sharp')

const INPUT_DIR = path.join(__dirname, '../src/images')
const OUTPUT_DIR = path.join(__dirname, '../src/images/optimized')

// Create output directory if it doesn't exist
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true })
}

// Image optimization settings
const OPTIMIZATION_SETTINGS = {
  // For PNG images (posters, logos)
  png: {
    quality: 85,
    compressionLevel: 9,
    progressive: true,
  },
  // For JPEG images
  jpeg: {
    quality: 80,
    progressive: true,
    mozjpeg: true,
  },
  // For GIF images (keep as is, just copy)
  gif: {
    copy: true,
  },
}

async function optimizeImage(inputPath, outputPath, format) {
  try {
    const stats = fs.statSync(inputPath)
    const originalSize = stats.size

    if (format === 'gif') {
      // Copy GIF files as-is
      fs.copyFileSync(inputPath, outputPath)
      console.log(`📋 Copied: ${path.basename(inputPath)} (${(originalSize / 1024).toFixed(1)}KB)`)
      return
    }

    const settings = OPTIMIZATION_SETTINGS[format]
    let sharpInstance = sharp(inputPath)

    if (format === 'png') {
      sharpInstance = sharpInstance.png({
        quality: settings.quality,
        compressionLevel: settings.compressionLevel,
        progressive: settings.progressive,
      })
    } else if (format === 'jpeg') {
      sharpInstance = sharpInstance.jpeg({
        quality: settings.quality,
        progressive: settings.progressive,
        mozjpeg: settings.mozjpeg,
      })
    }

    await sharpInstance.toFile(outputPath)

    const newStats = fs.statSync(outputPath)
    const newSize = newStats.size
    const savings = ((originalSize - newSize) / originalSize * 100).toFixed(1)

    console.log(`✅ Optimized: ${path.basename(inputPath)} ${(originalSize / 1024).toFixed(1)}KB → ${(newSize / 1024).toFixed(1)}KB (${savings}% smaller)`)
  } catch (error) {
    console.error(`❌ Error optimizing ${inputPath}:`, error.message)
  }
}

async function optimizeAllImages() {
  console.log('🚀 Starting image optimization...\n')

  const files = fs.readdirSync(INPUT_DIR)
  const imageFiles = files.filter(file => {
    const ext = path.extname(file).toLowerCase()
    return ['.png', '.jpg', '.jpeg', '.gif'].includes(ext)
  })

  console.log(`Found ${imageFiles.length} images to optimize:\n`)

  for (const file of imageFiles) {
    const inputPath = path.join(INPUT_DIR, file)
    const ext = path.extname(file).toLowerCase()
    const nameWithoutExt = path.basename(file, ext)
    const outputPath = path.join(OUTPUT_DIR, `${nameWithoutExt}${ext}`)

    let format = 'jpeg'
    if (ext === '.png') format = 'png'
    else if (ext === '.gif') format = 'gif'

    await optimizeImage(inputPath, outputPath, format)
  }

  console.log('\n🎉 Image optimization complete!')
  console.log(`📁 Optimized images saved to: ${OUTPUT_DIR}`)
}

// Run optimization
optimizeAllImages().catch(console.error)
