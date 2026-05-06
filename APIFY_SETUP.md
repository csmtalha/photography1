# Apify Instagram Integration Setup Guide

This guide will help you set up Instagram integration using Apify's Instagram scraper. This method is **easier** than the official Instagram API and doesn't require app approval or authentication.

## Why Apify?

✅ **No Instagram API approval needed**  
✅ **Works with any public Instagram account**  
✅ **No token expiration issues**  
✅ **Simple setup (5 minutes)**  
✅ **Reliable data scraping**

---

## Step-by-Step Setup

### Step 1: Create Apify Account

1. Go to [Apify Console](https://console.apify.com/)
2. Sign up for a free account
3. Verify your email

### Step 2: Get Your API Token

1. In Apify Console, click your profile icon (top right)
2. Go to **Settings** → **Integrations**
3. Copy your **Personal API Token**
4. Save it for later (you'll need this)

### Step 3: Run Instagram Profile Scraper

1. Go to [Instagram Profile Scraper](https://apify.com/apify/instagram-profile-scraper) on Apify Store
2. Click **"Try for free"** or **"Start"**
3. Configure the scraper:

   **Input Settings:**
   ```json
   {
     "usernames": ["omergraphy_us"],
     "resultsLimit": 50
   }
   ```

4. Click **"Start"** to run the scraper
5. Wait for it to complete (usually 1-2 minutes)

### Step 4: Get Dataset ID

After the scraper finishes:

1. You'll see the results page
2. Look at the URL in your browser, it will look like:
   ```
   https://console.apify.com/actors/runs/[RUN_ID]
   ```
3. Click on the **"Dataset"** tab
4. The URL will change to:
   ```
   https://console.apify.com/storage/datasets/[DATASET_ID]
   ```
5. Copy the **DATASET_ID** (the long string after `/datasets/`)

**Alternative way to get Dataset ID:**
- In the run results, click **"Export"** → **"API"**
- You'll see the dataset ID in the API URL

### Step 5: Configure Your Project

1. Open `.env.local` in your project root
2. Add your credentials:

```env
APIFY_DATASET_ID=your_dataset_id_here
APIFY_TOKEN=your_apify_token_here
```

**Example:**
```env
APIFY_DATASET_ID=abc123xyz789
APIFY_TOKEN=apify_api_xxxxxxxxxxxxxxxxxxxxxxxxxx
```

### Step 6: Test the Integration

```bash
# Restart your development server
pnpm dev
```

Visit http://localhost:3000 and your Instagram posts should appear! 🎉

---

## Keeping Data Fresh

### Option 1: Manual Updates (Free)

Run the scraper manually whenever you want to update your posts:
1. Go to your scraper in Apify Console
2. Click **"Start"** to run it again
3. The same dataset will be updated with new posts

### Option 2: Scheduled Runs (Paid)

Set up automatic scraping:
1. In your scraper settings, go to **"Schedule"**
2. Create a schedule (e.g., daily at 6 AM)
3. Apify will automatically update your dataset

**Note:** Free tier includes limited runs per month. Check [Apify Pricing](https://apify.com/pricing) for details.

---

## Understanding the Data

The scraper provides:
- **displayUrl**: High-quality image URL
- **caption**: Post caption text
- **shortCode**: Instagram post ID
- **timestamp**: When the post was created
- **type**: IMAGE, VIDEO, or CAROUSEL
- **likesCount**: Number of likes
- **commentsCount**: Number of comments

Our integration uses:
- `displayUrl` → Image to display
- `caption` → Post description
- `shortCode` → Link to original post
- `timestamp` → Post date

---

## Troubleshooting

### "No posts showing on site"

**Check 1: Verify credentials**
```bash
# Make sure .env.local has both values set
cat .env.local
```

**Check 2: Test the API directly**

Open this URL in your browser (replace with your values):
```
https://api.apify.com/v2/datasets/YOUR_DATASET_ID/items?token=YOUR_TOKEN
```

You should see JSON data with your Instagram posts.

**Check 3: Check browser console**
- Open browser DevTools (F12)
- Go to Console tab
- Look for any error messages

**Check 4: Restart dev server**
```bash
# Stop the server (Ctrl+C)
# Start it again
pnpm dev
```

### "Dataset is empty"

- Make sure the scraper run completed successfully
- Check that you used the correct Instagram username
- Try running the scraper again

### "Invalid token" or "Unauthorized"

- Your API token might be incorrect
- Generate a new token from Apify Settings
- Make sure there are no extra spaces in `.env.local`

### "Rate limit exceeded"

- Free tier has limited API calls
- Wait a few minutes and try again
- Consider upgrading your Apify plan

---

## Free Tier Limits

Apify free tier includes:
- **$5 free credits per month**
- Instagram scraper costs ~$0.01-0.05 per run
- API calls are free (unlimited)
- Dataset storage: 30 days

This is usually enough for personal portfolios!

---

## Advanced: Multiple Instagram Accounts

To scrape multiple accounts:

1. Run the scraper with multiple usernames:
   ```json
   {
     "usernames": ["account1", "account2", "account3"],
     "resultsLimit": 50
   }
   ```

2. The dataset will contain posts from all accounts
3. Filter by username in your code if needed

---

## Production Deployment

When deploying to Vercel, Netlify, etc.:

1. Add environment variables in your hosting platform:
   - `APIFY_DATASET_ID`
   - `APIFY_TOKEN`

2. The site will automatically fetch from Apify

### Vercel Example:
```bash
vercel env add APIFY_DATASET_ID
vercel env add APIFY_TOKEN
```

---

## Comparison: Apify vs Instagram API

| Feature | Apify | Instagram API |
|---------|-------|---------------|
| Setup Time | 5 minutes | 30+ minutes |
| Approval Required | No | Yes (for some features) |
| Token Expiration | Never | 60 days |
| Works with any account | Yes | Only your own |
| Cost | ~$0.01/run | Free |
| Rate Limits | Generous | Strict |
| Maintenance | Low | Medium |

---

## Need Help?

- [Apify Documentation](https://docs.apify.com/)
- [Instagram Scraper Docs](https://apify.com/apify/instagram-profile-scraper)
- [Apify Discord Community](https://discord.com/invite/jyEM2PRvMU)

---

## Next Steps

✅ Posts are loading on your site  
✅ Data updates when you run the scraper  
✅ No authentication headaches  

Consider setting up a scheduled run to keep your portfolio automatically updated!
