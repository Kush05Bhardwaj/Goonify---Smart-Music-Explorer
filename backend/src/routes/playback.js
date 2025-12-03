const express = require('express');
const { createSpotifyApi } = require('../config');
const { requireAuth } = require('../middleware');

const router = express.Router();

// Get current playback state
router.get('/current', requireAuth, async (req, res) => {
  const spotifyApi = createSpotifyApi(req.accessToken);

  try {
    const data = await spotifyApi.getMyCurrentPlaybackState();
    res.json(data.body);
  } catch (err) {
    console.error('Error fetching playback state:', err);
    res.status(500).json({ error: "Failed to fetch playback state" });
  }
});

// Play a track
router.put('/play', requireAuth, async (req, res) => {
  const { uris, device_id } = req.body;
  const spotifyApi = createSpotifyApi(req.accessToken);

  try {
    const options = {};
    if (uris) options.uris = uris;
    if (device_id) options.device_id = device_id;

    await spotifyApi.play(options);
    res.json({ success: true, message: 'Playback started' });
  } catch (err) {
    console.error('Error starting playback:', err);
    
    // Provide more specific error messages
    let errorMessage = "Failed to start playback";
    let statusCode = 500;

    if (err.statusCode === 403) {
      errorMessage = "PREMIUM_REQUIRED: Spotify Premium is required";
      statusCode = 403;
    } else if (err.statusCode === 404) {
      errorMessage = "NO_ACTIVE_DEVICE: No active device found. Please wait for the player to initialize.";
      statusCode = 404;
    } else if (err.body?.error?.reason) {
      errorMessage = err.body.error.reason;
      statusCode = err.statusCode || 500;
    }

    res.status(statusCode).json({ error: errorMessage });
  }
});

// Pause playback
router.put('/pause', requireAuth, async (req, res) => {
  const spotifyApi = createSpotifyApi(req.accessToken);

  try {
    await spotifyApi.pause();
    res.json({ success: true, message: 'Playback paused' });
  } catch (err) {
    console.error('Error pausing playback:', err);
    res.status(500).json({ error: "Failed to pause playback" });
  }
});

// Skip to next track
router.post('/next', requireAuth, async (req, res) => {
  const spotifyApi = createSpotifyApi(req.accessToken);

  try {
    await spotifyApi.skipToNext();
    res.json({ success: true, message: 'Skipped to next track' });
  } catch (err) {
    console.error('Error skipping to next:', err);
    res.status(500).json({ error: "Failed to skip track" });
  }
});

// Skip to previous track
router.post('/previous', requireAuth, async (req, res) => {
  const spotifyApi = createSpotifyApi(req.accessToken);

  try {
    await spotifyApi.skipToPrevious();
    res.json({ success: true, message: 'Skipped to previous track' });
  } catch (err) {
    console.error('Error skipping to previous:', err);
    res.status(500).json({ error: "Failed to skip track" });
  }
});

// Set volume (0-100)
router.put('/volume', requireAuth, async (req, res) => {
  const { volume } = req.body;
  
  if (volume < 0 || volume > 100) {
    return res.status(400).json({ error: "Volume must be between 0 and 100" });
  }

  const spotifyApi = createSpotifyApi(req.accessToken);

  try {
    await spotifyApi.setVolume(volume);
    res.json({ success: true, message: 'Volume updated' });
  } catch (err) {
    console.error('Error setting volume:', err);
    res.status(500).json({ error: "Failed to set volume" });
  }
});

// Seek to position (in milliseconds)
router.put('/seek', requireAuth, async (req, res) => {
  const { position } = req.body;
  
  if (position < 0) {
    return res.status(400).json({ error: "Position must be positive" });
  }

  const spotifyApi = createSpotifyApi(req.accessToken);

  try {
    await spotifyApi.seek(position);
    res.json({ success: true, message: 'Playback position updated' });
  } catch (err) {
    console.error('Error seeking:', err);
    res.status(500).json({ error: "Failed to seek" });
  }
});

// Get available devices
router.get('/devices', requireAuth, async (req, res) => {
  const spotifyApi = createSpotifyApi(req.accessToken);

  try {
    const data = await spotifyApi.getMyDevices();
    res.json(data.body.devices);
  } catch (err) {
    console.error('Error fetching devices:', err);
    res.status(500).json({ error: "Failed to fetch devices" });
  }
});

// Transfer playback to device
router.put('/transfer', requireAuth, async (req, res) => {
  const { device_id } = req.body;
  
  if (!device_id) {
    return res.status(400).json({ error: "device_id is required" });
  }

  const spotifyApi = createSpotifyApi(req.accessToken);

  try {
    await spotifyApi.transferMyPlayback([device_id]);
    res.json({ success: true, message: 'Playback transferred' });
  } catch (err) {
    console.error('Error transferring playback:', err);
    res.status(500).json({ error: "Failed to transfer playback" });
  }
});

module.exports = router;
