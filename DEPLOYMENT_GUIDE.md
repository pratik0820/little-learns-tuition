# Deployment Guide - Little Learner's Website

This guide will help you deploy your website and make it live on the internet for free.

## Option 1: Vercel (Recommended - Easiest)

Vercel is the easiest option and works perfectly with Vite/React projects.

### Steps:

1. **Create a GitHub account** (if you don't have one)
   - Go to https://github.com
   - Sign up for free

2. **Push your code to GitHub**
   ```bash
   cd tuition-website
   git init
   git add .
   git commit -m "Initial commit - Little Learner's website"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/little-learners-website.git
   git push -u origin main
   ```

3. **Deploy with Vercel**
   - Go to https://vercel.com
   - Click "Sign Up" and choose "Continue with GitHub"
   - Click "Import Project"
   - Select your repository
   - Vercel will auto-detect Vite settings
   - Click "Deploy"
   - Done! Your site will be live in 1-2 minutes

4. **Your live URL**
   - You'll get a URL like: `https://little-learners-website.vercel.app`
   - You can add a custom domain later if you want

### Automatic Updates
Every time you push changes to GitHub, Vercel will automatically rebuild and deploy your site!

---

## Option 2: Netlify (Also Easy)

### Steps:

1. **Push code to GitHub** (same as above)

2. **Deploy with Netlify**
   - Go to https://netlify.com
   - Click "Sign Up" with GitHub
   - Click "Add new site" → "Import an existing project"
   - Choose GitHub and select your repository
   - Build settings:
     - Build command: `npm run build`
     - Publish directory: `dist`
   - Click "Deploy site"

3. **Your live URL**
   - You'll get: `https://your-site-name.netlify.app`
   - Can customize the subdomain or add custom domain

---

## Option 3: GitHub Pages

### Steps:

1. **Update vite.config.js** for GitHub Pages:
   ```javascript
   import { defineConfig } from 'vite'
   import react from '@vitejs/plugin-react'

   export default defineConfig({
     plugins: [react()],
     base: '/little-learners-website/', // Replace with your repo name
   })
   ```

2. **Install gh-pages package**:
   ```bash
   npm install --save-dev gh-pages
   ```

3. **Add deploy scripts to package.json**:
   ```json
   {
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     }
   }
   ```

4. **Push to GitHub and deploy**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/little-learners-website.git
   git push -u origin main
   npm run deploy
   ```

5. **Enable GitHub Pages**:
   - Go to your repo on GitHub
   - Settings → Pages
   - Source: Deploy from branch
   - Branch: gh-pages
   - Save

6. **Your live URL**:
   - `https://YOUR_USERNAME.github.io/little-learners-website/`

---

## Quick Start Commands

### If you haven't initialized git yet:

```bash
cd tuition-website
git init
git add .
git commit -m "Initial commit - Little Learner's website"
```

### Create a new repository on GitHub:
1. Go to https://github.com/new
2. Repository name: `little-learners-website`
3. Make it Public
4. Don't initialize with README (you already have files)
5. Click "Create repository"

### Push your code:
```bash
git remote add origin https://github.com/YOUR_USERNAME/little-learners-website.git
git branch -M main
git push -u origin main
```

---

## Recommended: Vercel

**Why Vercel?**
- ✅ Zero configuration needed
- ✅ Automatic deployments on every push
- ✅ Free SSL certificate (HTTPS)
- ✅ Fast global CDN
- ✅ Preview deployments for testing
- ✅ Perfect for React/Vite projects

---

## After Deployment

### Update Contact Information
Make sure to update:
- Phone numbers in the code
- Email addresses
- WhatsApp number
- Google Maps location
- Any placeholder content

### Custom Domain (Optional)
All three platforms support custom domains:
- Buy a domain from GoDaddy, Namecheap, etc.
- Add it in your deployment platform settings
- Update DNS records as instructed

### Monitor Your Site
- Check Google Analytics (add tracking code)
- Monitor form submissions
- Test on different devices

---

## Troubleshooting

### Build fails?
- Make sure all dependencies are in package.json
- Run `npm install` before deploying
- Check for any console errors

### Images not showing?
- Ensure images are in the `public` folder
- Use paths starting with `/` like `/images/logo.png`

### Need help?
- Vercel docs: https://vercel.com/docs
- Netlify docs: https://docs.netlify.com
- GitHub Pages: https://pages.github.com

---

## Next Steps After Going Live

1. **Test everything**
   - All pages load correctly
   - Forms work
   - WhatsApp button works
   - Mobile responsive
   - All links work

2. **SEO Setup**
   - Submit to Google Search Console
   - Create sitemap
   - Add meta descriptions

3. **Share your website**
   - Add to Google My Business
   - Share on social media
   - Print on business cards

Good luck with your website! 🚀
