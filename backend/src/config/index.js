const SpotifyWebApi = require('spotify-web-api-node');
require('dotenv').config();

// Validate required environment variables
const requiredEnvVars = [
  'SPOTIFY_CLIENT_ID',
  'SPOTIFY_CLIENT_SECRET',
  'SPOTIFY_REDIRECT_URI',
  'FRONTEND_URL',
  'LASTFM_API_KEY',
  'GENIUS_ACCESS_TOKEN'
];

function validateEnv() {
  const missing = requiredEnvVars.filter(varName => !process.env[varName]);
  
  if (missing.length > 0) {
    console.error('❌ Missing required environment variables:', missing.join(', '));
    process.exit(1);
  }
  
  console.log('✅ All required environment variables are set');
}

// Spotify configuration
const spotifyConfig = {
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  redirectUri: process.env.SPOTIFY_REDIRECT_URI,
};

// Create Spotify API instance helper
function createSpotifyApi(accessToken = null) {
  const api = new SpotifyWebApi(spotifyConfig);
  if (accessToken) {
    api.setAccessToken(accessToken);
  }
  return api;
}

module.exports = {
  validateEnv,
  spotifyConfig,
  createSpotifyApi,
  PORT: process.env.PORT || 4000,
  FRONTEND_URL: process.env.FRONTEND_URL,
  CORS_ORIGINS: [
    'http://localhost:3000',
    'http://127.0.0.1:3000',
    process.env.FRONTEND_URL
  ].filter(Boolean) // Remove undefined values
};
