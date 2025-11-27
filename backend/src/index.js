const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const SpotifyWebApi = require('spotify-web-api-node');
const { getLyrics } = require("./services/genius");
require('dotenv').config();


const app = express();

const spotifyConfig = {
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  redirectUri: process.env.SPOTIFY_REDIRECT_URI,
};

// Middlewares
app.use(cors({
  origin: ["http://localhost:3000", "http://127.0.0.1:3000"],
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

// Simple health route
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Smart Music Explorer backend is running 🎵' });
});

// Temporary root route
app.get('/', (req, res) => {
  res.send('Backend for Smart Music Explorer 🎵');
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});


// --- Spotify OAuth routes ---

// Step 1: Redirect user to Spotify authorization page
app.get('/api/auth/login', (req, res) => {
  const scopes = [
    'user-read-email',
    'user-read-private',
    'user-top-read',
  ];

  const spotifyApi = new SpotifyWebApi(spotifyConfig);

  const authorizeURL = spotifyApi.createAuthorizeURL(scopes, 'some-random-state'); // state is optional here
  res.redirect(authorizeURL);
});

// Step 2: Spotify redirects back here with ?code=
app.get('/api/auth/callback', async (req, res) => {
  const code = req.query.code;

  if (!code) {
    return res.status(400).send('Missing code from Spotify');
  }

  const spotifyApi = new SpotifyWebApi(spotifyConfig);

  try {
    const data = await spotifyApi.authorizationCodeGrant(code);

    const accessToken = data.body['access_token'];
    const refreshToken = data.body['refresh_token'];
    const expiresIn = data.body['expires_in']; // seconds

    // Save token in HTTP-only cookie (simple version)
    res.cookie('spotify_access_token', accessToken, {
      httpOnly: true,
      sameSite: 'lax',
      maxAge: expiresIn * 1000,
    });

    res.cookie('spotify_refresh_token', refreshToken, {
      httpOnly: true,
      sameSite: 'lax',
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });

    // Redirect back to frontend (we'll use this page later)
    res.redirect(`${process.env.FRONTEND_URL}/app`);
  } catch (err) {
    console.error('Error exchanging code for token:', err.message);
    return res.status(500).send('Spotify authentication failed');
  }
});

// Get Spotify user profile
app.get('/api/me', async (req, res) => {
  const accessToken = req.cookies.spotify_access_token;
  if (!accessToken) {
    return res.status(401).json({ error: "Not authenticated with Spotify" });
  }

  const spotifyApi = new SpotifyWebApi(spotifyConfig);
  spotifyApi.setAccessToken(accessToken);

  try {
    const me = await spotifyApi.getMe();
    res.json(me.body);
  } catch {
    res.status(500).json({ error: "Failed to fetch Spotify profile" });
  }
});

// Get user's top 10 tracks
app.get('/api/top-tracks', async (req, res) => {
  const accessToken = req.cookies.spotify_access_token;
  if (!accessToken) {
    return res.status(401).json({ error: "Not authenticated with Spotify" });
  }

  const spotifyApi = new SpotifyWebApi(spotifyConfig);
  spotifyApi.setAccessToken(accessToken);

  try {
    const data = await spotifyApi.getMyTopTracks({ limit: 10 });
    res.json(data.body.items);
  } catch {
    res.status(500).json({ error: "Failed to fetch top tracks" });
  }
});

const { getArtistInfo, getSimilarTracks } = require("./services/lastfm");

app.get("/api/artist", async (req, res) => {
  const name = req.query.name;
  if (!name) return res.status(400).json({ error: "Artist name required" });

  try {
    const data = await getArtistInfo(name);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch artist info" });
  }
});

app.get("/api/similar-tracks", async (req, res) => {
  const artist = req.query.artist;
  const track = req.query.track;
  if (!artist || !track)
    return res.status(400).json({ error: "Artist & track required" });

  try {
    const data = await getSimilarTracks(artist, track);
    res.json(data.track?.similar?.track || []);
  } catch {
    res.status(500).json({ error: "Failed to fetch similar songs" });
  }
});

app.get("/api/lyrics", async (req, res) => {
  const { artist, song } = req.query;
  if (!artist || !song)
    return res.status(400).json({ error: "artist & song required" });

  try {
    const lyrics = await getLyrics(artist, song);
    res.json({ lyrics });
  } catch {
    res.status(500).json({ error: "Failed to fetch lyrics" });
  }
});