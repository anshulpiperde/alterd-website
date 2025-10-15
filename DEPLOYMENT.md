# Deploying Alterd to Vercel

## Prerequisites
- A GitHub account
- A Vercel account (sign up at https://vercel.com)
- Git installed on your computer

## Step-by-Step Deployment Guide

### Step 1: Initialize Git Repository (if not already done)
```bash
cd d:\Alterd\project
git init
git add .
git commit -m "Initial commit - Alterd e-commerce website"
```

### Step 2: Create a GitHub Repository
1. Go to https://github.com/new
2. Create a new repository named "alterd-website" (or any name you prefer)
3. **Do NOT** initialize with README, .gitignore, or license
4. Click "Create repository"

### Step 3: Push Code to GitHub
```bash
# Add your GitHub repository as remote
git remote add origin https://github.com/YOUR_USERNAME/alterd-website.git

# Push your code
git branch -M main
git push -u origin main
```

### Step 4: Deploy to Vercel

#### Option A: Using Vercel Dashboard (Recommended)
1. Go to https://vercel.com and sign in
2. Click "Add New..." → "Project"
3. Import your GitHub repository (you may need to authorize Vercel to access GitHub)
4. Select "alterd-website" repository
5. Configure project:
   - **Framework Preset**: Vite
   - **Root Directory**: `./` (leave as default)
   - **Build Command**: `npm run build` (auto-detected)
   - **Output Directory**: `dist` (auto-detected)
6. Click "Deploy"
7. Wait 1-2 minutes for deployment to complete
8. Your site will be live at `https://your-project-name.vercel.app`

#### Option B: Using Vercel CLI
```bash
# Install Vercel CLI globally
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Follow the prompts:
# - Set up and deploy? Yes
# - Which scope? Select your account
# - Link to existing project? No
# - Project name? alterd-website (or your choice)
# - Directory? ./ (press Enter)
# - Override settings? No

# For production deployment
vercel --prod
```

### Step 5: Configure Custom Domain (Optional)
1. In Vercel dashboard, go to your project
2. Click "Settings" → "Domains"
3. Add your custom domain
4. Follow DNS configuration instructions
5. Wait for DNS propagation (can take up to 48 hours)

## Build Configuration

The project is already configured with:
- ✅ `vercel.json` for SPA routing
- ✅ Vite build configuration
- ✅ Tailwind CSS production optimization
- ✅ TypeScript compilation

## Environment Variables (if needed in future)
If you add environment variables:
1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add variables like:
   - `VITE_API_URL`
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
3. Redeploy for changes to take effect

## Automatic Deployments
Once connected to GitHub:
- Every push to `main` branch = Production deployment
- Every pull request = Preview deployment
- Instant rollbacks available in Vercel dashboard

## Troubleshooting

### Build Fails
- Check build logs in Vercel dashboard
- Ensure all dependencies are in `package.json`
- Test build locally: `npm run build`

### 404 Errors on Routes
- Verify `vercel.json` is present in root directory
- Check that routing uses hash-based routing (`#/`)

### Styling Issues
- Ensure Tailwind CSS is properly configured
- Check `tailwind.config.js` includes all content paths
- Verify `postcss.config.js` exists

## Performance Optimization
Vercel automatically provides:
- ✅ Global CDN
- ✅ Automatic HTTPS
- ✅ Image optimization
- ✅ Edge caching
- ✅ Compression (Brotli/Gzip)

## Monitoring
- View analytics in Vercel dashboard
- Check deployment logs for errors
- Monitor Core Web Vitals

## Support
- Vercel Docs: https://vercel.com/docs
- Vite Docs: https://vitejs.dev/guide/
- GitHub Issues: Create issues in your repository

---

**Your Alterd website will be live and accessible worldwide within minutes!** 🚀
