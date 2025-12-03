const express = require('express');
const { requireAuth } = require('../middleware');

const router = express.Router();

// Get access token for Web Playback SDK
// Note: This exposes the token to the client, use with caution
router.get('/token', requireAuth, (req, res) => {
  res.json({ token: req.accessToken });
});

module.exports = router;
