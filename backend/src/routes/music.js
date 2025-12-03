const express = require('express');
const { getArtistInfo, getSimilarTracks } = require('../services/lastfm');
const { getLyrics } = require('../services/genius');

const router = express.Router();

// Get artist info from Last.fm
router.get('/artist', async (req, res) => {
  const name = req.query.name;
  
  if (!name || name.trim().length === 0) {
    return res.status(400).json({ error: "Artist name is required" });
  }

  try {
    const data = await getArtistInfo(name);
    res.json(data);
  } catch (err) {
    console.error('Error fetching artist info:', err);
    res.status(500).json({ error: "Failed to fetch artist info" });
  }
});

// Get similar tracks from Last.fm
router.get('/similar-tracks', async (req, res) => {
  const { artist, track } = req.query;
  
  if (!artist || !track) {
    return res.status(400).json({ error: "Both artist and track parameters are required" });
  }

  try {
    const data = await getSimilarTracks(artist, track);
    const similarTracks = data.track?.similar?.track || [];
    res.json(similarTracks);
  } catch (err) {
    console.error('Error fetching similar tracks:', err);
    res.status(500).json({ error: "Failed to fetch similar tracks" });
  }
});

// Get song lyrics from Genius
router.get('/lyrics', async (req, res) => {
  const { artist, song } = req.query;
  
  if (!artist || !song) {
    return res.status(400).json({ error: "Both artist and song parameters are required" });
  }

  try {
    const lyrics = await getLyrics(artist, song);
    res.json({ lyrics });
  } catch (err) {
    console.error('Error fetching lyrics:', err);
    res.status(500).json({ error: "Failed to fetch lyrics" });
  }
});

module.exports = router;
