# Quick Deploy to Vercel - 5 Minutes ⚡

## Fastest Method (No Git Required)

### 1. Install Vercel CLI
```bash
npm install -g vercel
```

### 2. Login to Vercel
```bash
vercel login
```
Follow the email verification link.

### 3. Deploy from Project Directory
```bash
cd d:\Alterd\project
vercel
```

Press Enter for all prompts to accept defaults.

### 4. Deploy to Production
```bash
vercel --prod
```

**Done!** Your site is live at the URL shown in terminal.

---

## Alternative: Drag & Drop Method

### 1. Build Your Project
```bash
cd d:\Alterd\project
npm run build
```

### 2. Deploy the `dist` Folder
1. Go to https://vercel.com/new
2. Drag the `dist` folder into the upload area
3. Click "Deploy"

**Done!** Site is live in 30 seconds.

---

## With GitHub (Recommended for Updates)

### 1. Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/alterd-website.git
git push -u origin main
```

### 2. Import to Vercel
1. Go to https://vercel.com/new
2. Click "Import Git Repository"
3. Select your repo
4. Click "Deploy"

**Done!** Auto-deploys on every push to GitHub.

---

## Your Live URLs
- Production: `https://your-project.vercel.app`
- Preview: `https://your-project-git-branch.vercel.app`

## Quick Commands
```bash
vercel          # Deploy preview
vercel --prod   # Deploy production
vercel ls       # List deployments
vercel logs     # View logs
vercel domains  # Manage domains
```

## Need Help?
See `DEPLOYMENT.md` for detailed instructions.
