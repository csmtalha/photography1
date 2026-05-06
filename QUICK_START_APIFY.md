# Quick Start: Apify Instagram Integration

## 🚀 5-Minute Setup

### Step 1: Create Apify Account
Go to https://console.apify.com/ and sign up (it's free!)

### Step 2: Get API Token
1. Click your profile icon → **Settings** → **Integrations**
2. Copy your **Personal API Token**

### Step 3: Run Instagram Scraper
1. Go to https://apify.com/apify/instagram-profile-scraper
2. Click **"Try for free"**
3. Enter your username:
   ```json
   {
     "usernames": ["taimooradnansheikh"],
     "resultsLimit": 50
   }
   ```
4. Click **"Start"** and wait ~1 minute

### Step 4: Get Dataset ID
1. After scraper finishes, click **"Dataset"** tab
2. Look at the URL: `https://console.apify.com/storage/datasets/[DATASET_ID]`
3. Copy the **DATASET_ID** (the long string)

### Step 5: Configure Project
Open `.env.local` and add:
```env
APIFY_DATASET_ID=paste_your_dataset_id_here
APIFY_TOKEN=paste_your_api_token_here
```

### Step 6: Start Dev Server
```bash
pnpm dev
```

Visit http://localhost:3000 - your Instagram posts should appear! 🎉

---

## 🔄 Updating Posts

To refresh your Instagram posts:
1. Go back to Apify Console
2. Find your scraper run
3. Click **"Start"** to run it again
4. Your site will automatically show new posts (cached for 6 hours)

---

## ⚠️ Common Issues

**"No posts showing"**
- Check `.env.local` has both values
- Restart dev server: `Ctrl+C` then `pnpm dev`
- Check browser console (F12) for errors

**"How do I test if it's working?"**

Visit this URL in your browser (replace with your values):
```
https://api.apify.com/v2/datasets/YOUR_DATASET_ID/items?token=YOUR_TOKEN
```

You should see JSON with your Instagram posts.

---

## 💰 Cost

- **Free tier**: $5/month credits
- **Scraper cost**: ~$0.01 per run
- **API calls**: Free (unlimited)

Perfect for personal portfolios!

---

## 📖 More Details

See **[APIFY_SETUP.md](./APIFY_SETUP.md)** for detailed instructions and troubleshooting.
