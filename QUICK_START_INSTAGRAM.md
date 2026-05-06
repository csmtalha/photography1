# Quick Start: Instagram API Integration

## 🚀 Fast Track Setup (5 minutes)

### Step 1: Create Facebook App
1. Go to https://developers.facebook.com/
2. Click "My Apps" → "Create App" → Choose "Consumer"
3. Name it anything (e.g., "My Portfolio")

### Step 2: Add Instagram Basic Display
1. In your app, find "Instagram Basic Display" → Click "Set Up"
2. Click "Create New App" in the Instagram section

### Step 3: Add Yourself as Tester
1. Go to "Basic Display" settings
2. Scroll to "User Token Generator"
3. Click "Add or Remove Instagram Testers"
4. Add your username: **omergraphy_us**
5. **Important**: Open Instagram app on your phone
   - Settings → Apps and Websites → Tester Invites
   - Accept the invite!

### Step 4: Generate Token
1. Back in Facebook Developer Console
2. Under "User Token Generator", click "Generate Token"
3. Authorize the app
4. **Copy the long token string**

### Step 5: Configure Your Project
1. Open `.env.local` in your project root
2. Paste your token:
   ```env
   INSTAGRAM_ACCESS_TOKEN=paste_your_token_here
   INSTAGRAM_API_TYPE=basic
   ```

### Step 6: Test It!
```bash
# Test the API connection
pnpm test:instagram

# If successful, start your dev server
pnpm dev
```

Visit http://localhost:3000 and your Instagram posts should appear! 🎉

---

## ⚠️ Common Issues

**"Invalid OAuth access token"**
- Did you accept the tester invite in Instagram app?
- Token might be expired (they last 60 days)

**"No posts showing"**
- Check browser console for errors (F12)
- Make sure you restarted dev server after adding token
- Run `pnpm test:instagram` to diagnose

**"INSTAGRAM_ACCESS_TOKEN is not configured"**
- Make sure `.env.local` is in project root (not in a subfolder)
- Variable name must be exactly `INSTAGRAM_ACCESS_TOKEN`
- Restart your dev server

---

## 📖 Need More Help?

See **[INSTAGRAM_SETUP.md](./INSTAGRAM_SETUP.md)** for detailed instructions and troubleshooting.

---

## 🔄 Token Expiration

Your token expires in **60 days**. When it expires:
1. Go back to Facebook Developer Console
2. Generate a new token (same steps as above)
3. Update `.env.local` with the new token
4. Restart your server

For production, consider implementing automatic token refresh.
