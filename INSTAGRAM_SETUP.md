# Instagram API Integration Setup Guide

This guide will help you set up real Instagram API integration for your photography portfolio.

## Prerequisites

- An Instagram account (omergraphy_us)
- A Facebook Developer account
- Your Instagram account must be a Creator or Business account (for Graph API) OR a personal account (for Basic Display API)

---

## Option 1: Instagram Basic Display API (Recommended for Personal Accounts)

### Step 1: Create a Facebook App

1. Go to [Facebook Developers](https://developers.facebook.com/)
2. Click **"My Apps"** → **"Create App"**
3. Select **"Consumer"** as the app type
4. Fill in the app details:
   - **App Name**: "My Portfolio" (or any name)
   - **App Contact Email**: Your email
5. Click **"Create App"**

### Step 2: Add Instagram Basic Display

1. In your app dashboard, scroll down to **"Add Products"**
2. Find **"Instagram Basic Display"** and click **"Set Up"**
3. Click **"Create New App"** in the Instagram Basic Display section
4. Accept the terms

### Step 3: Configure Basic Display Settings

1. Go to **"Basic Display"** under Instagram in the left sidebar
2. Scroll to **"User Token Generator"**
3. Click **"Add or Remove Instagram Testers"**
4. Click **"Add Instagram Testers"** and enter your Instagram username: `omergraphy_us`
5. Open Instagram app on your phone → Settings → Apps and Websites → Tester Invites → Accept the invite

### Step 4: Generate Access Token

1. Back in Facebook Developer Console, go to **"Basic Display"**
2. Under **"User Token Generator"**, click **"Generate Token"** next to your Instagram account
3. Authorize the app in the popup
4. Copy the **Access Token** (it will look like a long string)

### Step 5: Configure Your App

1. Open `.env.local` in your project
2. Replace `your_instagram_access_token_here` with your actual token:

```env
INSTAGRAM_ACCESS_TOKEN=YOUR_ACTUAL_TOKEN_HERE
INSTAGRAM_API_TYPE=basic
```

### Step 6: Test the Integration

```bash
# Restart your development server
npm run dev
# or
pnpm dev
```

Visit your site and check if Instagram posts are loading!

---

## Option 2: Instagram Graph API (For Business/Creator Accounts)

### Prerequisites

- Your Instagram account must be a **Business** or **Creator** account
- Your Instagram account must be connected to a Facebook Page

### Step 1: Convert to Business Account

1. Open Instagram app
2. Go to Settings → Account → Switch to Professional Account
3. Choose **Creator** or **Business**
4. Connect to a Facebook Page (create one if needed)

### Step 2: Create Facebook App

1. Go to [Facebook Developers](https://developers.facebook.com/)
2. Create a new app (type: **Business**)
3. Add **Instagram Graph API** product

### Step 3: Get Access Token

1. Go to **Graph API Explorer** in Facebook Developer Tools
2. Select your app
3. Add permissions: `instagram_basic`, `pages_show_list`, `pages_read_engagement`
4. Generate Access Token
5. Get your Instagram Business Account ID:
   - Use Graph API Explorer
   - Query: `me/accounts` to get your Page ID
   - Then query: `{PAGE_ID}?fields=instagram_business_account`

### Step 4: Configure Your App

Update `.env.local`:

```env
INSTAGRAM_BUSINESS_ACCOUNT_ID=your_business_account_id
FACEBOOK_ACCESS_TOKEN=your_facebook_access_token
INSTAGRAM_API_TYPE=graph
```

---

## Important Notes

### Access Token Expiration

- **Basic Display API**: Tokens expire after 60 days
- **Graph API**: Short-lived tokens expire in 1 hour, long-lived tokens expire in 60 days

### Token Refresh

For production, you should implement token refresh logic. The tokens provided are for development/testing.

To get a long-lived token (60 days):

```bash
curl -i -X GET "https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token={YOUR_TOKEN}"
```

### Rate Limits

- Basic Display API: 200 calls per hour per user
- Graph API: 200 calls per hour per user

### Troubleshooting

**Error: "Invalid OAuth access token"**
- Your token has expired, generate a new one
- Make sure you accepted the tester invite on Instagram

**Error: "Permissions error"**
- Make sure you added your Instagram account as a tester
- Check that you accepted the invite in Instagram app

**No posts showing**
- Check browser console for errors
- Verify your token is correctly set in `.env.local`
- Restart your development server after changing `.env.local`

**Error: "INSTAGRAM_ACCESS_TOKEN is not configured"**
- Make sure `.env.local` exists in your project root
- Verify the variable name is exactly `INSTAGRAM_ACCESS_TOKEN`
- Restart your dev server

---

## Testing Your Setup

1. Check the API endpoint directly:
   ```
   http://localhost:3000/api/instagram?username=omergraphy_us&limit=12
   ```

2. Check browser console for any errors

3. Verify posts appear on:
   - Home page (Featured Work section)
   - Gallery page

---

## Production Deployment

When deploying to production (Vercel, Netlify, etc.):

1. Add environment variables in your hosting platform's dashboard
2. Use the same variable names as in `.env.local`
3. Consider implementing token refresh for long-term stability

### Vercel Deployment

```bash
vercel env add INSTAGRAM_ACCESS_TOKEN
vercel env add INSTAGRAM_API_TYPE
```

---

## Need Help?

- [Instagram Basic Display API Docs](https://developers.facebook.com/docs/instagram-basic-display-api)
- [Instagram Graph API Docs](https://developers.facebook.com/docs/instagram-api)
- [Facebook Developer Community](https://developers.facebook.com/community/)
