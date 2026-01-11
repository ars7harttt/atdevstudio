# AT Dev Studio Website

A modern website with contact form functionality using Resend API.

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Start the Server

**Development mode (with auto-reload):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

The server will run on `http://localhost:3000`

### 3. Test the Contact Form

1. Open `http://localhost:3000/contact.html` in your browser
2. Fill out and submit the contact form
3. Check your email inbox at `team.atdevstudio@gmail.com`

## Configuration

### Resend API Key

The Resend API key is configured in `server.js`. The key is:
- Already set up: `re_bH3D3Xr4_NiRjDxDifhFqDshqe3hEXUKo`
- Located in: `server.js` (line 8)

### Email Settings

- **From email**: `AT Dev Studio <onboarding@resend.dev>` (update with your verified domain)
- **To email**: `team.atdevstudio@gmail.com` (configured in `server.js`)

To change the receiving email, edit `server.js` line 40:
```javascript
to: ['your-email@example.com'], // Change this
```

## Project Structure

```
.
├── server.js          # Node.js/Express server with Resend integration
├── package.json       # Dependencies and scripts
├── index.html         # Home page
├── about.html         # About page
├── contact.html       # Contact page
├── styles.css         # Stylesheet
├── script.js          # Frontend JavaScript
└── Images/            # Image assets
```

## API Endpoints

- `POST /api/contact` - Submit contact form (sends email via Resend)
- `GET /api/health` - Health check endpoint

## Security

✅ **API Key Security**: The Resend API key is stored in the backend (`server.js`), not exposed in the frontend code.

## Troubleshooting

**Server won't start:**
- Make sure Node.js is installed: `node --version`
- Install dependencies: `npm install`
- Check if port 3000 is already in use

**Email not received:**
- Check spam folder
- Verify email address in `server.js` (line 40)
- Check server logs for Resend errors
- Check Resend dashboard for email logs

**Form shows "Error - Try Again":**
- Check browser console (F12) for errors
- Verify server is running
- Check server Terminal for error messages

## Production Deployment

When deploying to production:

1. Set `PORT` environment variable if needed
2. Update the `from` email in `server.js` with your verified Resend domain
3. Consider using environment variables for the API key:
   ```javascript
   const resend = new Resend(process.env.RESEND_API_KEY);
   ```
4. Update API URL in `script.js` if frontend and backend are on different domains
