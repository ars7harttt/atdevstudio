# Vercel Auto-Deployment Setup

Your repository is now configured for Vercel auto-deployment! Follow these steps to connect:

## Option 1: Via Vercel Dashboard (Recommended)

1. **Go to Vercel**: Visit [https://vercel.com](https://vercel.com) and sign in (or create an account)

2. **Import Project**:
   - Click "Add New..." → "Project"
   - Select "Import Git Repository"
   - Choose "GitHub" and authorize Vercel if needed
   - Find and select your repository: `ars7harttt/atdevstudio`
   - Click "Import"

3. **Configure Project**:
   - **Framework Preset**: Other (or leave as default)
   - **Root Directory**: `./` (default)
   - **Build Command**: Leave empty (or `npm install` if needed)
   - **Output Directory**: Leave empty (serves from root)
   - Click "Deploy"

4. **Add Environment Variable** (Optional but recommended):
   - Go to Project Settings → Environment Variables
   - Add: `RESEND_API_KEY` = `re_bH3D3Xr4_NiRjDxDifhFqDshqe3hEXUKo`
   - This keeps your API key secure (currently it's in the code as fallback)

5. **Auto-Deployment**:
   - Vercel will automatically deploy every time you push to the `main` branch
   - You'll get a unique URL like: `https://atdevstudio.vercel.app`

## Option 2: Via Vercel CLI

If you prefer using the command line:

```bash
# Install Vercel CLI globally
npm install -g vercel

# Login to Vercel
vercel login

# Deploy (from project directory)
cd "/Users/arshyan/Documents/Web Sites/AT Dev Studio"
vercel

# Follow the prompts to link your project
```

## Project Structure

- **Static Files**: HTML, CSS, JS, Images served from root
- **API Routes**: 
  - `/api/contact` - Contact form submission
  - `/api/health` - Health check endpoint
- **Configuration**: `vercel.json` handles routing

## Testing

After deployment:
1. Visit your Vercel URL
2. Test the contact form at `/contact.html`
3. Check that emails are being sent via Resend

## Custom Domain (Optional)

1. Go to Project Settings → Domains
2. Add your custom domain
3. Follow DNS configuration instructions

---

**Note**: The Resend API key is currently in the code as a fallback. For better security, add it as an environment variable in Vercel dashboard.
