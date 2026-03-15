# 🚀 Vercel Deployment Guide - Mission Control Dashboard

## Quick Deploy (2 Minutes)

### Step 1: Go to Vercel
```
https://vercel.com/new
```

### Step 2: Import Git Repository
1. Click **"Import Git Repository"**
2. Select: **Tigha66/tigha66bot-workspace**
3. If not connected, connect your GitHub account first

### Step 3: Configure Project
- **Project Name:** `mission-control-dashboard` (or your choice)
- **Framework Preset:** Next.js (auto-detected)
- **Root Directory:** Click **"Edit"** and enter:
  ```
  mission-control
  ```
- **Build Command:** `pnpm build` (auto-detected)
- **Output Directory:** `.next` (auto-detected)

### Step 4: Add Environment Variables
Click **"Environment Variables"** and add:

| Name | Value |
|------|-------|
| `API_KEY` | `mission-control-secret-key` |
| `LOCAL_MODE` | `true` |
| `SESSION_SECRET` | `random-secret-string-here` |
| `DATABASE_URL` | `file:./dev.db` |

### Step 5: Deploy!
1. Click **"Deploy"**
2. Wait 2-3 minutes
3. Get your live URL!

---

## What You'll Get

✅ **Exact dashboard from your screenshot**  
✅ **Dark theme UI**  
✅ **200+ API endpoints**  
✅ **Real-time SSE/WebSocket**  
✅ **Full agent orchestration**  
✅ **Gateway health monitoring**  
✅ **Task management**  
✅ **Multi-agent coordination**  

---

## Live URL Format

Your dashboard will be at:
```
https://mission-control-dashboard-[random].vercel.app
```

---

## Post-Deployment

1. **Test the dashboard** - Open your live URL
2. **Login** - Use the API key you set
3. **Register agents** - Add your AI agents
4. **Create tasks** - Start orchestrating work
5. **Monitor** - Watch real-time activity

---

## Custom Domain (Optional)

After deployment:
1. Go to Project Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed
4. SSL auto-provisions

---

## Need Help?

Vercel Docs: https://vercel.com/docs  
Next.js Deploy: https://nextjs.org/docs/deployment

---

**Deploy time:** ~2-3 minutes  
**Cost:** FREE (Hobby plan)  
**Includes:** Unlimited deployments, SSL, CDN
