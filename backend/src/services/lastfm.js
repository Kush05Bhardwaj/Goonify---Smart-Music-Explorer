const axios = require("axios");

const LASTFM_KEY = process.env.LASTFM_API_KEY;
const LASTFM_BASE_URL = "https://ws.audioscrobbler.com/2.0/"; // Use HTTPS

async function getArtistInfo(artistName) {
  try {
    const res = await axios.get(LASTFM_BASE_URL, {
      params: {
        method: "artist.getinfo",
        artist: artistName.trim(),
        api_key: LASTFM_KEY,
        format: "json",
      },
      timeout: 5000, // 5 second timeout
    });

    if (res.data.error) {
      throw new Error(res.data.message || 'Last.fm API error');
    }

    return res.data;
  } catch (error) {
    console.error('Last.fm API error (getArtistInfo):', error.message);
    throw new Error('Failed to fetch artist info from Last.fm');
  }
}

async function getSimilarTracks(artistName, trackName) {
  try {
    const res = await axios.get(LASTFM_BASE_URL, {
      params: {
        method: "track.getsimilar",
        artist: artistName.trim(),
        track: trackName.trim(),
        api_key: LASTFM_KEY,
        format: "json",
        limit: 6,
      },
      timeout: 5000,
    });

    if (res.data.error) {
      throw new Error(res.data.message || 'Last.fm API error');
    }

    return res.data;
  } catch (error) {
    console.error('Last.fm API error (getSimilarTracks):', error.message);
    throw new Error('Failed to fetch similar tracks from Last.fm');
  }
}

module.exports = { getArtistInfo, getSimilarTracks };
