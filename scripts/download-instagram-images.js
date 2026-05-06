#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const https = require('https')

async function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      if (response.statusCode === 200) {
        const fileStream = fs.createWriteStream(filepath)
        response.pipe(fileStream)
        fileStream.on('finish', () => {
          fileStream.close()
          resolve()
        })
      } else {
        reject(new Error(`Failed to download: ${response.statusCode}`))
      }
    }).on('error', reject)
  })
}

async function main() {
  console.log('📥 Downloading Instagram images...\n')

  // Read the JSON data
  const dataPath = path.join(process.cwd(), 'public', 'instagram-data.json')
  const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'))

  // Create images directory
  const imagesDir = path.join(process.cwd(), 'public', 'instagram-images')
  if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir, { recursive: true })
  }

  let successCount = 0
  let failCount = 0

  // Download each image
  for (let i = 0; i < Math.min(data.length, 50); i++) {
    const post = data[i]
    const imageUrl = post.displayUrl
    const filename = `${post.id}.jpg`
    const filepath = path.join(imagesDir, filename)

    if (fs.existsSync(filepath)) {
      console.log(`✓ Already exists: ${filename}`)
      // Update JSON to use local path
      data[i].displayUrl = `/instagram-images/${filename}`
      successCount++
      continue
    }

    try {
      console.log(`⬇️  Downloading: ${filename}...`)
      await downloadImage(imageUrl, filepath)
      console.log(`✅ Downloaded: ${filename}`)
      
      // Update the JSON to use local path ONLY if download succeeded
      data[i].displayUrl = `/instagram-images/${filename}`
      successCount++
      
      // Small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 500))
    } catch (error) {
      console.error(`❌ Failed to download ${filename}:`, error.message)
      failCount++
      // Keep original URL if download failed
    }
  }

  // Save updated JSON
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2))
  console.log(`\n✅ Downloaded ${successCount} images successfully!`)
  console.log(`❌ Failed to download ${failCount} images (keeping original URLs)`)
  console.log(`📁 Images saved to: ${imagesDir}`)
}

main().catch(console.error)
