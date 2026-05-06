# Photography Portfolio Boilerplate

A premium, luxury photography portfolio built with Next.js 16, featuring cinematic animations, 3D elements, and Instagram integration. Perfect for photographers who want a professional online presence with minimal setup.

## Features

✨ **Luxury Design System**
- Minimal black/white aesthetic with elegant typography
- Custom animations and transitions using Framer Motion
- Responsive design that works on all devices
- Dark theme by default with smooth scroll behavior

🎨 **Gallery & Lightbox**
- Masonry image grid with hover effects
- Smooth lightbox modal with keyboard navigation
- Image reveal animations with stagger effects
- Optimized Next.js Image component for performance

🎬 **3D Elements**
- React Three Fiber floating glass sphere in hero
- Mouse tracking parallax effect
- Optimized for performance (disabled on mobile)
- Lighting and material physics for realism

📸 **Instagram Integration**
- Automatic Instagram feed integration (ISR 6-hour revalidation)
- Mock data included for quick setup
- Easy switch to real Instagram API
- Server-side rendering with caching

⚡ **Performance Optimized**
- Dynamic imports for 3D components
- Image lazy loading with blur placeholders
- Code splitting with Next.js App Router
- Lighthouse 85+ target scores

🎯 **Developer Friendly**
- Centralized site configuration (`config/site.ts`)
- Reusable component library
- Custom hooks for Instagram data and scroll animations
- TypeScript support throughout
- Shadcn/ui components included

## Quick Start

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Customize Configuration

Edit `config/site.ts` to update:
- Photographer name and bio
- Instagram username
- Contact email
- Social links
- Navigation menu

Example:
```typescript
export const siteConfig = {
  name: 'Your Name',
  tagline: 'Your tagline',
  bio: 'Your biography',
  instagramUsername: 'your_username',
  contactEmail: 'hello@yoursite.com',
  // ... more config
}
```

### 3. Run Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/
│   ├── layout.tsx              # Root layout with dark theme
│   ├── globals.css             # Global styles and animations
│   ├── page.tsx                # Home page
│   ├── gallery/page.tsx        # Gallery page
│   ├── about/page.tsx          # About page
│   ├── contact/page.tsx        # Contact form page
│   └── api/instagram/route.ts  # Instagram API endpoint
├── components/
│   ├── layout/                 # Navbar, Footer
│   ├── sections/               # Hero, Featured Grid, Animated Section
│   ├── gallery/                # Image Grid, Lightbox Modal
│   ├── 3d/                     # Three.js components
│   └── ui/                     # Shadcn components
├── config/
│   └── site.ts                 # Centralized site config
├── hooks/
│   ├── use-instagram.ts        # SWR hook for Instagram data
│   └── use-scroll-animation.ts # Intersection Observer hook
├── lib/
│   └── instagram-service.ts    # Instagram API service
└── public/                     # Static assets
```

## Pages

### Home (`/`)
- Full-screen hero section with 3D floating sphere
- Featured grid of top 6 photos
- Animated sections on scroll
- Scroll-to-explore CTA

### Gallery (`/gallery`)
- Complete masonry grid of all photos
- Lightbox modal with navigation
- Keyboard support (ESC to close, ← → to navigate)
- Image meta information display

### About (`/about`)
- Professional biography
- Photo and detailed sections
- Storytelling about photography philosophy
- Call-to-action to contact

### Contact (`/contact`)
- Contact form with validation
- Subject dropdown selection
- Success/error messages
- Social links display

## Instagram Integration

The portfolio now supports **real Instagram API integration**! 

### Quick Setup

1. Follow the detailed guide in **[INSTAGRAM_SETUP.md](./INSTAGRAM_SETUP.md)**
2. Choose between:
   - **Instagram Basic Display API** (for personal accounts) - Recommended
   - **Instagram Graph API** (for business/creator accounts)
3. Add your access token to `.env.local`
4. Restart your dev server

### Configuration

The Instagram username is configured in `config/site.ts`:
```typescript
export const siteConfig = {
  instagramUsername: 'omergraphy_us',
  // ...
}
```

Your posts will automatically appear on:
- Home page (Featured Work section - 6 posts)
- Gallery page (Full grid - 24 posts)

Posts are cached for 6 hours using Next.js ISR for optimal performance.

## Animations

The portfolio includes custom animations:
- **Page Transitions**: Fade and slide effects when navigating
- **Image Reveals**: Staggered animations on grid items
- **Scroll Animations**: Fade-in effects when scrolling into view
- **Micro-interactions**: Hover effects, button states, form inputs
- **3D Parallax**: Mouse tracking on the hero sphere

All animations are built with Framer Motion for smooth 60fps performance.

## Performance Tips

1. **Image Optimization**
   - All images use Next.js Image component
   - Automatic WebP conversion and sizing
   - Lazy loading with blur placeholders

2. **3D Optimization**
   - Disabled on mobile devices automatically
   - LOD (Level of Detail) for complex geometries
   - Frame rate monitoring available

3. **Code Splitting**
   - 3D components load dynamically
   - Route-based splitting automatic with App Router
   - Unused code eliminated in production builds

4. **Caching**
   - Instagram API response cached for 6 hours (ISR)
   - SWR client-side caching for API requests
   - Browser caching headers configured

## Customization

### Colors

Edit the CSS variables in `app/globals.css` under `:root` and `.dark`:
```css
:root {
  --background: #ffffff;
  --foreground: #000000;
  --primary: #000000;
  --secondary: #f5f5f5;
  /* ... more colors */
}
```

### Typography

The portfolio uses the `Geist` font family loaded from Google Fonts. To change fonts, edit `app/layout.tsx`:
```typescript
import { YourFont } from 'next/font/google'

const _yourFont = YourFont({ subsets: ["latin"] })
```

### Components

All shadcn/ui components are available. Add new ones:
```bash
pnpx shadcn-ui@latest add <component-name>
```

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in [Vercel Dashboard](https://vercel.com)
3. Set environment variables if using real Instagram API
4. Deploy with one click

Vercel automatically optimizes Next.js and enables features like:
- Automatic ISR revalidation
- Edge middleware
- Performance monitoring
- Instant rollbacks

### Other Platforms

The portfolio is a standard Next.js app and works on any platform supporting Node.js:
- Netlify
- AWS Amplify
- DigitalOcean
- Self-hosted servers

## Environment Variables

Create a `.env.local` file for Instagram API configuration:

```env
# Instagram Basic Display API (Recommended)
INSTAGRAM_ACCESS_TOKEN=your_instagram_access_token_here
INSTAGRAM_API_TYPE=basic

# OR Instagram Graph API (for business accounts)
# INSTAGRAM_BUSINESS_ACCOUNT_ID=your_business_account_id
# FACEBOOK_ACCESS_TOKEN=your_facebook_access_token
# INSTAGRAM_API_TYPE=graph
```

See **[INSTAGRAM_SETUP.md](./INSTAGRAM_SETUP.md)** for detailed setup instructions.

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

3D elements gracefully degrade on mobile devices.

## Technologies Used

- **Framework**: Next.js 16 with App Router
- **Styling**: Tailwind CSS + Custom CSS
- **Animations**: Framer Motion
- **3D**: React Three Fiber + Three.js
- **Data Fetching**: SWR + Fetch API
- **State**: Zustand (optional)
- **UI Components**: shadcn/ui
- **Forms**: React Hook Form + Zod
- **Icons**: Lucide React

## License

This boilerplate is open source and available under the MIT License. Feel free to use it for commercial or personal projects.

## Support

For issues, questions, or suggestions:
1. Check the [Next.js documentation](https://nextjs.org/docs)
2. Review the [Framer Motion docs](https://www.framer.com/motion/)
3. Check [React Three Fiber examples](https://docs.pmnd.rs/react-three-fiber/)

## Credits

Built with modern web technologies and best practices for premium photography portfolios. Inspired by luxury brand websites and Apple's design principles.

---

**Ready to showcase your work?** Update `config/site.ts` and deploy to Vercel in minutes!
# photography1
# photography1
