#!/usr/bin/env node

/**
 * Instagram API Connection Test Script
 * 
 * This script helps you verify your Instagram API setup is working correctly.
 * Run with: node scripts/test-instagram-api.js
 */

require('dotenv').config({ path: '.env.local' })

const COLORS = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
}

function log(message, color = 'reset') {
  console.log(`${COLORS[color]}${message}${COLORS.reset}`)
}

async function testBasicAPI() {
  const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN

  if (!accessToken) {
    log('❌ INSTAGRAM_ACCESS_TOKEN not found in .env.local', 'red')
    return false
  }

  log('✓ Access token found', 'green')
  log(`  Token preview: ${accessToken.substring(0, 20)}...`, 'cyan')

  try {
    log('\n🔄 Testing Instagram Basic Display API...', 'blue')
    
    const fields = 'id,media_type,media_url,permalink,caption,timestamp'
    const url = `https://graph.instagram.com/me/media?fields=${fields}&access_token=${accessToken}&limit=5`

    const response = await fetch(url)
    const data = await response.json()

    if (!response.ok) {
      log(`❌ API Error: ${data.error?.message || 'Unknown error'}`, 'red')
      
      if (data.error?.code === 190) {
        log('\n💡 Troubleshooting tips:', 'yellow')
        log('  1. Your access token may have expired (tokens expire after 60 days)', 'yellow')
        log('  2. Generate a new token from Facebook Developer Console', 'yellow')
        log('  3. Make sure you accepted the tester invite on Instagram', 'yellow')
      }
      
      return false
    }

    const posts = data.data || []
    
    if (posts.length === 0) {
      log('⚠️  API connected but no posts found', 'yellow')
      log('   Make sure your Instagram account has posts', 'yellow')
      return true
    }

    log(`✅ Successfully fetched ${posts.length} posts!`, 'green')
    log('\n📸 Sample post:', 'cyan')
    log(`   ID: ${posts[0].id}`, 'cyan')
    log(`   Type: ${posts[0].media_type}`, 'cyan')
    log(`   Caption: ${posts[0].caption?.substring(0, 50) || 'No caption'}...`, 'cyan')
    log(`   URL: ${posts[0].permalink}`, 'cyan')

    return true
  } catch (error) {
    log(`❌ Network error: ${error.message}`, 'red')
    return false
  }
}

async function testGraphAPI() {
  const businessAccountId = process.env.INSTAGRAM_BUSINESS_ACCOUNT_ID
  const accessToken = process.env.FACEBOOK_ACCESS_TOKEN

  if (!businessAccountId || !accessToken) {
    log('❌ INSTAGRAM_BUSINESS_ACCOUNT_ID or FACEBOOK_ACCESS_TOKEN not found', 'red')
    return false
  }

  log('✓ Business account ID and access token found', 'green')

  try {
    log('\n🔄 Testing Instagram Graph API...', 'blue')
    
    const fields = 'id,media_type,media_url,permalink,caption,timestamp'
    const url = `https://graph.facebook.com/v18.0/${businessAccountId}/media?fields=${fields}&access_token=${accessToken}&limit=5`

    const response = await fetch(url)
    const data = await response.json()

    if (!response.ok) {
      log(`❌ API Error: ${data.error?.message || 'Unknown error'}`, 'red')
      return false
    }

    const posts = data.data || []
    
    if (posts.length === 0) {
      log('⚠️  API connected but no posts found', 'yellow')
      return true
    }

    log(`✅ Successfully fetched ${posts.length} posts!`, 'green')
    log('\n📸 Sample post:', 'cyan')
    log(`   ID: ${posts[0].id}`, 'cyan')
    log(`   Type: ${posts[0].media_type}`, 'cyan')
    log(`   Caption: ${posts[0].caption?.substring(0, 50) || 'No caption'}...`, 'cyan')

    return true
  } catch (error) {
    log(`❌ Network error: ${error.message}`, 'red')
    return false
  }
}

async function main() {
  log('═══════════════════════════════════════════════', 'blue')
  log('  Instagram API Connection Test', 'blue')
  log('═══════════════════════════════════════════════\n', 'blue')

  // Check .env.local exists
  const fs = require('fs')
  if (!fs.existsSync('.env.local')) {
    log('❌ .env.local file not found!', 'red')
    log('\n💡 Create .env.local and add your Instagram credentials', 'yellow')
    log('   See INSTAGRAM_SETUP.md for detailed instructions', 'yellow')
    process.exit(1)
  }

  log('✓ .env.local file found', 'green')

  const apiType = process.env.INSTAGRAM_API_TYPE || 'basic'
  log(`✓ API Type: ${apiType}`, 'green')

  let success = false

  if (apiType === 'graph') {
    success = await testGraphAPI()
  } else {
    success = await testBasicAPI()
  }

  log('\n═══════════════════════════════════════════════', 'blue')
  
  if (success) {
    log('✅ Instagram API is configured correctly!', 'green')
    log('\n🚀 Next steps:', 'cyan')
    log('   1. Start your dev server: pnpm dev', 'cyan')
    log('   2. Visit http://localhost:3000', 'cyan')
    log('   3. Check the home page and gallery for your posts', 'cyan')
  } else {
    log('❌ Instagram API configuration has issues', 'red')
    log('\n📖 See INSTAGRAM_SETUP.md for setup instructions', 'yellow')
  }
  
  log('═══════════════════════════════════════════════\n', 'blue')
}

main()
