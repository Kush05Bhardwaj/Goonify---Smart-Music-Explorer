# 🎵 Smart Music Explorer

> **A next-generation AI-powered music discovery platform with a premium, futuristic UI**

A full-stack web application featuring **glassmorphism design**, **gradient overlays**, and **smooth animations** that integrates with Spotify, Last.fm, and Genius APIs to provide music insights, lyrics, and recommendations.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)
![Next.js](https://img.shields.io/badge/Next.js-16.0-black.svg)

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#️-architecture)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Environment Variables](#-environment-variables)
- [Development](#-development)
- [Deployment](#-deployment)
- [API Documentation](#-api-documentation)
- [Troubleshooting](#-troubleshooting)
- [Contributing](#-contributing)
- [License](#-license)

---

## ✨ Features

### 🎨 Premium UI/UX
- **Glassmorphism Effects** - Frosted glass elements with backdrop blur
- **Gradient Overlays** - Emerald to slate color scheme
- **Smooth Animations** - Framer Motion powered transitions
- **Responsive Design** - Mobile-first approach with Tailwind CSS
- **Custom Scrollbars** - Styled with hover effects
- **Interactive Cards** - 3D transforms and hover states
- **Loading States** - Skeleton loaders and shimmer effects
- **Modern Typography** - Clean and readable font hierarchy

### 🎧 Core Features
- 🎵 **Spotify Web Playback** - Play music directly in your browser with full player controls
- 🔥 **Top Tracks & Artists** - View your listening habits across different time ranges
- 🎼 **Synchronized Lyrics** - Real-time lyrics from Genius API
- 🎶 **Similar Music Discovery** - AI-powered recommendations via Last.fm
- 📊 **Music Analytics** - Detailed insights with interactive charts (Recharts)
- 🔍 **Smart Search** - Real-time search with debouncing
- 📁 **Playlist Management** - Browse and play your Spotify playlists
- ⏱️ **Time Range Selection** - Last month, 6 months, or all-time stats
- 🔒 **Secure Authentication** - OAuth 2.0, HTTP-only cookies, CORS protection

---

## 🛠 Tech Stack

### Frontend
- **Framework**: Next.js 15.5.9 (App Router) - *Fixed from 16.0.4 due to CVE-2025-66478*
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **Charts**: Recharts
- **HTTP Client**: Fetch API with Authorization headers
- **State Management**: React Hooks + localStorage for tokens

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **APIs**: Spotify Web API, Last.fm, Genius
- **Security**: Helmet, CORS, cookie-parser
- **Environment**: dotenv

### External APIs
- **Spotify API** - Music streaming and user data
- **Last.fm API** - Similar track recommendations
- **Genius API** - Song lyrics and metadata

---

## 🏗️ Architecture

### Backend (Node.js + Express)
```
backend/
├── src/
│   ├── config/          # Environment validation & Spotify config
│   ├── middleware/      # Auth, error handling, logging
│   ├── routes/          # API route handlers
│   │   ├── auth.js      # Spotify OAuth flow
│   │   ├── spotify.js   # Spotify API endpoints
│   │   ├── music.js     # Last.fm & Genius endpoints
│   │   ├── playback.js  # Playback control
│   │   └── token.js     # Token management
│   ├── services/        # External API integrations
│   │   ├── genius.js    # Genius lyrics service
│   │   └── lastfm.js    # Last.fm recommendations
│   └── index.js         # Main server file
├── package.json
└── .env
```

### Frontend (Next.js 16 + TypeScript)
```
frontend/
├── app/
│   ├── app/
│   │   └── page.tsx     # Main dashboard
│   ├── layout.tsx       # Root layout
│   ├── page.tsx         # Landing page
│   └── globals.css      # Global styles & animations
├── components/
│   ├── SpotifyPlayer.tsx    # Web playback SDK
│   ├── TrackCard.tsx        # Track list item
│   └── TrackDetails.tsx     # Sidebar details
├── hooks/
│   └── useSpotifyToken.ts   # Token management
├── lib/
│   └── api.ts               # API client
├── types/
│   └── index.ts             # TypeScript types
├── package.json
└── .env.local
```
---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** >= 18.0.0 ([Download](https://nodejs.org/))
- **npm** >= 9.0.0 (comes with Node.js)
- **Git** ([Download](https://git-scm.com/))
- **Spotify Premium Account** (required for Web Playback)

### Required API Keys

You'll need to create accounts and get API keys from:

1. **Spotify Developer Account** - [Create App](https://developer.spotify.com/dashboard)
2. **Last.fm API** - [Get API Key](https://www.last.fm/api/account/create)
3. **Genius API** - [Get Access Token](https://genius.com/api-clients)

---

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/smart-music-explorer.git
cd smart-music-explorer
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory:

```env
PORT=4000

# Spotify OAuth Configuration
SPOTIFY_CLIENT_ID=your_spotify_client_id_here
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret_here
SPOTIFY_REDIRECT_URI=http://127.0.0.1:4000/api/auth/callback

# External APIs
LASTFM_API_KEY=your_lastfm_api_key_here
GENIUS_ACCESS_TOKEN=your_genius_access_token_here

# Frontend URL (for CORS)
FRONTEND_URL=http://127.0.0.1:3000
```

### 3. Frontend Setup

```bash
cd ../frontend
npm install
```

Create a `.env.local` file in the `frontend` directory:

```env
NEXT_PUBLIC_API_URL=http://127.0.0.1:4000
```

---

## 🔑 Environment Variables

### Backend Environment Variables

| Variable | Description | Example | Required |
|----------|-------------|---------|----------|
| `PORT` | Backend server port | `4000` | No (default: 4000) |
| `SPOTIFY_CLIENT_ID` | Spotify app client ID | `abc123...` | **Yes** |
| `SPOTIFY_CLIENT_SECRET` | Spotify app client secret | `def456...` | **Yes** |
| `SPOTIFY_REDIRECT_URI` | OAuth callback URL | `http://127.0.0.1:4000/api/auth/callback` | **Yes** |
| `LASTFM_API_KEY` | Last.fm API key | `xyz789...` | **Yes** |
| `GENIUS_ACCESS_TOKEN` | Genius API access token | `token123...` | **Yes** |
| `FRONTEND_URL` | Frontend URL for CORS | `http://127.0.0.1:3000` | **Yes** |

### Frontend Environment Variables

| Variable | Description | Example | Required |
|----------|-------------|---------|----------|
| `NEXT_PUBLIC_API_URL` | Backend API URL | `http://127.0.0.1:4000` | **Yes** |

---

## 🎯 Getting API Keys

### 1. Spotify API Setup

1. Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Click **"Create App"**
3. Fill in:
   - **App Name**: Smart Music Explorer
   - **App Description**: Music discovery platform
   - **Redirect URI**: `http://127.0.0.1:4000/api/auth/callback`
   - **APIs Used**: Web API, Web Playback SDK
4. Copy your **Client ID** and **Client Secret**
5. Add redirect URI in app settings

### 2. Last.fm API Setup

1. Go to [Last.fm API Account](https://www.last.fm/api/account/create)
2. Fill in application details
3. Copy your **API Key**

### 3. Genius API Setup

1. Go to [Genius API Clients](https://genius.com/api-clients)
2. Click **"New API Client"**
3. Fill in:
   - **App Name**: Smart Music Explorer
   - **App Website URL**: `http://127.0.0.1:3000`
4. Generate a **Client Access Token**
5. Copy the token

---

## 💻 Development

### Start Backend Server

```bash
cd backend
npm run dev
```

The backend will start on `http://127.0.0.1:4000`

### Start Frontend Development Server

```bash
cd frontend
npm run dev
```

The frontend will start on `http://127.0.0.1:3000` (or next available port)

### Access the Application

1. Open your browser and navigate to `http://127.0.0.1:3000`
2. Click **"Connect with Spotify"**
3. Log in with your Spotify account
4. Start exploring your music!

---

## 📡 API Endpoints

### Authentication
- `GET /api/auth/login` - Redirect to Spotify OAuth
- `GET /api/auth/callback` - OAuth callback handler
- `POST /api/auth/logout` - Clear auth cookies
- `GET /api/auth/status` - Check authentication status

### Spotify Endpoints
- `GET /api/me` - Get current user profile
- `GET /api/top-tracks?limit=10&time_range=medium_term` - Get top tracks
- `GET /api/top-artists?limit=10&time_range=medium_term` - Get top artists

### Music Discovery
- `GET /api/music/artist?name=ArtistName` - Get artist info from Last.fm
- `GET /api/music/similar-tracks?artist=X&track=Y` - Get similar tracks
- `GET /api/music/lyrics?artist=X&song=Y` - Get song lyrics

### Playback Control (NEW! 🎵)
- `GET /api/playback/current` - Get current playback state
- `PUT /api/playback/play` - Start/resume playback (body: `{uris: [], device_id: ""}`)
- `PUT /api/playback/pause` - Pause playback
- `POST /api/playback/next` - Skip to next track
- `POST /api/playback/previous` - Skip to previous track
- `PUT /api/playback/seek` - Seek to position (body: `{position: ms}`)
- `PUT /api/playback/volume` - Set volume (body: `{volume: 0-100}`)
- `GET /api/playback/devices` - Get available devices
- `PUT /api/playback/transfer` - Transfer playback to device (body: `{device_id: ""}`)
- `GET /api/auth/token` - Get access token for Web Playback SDK

### Utility
- `GET /api/health` - Health check endpoint
- `GET /` - API documentation

---

## 🚀 Deployment

> **📖 For detailed deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md)**

### ✅ Recommended: Vercel (Frontend) + Render (Backend)

**This is the tested and working setup for this project.**

**Why this stack?**
- ✅ Free tier available for both platforms
- ✅ Automatic deployments from GitHub
- ✅ Built-in SSL certificates
- ✅ Great support for monorepos
- ✅ No credit card required to start
- ✅ Cross-domain authentication implemented

**Total setup time:** ~10-15 minutes

---

### Option 1: Deploy to Vercel (Frontend) + Render (Backend)

#### Backend Deployment (Render)

1. **Create Render Account** at [render.com](https://render.com)

2. **Create New Web Service**
   - Connect your GitHub repository
   - Select the `backend` folder
   - Configure:
     - **Name**: smart-music-explorer-api
     - **Environment**: Node
     - **Build Command**: `npm install`
     - **Start Command**: `npm start`
     - **Instance Type**: Free (or paid for better performance)

3. **Add Environment Variables** in Render dashboard:
   ```env
   PORT=4000
   SPOTIFY_CLIENT_ID=your_client_id
   SPOTIFY_CLIENT_SECRET=your_client_secret
   SPOTIFY_REDIRECT_URI=https://your-backend-url.onrender.com/api/auth/callback
   LASTFM_API_KEY=your_api_key
   GENIUS_ACCESS_TOKEN=your_token
   FRONTEND_URL=https://your-app.vercel.app
   ```

4. **Update Spotify App Settings**
   - Add production redirect URI: `https://your-backend-url.onrender.com/api/auth/callback`

#### Frontend Deployment (Vercel)

1. **Create Vercel Account** at [vercel.com](https://vercel.com)

2. **Import Project**
   - Connect your GitHub repository
   - Set **Root Directory**: `frontend`
   - Framework Preset: Next.js

3. **Add Environment Variable**:
   ```env
   NEXT_PUBLIC_API_URL=https://your-backend-url.onrender.com
   ```

4. **Deploy!** 🎉

### Option 2: Deploy to Railway

1. **Create Railway Account** at [railway.app](https://railway.app)

2. **Deploy Backend**
   - New Project → Deploy from GitHub
   - Select backend directory
   - Add environment variables (same as above)
   - Railway will auto-deploy on push

3. **Deploy Frontend**
   - Add new service to same project
   - Select frontend directory
   - Add `NEXT_PUBLIC_API_URL` variable
   - Configure build command: `npm run build`
   - Start command: `npm start`

### Option 3: Deploy to Your Own VPS

#### Backend Setup

```bash
# SSH into your server
ssh user@your-server-ip

# Clone repository
git clone https://github.com/yourusername/smart-music-explorer.git
cd smart-music-explorer/backend

# Install dependencies
npm install

# Create .env file with production values
nano .env

# Install PM2 for process management
npm install -g pm2

# Start backend with PM2
pm2 start src/index.js --name music-explorer-api
pm2 save
pm2 startup
```

#### Frontend Setup

```bash
cd ../frontend

# Install dependencies
npm install

# Create .env.local
nano .env.local

# Build for production
npm run build

# Start with PM2
pm2 start npm --name music-explorer-web -- start
pm2 save
```

#### Nginx Configuration

```nginx
# Backend API
server {
    listen 80;
    server_name api.yourdomain.com;

    location / {
        proxy_pass http://localhost:4000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}

# Frontend
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### Important Deployment Notes

⚠️ **Before deploying:**

1. **Cross-Domain Authentication** (CRITICAL for Vercel/Render setup):
   - The app uses **token-based authentication** with localStorage for production
   - Cookies don't work across different domains (Vercel → Render)
   - Backend automatically detects production and passes tokens via URL
   - Frontend stores tokens in localStorage and sends via Authorization header

2. **Update CORS Origins** in `backend/src/config/index.js`:
   ```javascript
   CORS_ORIGINS: [
     'http://localhost:3000',
     'http://127.0.0.1:3000',
     process.env.FRONTEND_URL  // Automatically includes production URL
   ].filter(Boolean)
   ```

3. **Update Spotify App Settings**:
   - Add production redirect URI: `https://your-backend.onrender.com/api/auth/callback`
   - Add production website URL
   - **Important**: Both HTTP and HTTPS URLs may be needed

4. **Environment Variables** (REQUIRED):
   
   **Backend (Render):**
   ```env
   FRONTEND_URL=https://your-app.vercel.app  # NO trailing slash!
   SPOTIFY_REDIRECT_URI=https://your-backend.onrender.com/api/auth/callback
   NODE_ENV=production
   ```

   **Frontend (Vercel):**
   ```env
   NEXT_PUBLIC_API_URL=https://your-backend.onrender.com  # NO trailing slash!
   ```

5. **Enable HTTPS**:
   - Vercel/Render provide automatic SSL
   - For custom domains: Use Let's Encrypt with Certbot

6. **Security**:
   - Never commit `.env` files
   - Use platform's environment variable settings
   - Update all URLs to production values (NO localhost!)

### Authentication Flow (Production)

**How it works:**
1. User clicks "Connect with Spotify"
2. Redirected to Spotify for authentication
3. Backend receives auth code and exchanges for tokens
4. Backend redirects to: `https://your-app.vercel.app/app?access_token=XXX&refresh_token=YYY&expires_in=3600`
5. Frontend extracts tokens from URL and stores in localStorage
6. Frontend cleans URL (removes tokens from address bar)
7. All API calls include `Authorization: Bearer <token>` header
8. Backend validates token from Authorization header

**Development vs Production:**
- **Development (localhost)**: Uses HTTP-only cookies
- **Production (cross-domain)**: Uses localStorage + Authorization headers

---

## 🔧 Environment Variables Reference

### Production Backend (.env)

```env
# Server Configuration
PORT=4000
NODE_ENV=production

# Spotify OAuth
SPOTIFY_CLIENT_ID=your_production_client_id
SPOTIFY_CLIENT_SECRET=your_production_client_secret
SPOTIFY_REDIRECT_URI=https://api.yourdomain.com/api/auth/callback

# External APIs
LASTFM_API_KEY=your_lastfm_key
GENIUS_ACCESS_TOKEN=your_genius_token

# Frontend URL (for CORS)
FRONTEND_URL=https://yourdomain.com
```

### Production Frontend (.env.local)

```env
# Backend API URL
NEXT_PUBLIC_API_URL=https://api.yourdomain.com
```

---

## 🐛 Troubleshooting

### Common Issues

#### 1. "Unable to acquire lock" Error
```bash
# Kill existing Next.js processes
pkill -f next
# Or on Windows
taskkill /F /IM node.exe
```

#### 2. Port Already in Use
```bash
# Find process using port 4000
lsof -i :4000  # Mac/Linux
netstat -ano | findstr :4000  # Windows

# Kill the process
kill -9 <PID>  # Mac/Linux
taskkill /PID <PID> /F  # Windows
```

#### 3. Spotify Player Not Loading
- Ensure you have **Spotify Premium**
- Check browser console for errors
- Verify redirect URI matches exactly
- Clear browser cache and cookies

#### 4. CORS Errors
- Check `FRONTEND_URL` in backend `.env`
- Verify `CORS_ORIGINS` in `backend/src/config/index.js`
- Ensure URLs match exactly (no trailing slashes)

#### 5. Authentication Loop
- Clear browser cookies
- Check `SPOTIFY_REDIRECT_URI` matches exactly
- Verify client ID and secret are correct

### Debug Mode

Enable detailed logging:

```bash
# Backend
DEBUG=* npm run dev

# Frontend (check browser console)
NEXT_PUBLIC_DEBUG=true npm run dev
```

### Installation Steps

1. **Clone the repository**
```bash
git clone <repo-url>
cd smart-music-explorer
```

2. **Install backend dependencies**
```bash
cd backend
npm install
```

3. **Install frontend dependencies**
```bash
cd ../frontend
npm install
```

4. **Configure environment variables**
- Copy `.env.example` files in both directories
- Fill in your API credentials

5. **Start the backend**
```bash
cd backend
npm run dev
```

6. **Start the frontend**
```bash
cd frontend
npm run dev
```

7. **Access the app**
- Frontend: http://localhost:3000
- Backend: http://localhost:4000

## 🔧 Configuration

### Spotify App Setup
1. Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Create a new app
3. Add redirect URI: `http://127.0.0.1:4000/api/auth/callback`
4. **Important**: Add `http://127.0.0.1:3000` to "Web Playback SDK" allowed domains
5. Copy Client ID and Client Secret

**Note**: You need **Spotify Premium** to use the Web Playback SDK for in-browser playback

### Last.fm API Setup
1. Register at [Last.fm API](https://www.last.fm/api/account/create)
2. Create an API application
3. Copy the API key

### Genius API Setup
1. Go to [Genius API Clients](https://genius.com/api-clients)
2. Create a new API client
3. Generate an access token

## 🛡️ Security Features

- ✅ HTTP-only cookies for token storage
- ✅ CORS configuration
- ✅ Helmet security headers
- ✅ Input validation and sanitization
- ✅ Error handling middleware
- ✅ Environment variable validation
- ✅ Request timeouts
- ✅ HTTPS for external API calls

## 📦 Dependencies

### Backend
- `express` - Web framework
- `spotify-web-api-node` - Spotify API wrapper
- `genius-lyrics` - Genius lyrics fetcher
- `axios` - HTTP client for Last.fm
- `helmet` - Security headers
- `cors` - CORS middleware
- `cookie-parser` - Cookie parsing
- `dotenv` - Environment variables

### Frontend
- `next` - React framework
- `react` - UI library
- `typescript` - Type safety
- `framer-motion` - Animations
- `tailwindcss` - Styling

## 🎯 Improvements Implemented

### Backend
✅ Modular route structure (auth, spotify, music)  
✅ Centralized configuration management  
✅ Authentication middleware  
✅ Error handling middleware  
✅ Request logging  
✅ Environment validation on startup  
✅ Improved error messages  
✅ Input validation and sanitization  
✅ API timeout handling  
✅ Security headers with Helmet  
✅ Logout endpoint  
✅ Auth status endpoint  
✅ HTTPS for external APIs  

### Frontend
✅ TypeScript type definitions  
✅ Centralized API client  
✅ Environment variables for API URLs  
✅ Loading states  
✅ Error handling  
✅ URL encoding for API parameters  
✅ Proper prop types for components  
✅ Accessibility improvements  
✅ Fallback UI for missing data  

## 🎵 Using the Player

1. **Login** with your Spotify account (Premium required)
2. Navigate to the app page - you'll see "Spotify Player Ready" at the bottom
3. **Hover over any track** and click the green play button
4. Use the **player controls** at the bottom:
   - Play/Pause button
   - Previous/Next track buttons
   - Progress bar (drag to seek)
   - Current time and duration display
5. The player shows:
   - Album artwork
   - Track name and artist
   - Real-time progress

## 🎨 Design System

### Color Palette
- **Primary Cyan**: `#06fefe` - Main accent color
- **Teal**: `#14b8a6` - Secondary accent
- **Purple**: `#a855f7` - Tertiary accent
- **Navy Dark**: `#0a0e27` - Main background
- **Navy Medium**: `#1a1f3a` - Secondary background

### Typography
- **Display Font**: Poppins (headings, hero text)
- **Body Font**: Inter (paragraphs, UI text)
- **Weights**: 300-900 for maximum flexibility

### Effects
- **Glassmorphism**: `backdrop-blur(20px)` with rgba backgrounds
- **Neon Glow**: Multi-layer box-shadows with cyan/purple
- **Neumorphic**: Dual-direction shadows for 3D depth
- **Gradients**: Linear and radial gradients with smooth transitions
- **Animations**: Spring physics for natural motion

## 📝 Future Enhancements

### UI/UX
- [ ] Waveform visualizations for tracks
- [ ] Audio spectrum analyzer
- [ ] Custom theme builder
- [ ] Gesture controls for mobile
- [ ] Voice commands integration
- [ ] VR/AR music experience

### Features
- [ ] Token refresh mechanism
- [ ] Rate limiting
- [ ] Caching layer (Redis)
- [ ] Queue management
- [ ] Shuffle and repeat modes
- [ ] Device selection dropdown
- [ ] Social sharing features
- [ ] Collaborative playlists
- [ ] AI mood detection
- [ ] Smart recommendations ML model

### Technical
- [ ] Unit & integration tests
- [ ] Docker containerization
- [ ] CI/CD pipeline
- [ ] Performance monitoring
- [ ] PWA support
- [ ] Offline mode

## 🐛 Known Issues

- Access tokens expire after 1 hour (refresh token implementation needed)
- Limited to 50 tracks/artists per request (Spotify API limitation)
- Lyrics might not be found for all songs
- First deployment on Render may take 5-10 minutes (free tier cold start)

---

## 🔍 Troubleshooting

### Issue: "CORS policy: No 'Access-Control-Allow-Origin' header"

**Solution:**
1. Verify `FRONTEND_URL` is set correctly in Render (NO trailing slash)
2. Ensure backend has redeployed with latest code
3. Check `backend/src/config/index.js` includes `process.env.FRONTEND_URL` in CORS_ORIGINS
4. Make sure URLs match exactly (including https://)

### Issue: "401 Unauthorized" or "Failed to fetch" after login

**Solution:**
1. **Clear browser data** for your deployment domain
   - F12 → Application → Storage → Clear site data
2. Check `NEXT_PUBLIC_API_URL` is set in Vercel (NO trailing slash)
3. Verify tokens are being stored:
   - F12 → Application → Local Storage → Check for `spotify_access_token`
4. Check Network tab for Authorization headers
5. Ensure backend middleware accepts Bearer tokens

### Issue: "ERR_BLOCKED_BY_CLIENT" errors

**Cause:** Hardcoded localhost URLs in production code

**Solution:**
- All code now uses `API_ENDPOINTS` from `lib/api.ts`
- Ensure you've deployed the latest code (check git commit hash)
- Redeploy both frontend and backend

### Issue: Build fails with "eslint-config-next" errors

**Solution:**
- The `next.config.ts` already has `ignoreDuringBuilds: true`
- Install missing dependency: `npm install --save-dev @eslint/eslintrc`
- Clear build cache and redeploy

### Issue: "Invalid_client" from Spotify

**Solution:**
1. Verify Client ID and Client Secret in environment variables
2. Check Spotify redirect URI matches exactly: `https://your-backend.onrender.com/api/auth/callback`
3. Ensure Spotify app is not in Development Mode (or add your Spotify account to allowed users)

### Issue: Web Player doesn't initialize

**Requirements:**
- ✅ Spotify Premium account (required for Web Playback SDK)
- ✅ Token available in localStorage or cookies
- ✅ Browser supports Web Audio API (Chrome, Firefox, Edge, Safari)

**Debug Steps:**
1. Check browser console for Spotify SDK errors
2. Verify token is passed to `<SpotifyPlayer>` component
3. Check Network tab for `https://sdk.scdn.co/spotify-player.js`
4. Try different browser or incognito mode

### Issue: Deployment is slow or times out

**Render Free Tier:**
- First deploy takes 5-10 minutes
- Service spins down after 15 minutes of inactivity
- First request after sleep takes ~30 seconds

**Solutions:**
- Upgrade to Render paid tier ($7/month)
- Use Railway instead (better free tier)
- Implement health check pings to keep service alive

### Issue: Environment variables not updating

**Solution:**
1. Go to platform dashboard (Vercel/Render)
2. Update environment variables
3. **Manually trigger redeploy** (changes don't auto-deploy)
4. Wait for deployment to complete
5. Clear browser cache before testing

---

## � Performance Optimization

### Backend Optimizations
- **Request Caching**: Implement Redis for API response caching
- **Connection Pooling**: Reuse Spotify API connections
- **Compression**: Enable gzip compression for responses
- **Rate Limiting**: Implement rate limiting per user

### Frontend Optimizations
- **Code Splitting**: Automatic with Next.js App Router
- **Image Optimization**: Use Next.js Image component
- **Lazy Loading**: Defer non-critical components
- **Memoization**: Use React.memo for expensive components

---

## 📚 Additional Resources

- [Spotify Web API Documentation](https://developer.spotify.com/documentation/web-api)
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS v4 Documentation](https://tailwindcss.com/docs)
- [Framer Motion Documentation](https://www.framer.com/motion/)
- [Last.fm API Documentation](https://www.last.fm/api)
- [Genius API Documentation](https://docs.genius.com/)

---

## 🤝 Contributing

We welcome contributions! Here's how you can help:

### Reporting Bugs
1. Check existing issues to avoid duplicates
2. Include detailed steps to reproduce
3. Provide screenshots/logs if applicable
4. Specify your environment (OS, browser, Node version)

### Suggesting Features
1. Open an issue with the `enhancement` label
2. Describe the feature and its use case
3. Explain why it would be valuable

### Pull Requests
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow the existing code style
- Write clear commit messages
- Update documentation as needed
- Test your changes thoroughly
- Keep PRs focused on a single feature/fix

---



## 👥 Authors

**Smart Music Explorer Team**
- GitHub: [@Kush05Bhardwaj](https://github.com/Kush06Bhardwaj)

---

## 🙏 Acknowledgments

- **Spotify** - For the amazing Web API and Web Playback SDK
- **Last.fm** - For music recommendation data
- **Genius** - For song lyrics and metadata
- **Vercel** - For Next.js and hosting platform
- **Tailwind Labs** - For Tailwind CSS
- **Framer** - For Framer Motion animations
- **The Open Source Community** - For inspiration and tools

---

## 📞 Support

Need help? Here's how to get support:

- 📧 **Email**: kush2012bhardwaj@gmail.com

---

## ⭐ Show Your Support

If you found this project helpful, please consider:

- ⭐ **Starring** the repository
- 🐛 **Reporting** bugs or issues
- 💡 **Suggesting** new features
- 🔀 **Contributing** to the codebase
- 📢 **Sharing** with others

---

<div align="center">

**Built with ❤️ using Next.js, Express, and the Spotify API**

[⬆ Back to Top](#-smart-music-explorer)

</div>
