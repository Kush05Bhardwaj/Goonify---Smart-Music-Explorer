const express = require('express');
const { createSpotifyApi } = require('../config');
const { requireAuth } = require('../middleware');

const router = express.Router();

// Get Spotify user profile
router.get('/me', requireAuth, async (req, res) => {
  const spotifyApi = createSpotifyApi(req.accessToken);

  try {
    const me = await spotifyApi.getMe();
    res.json(me.body);
  } catch (err) {
    console.error('Error fetching profile:', err);
    res.status(500).json({ error: "Failed to fetch Spotify profile" });
  }
});

// Get user's top tracks
router.get('/top-tracks', requireAuth, async (req, res) => {
  const limit = parseInt(req.query.limit) || 10;
  const timeRange = req.query.time_range || 'medium_term'; // short_term, medium_term, long_term
  
  if (limit < 1 || limit > 50) {
    return res.status(400).json({ error: "Limit must be between 1 and 50" });
  }

  const spotifyApi = createSpotifyApi(req.accessToken);

  try {
    const data = await spotifyApi.getMyTopTracks({ 
      limit,
      time_range: timeRange 
    });
    res.json(data.body.items);
  } catch (err) {
    console.error('Error fetching top tracks:', err);
    res.status(500).json({ error: "Failed to fetch top tracks" });
  }
});

// Get user's top artists
router.get('/top-artists', requireAuth, async (req, res) => {
  const limit = parseInt(req.query.limit) || 10;
  const timeRange = req.query.time_range || 'medium_term';
  
  if (limit < 1 || limit > 50) {
    return res.status(400).json({ error: "Limit must be between 1 and 50" });
  }

  const spotifyApi = createSpotifyApi(req.accessToken);

  try {
    const data = await spotifyApi.getMyTopArtists({ 
      limit,
      time_range: timeRange 
    });
    res.json(data.body.items);
  } catch (err) {
    console.error('Error fetching top artists:', err);
    res.status(500).json({ error: "Failed to fetch top artists" });
  }
});

// Get recommendations based on user's favorite genres
router.get('/recommendations', requireAuth, async (req, res) => {
  const spotifyApi = createSpotifyApi(req.accessToken);

  try {
    // Get user's top artists and tracks
    const [topArtists, topTracks] = await Promise.all([
      spotifyApi.getMyTopArtists({ limit: 5 }),
      spotifyApi.getMyTopTracks({ limit: 5 })
    ]);
    
    // Extract unique genres
    const genres = [...new Set(
      topArtists.body.items.flatMap(artist => artist.genres)
    )].slice(0, 5);

    // Prepare seed parameters
    const seedParams = {};
    
    if (genres.length > 0) {
      seedParams.seed_genres = genres.slice(0, 2); // Use 2 genres
    }
    
    // Add seed tracks if we don't have enough genres
    if (genres.length < 2 && topTracks.body.items.length > 0) {
      seedParams.seed_tracks = topTracks.body.items
        .slice(0, 3)
        .map(track => track.id);
    }
    
    // Add seed artists
    if (topArtists.body.items.length > 0) {
      seedParams.seed_artists = topArtists.body.items
        .slice(0, genres.length > 0 ? 2 : 3)
        .map(artist => artist.id);
    }

    // Check if we have at least one seed
    if (Object.keys(seedParams).length === 0) {
      return res.json([]);
    }

    // Get recommendations
    const recommendations = await spotifyApi.getRecommendations({
      ...seedParams,
      limit: 20
    });

    res.json(recommendations.body.tracks);
  } catch (err) {
    console.error('Error fetching recommendations:', err);
    // Return empty array on error instead of failing
    res.json([]);
  }
});

// Get user's playlists
router.get('/playlists', requireAuth, async (req, res) => {
  const spotifyApi = createSpotifyApi(req.accessToken);
  const limit = parseInt(req.query.limit) || 20;

  try {
    const data = await spotifyApi.getUserPlaylists({ limit });
    res.json(data.body.items);
  } catch (err) {
    console.error('Error fetching playlists:', err);
    res.status(500).json({ error: "Failed to fetch playlists" });
  }
});

// Get playlist tracks
router.get('/playlist/:id', requireAuth, async (req, res) => {
  const spotifyApi = createSpotifyApi(req.accessToken);
  const playlistId = req.params.id;

  try {
    const data = await spotifyApi.getPlaylistTracks(playlistId);
    res.json(data.body.items.map(item => item.track));
  } catch (err) {
    console.error('Error fetching playlist tracks:', err);
    res.status(500).json({ error: "Failed to fetch playlist tracks" });
  }
});

// Search tracks
router.get('/search', requireAuth, async (req, res) => {
  const query = req.query.q;
  const limit = parseInt(req.query.limit) || 20;

  if (!query || query.trim().length === 0) {
    return res.status(400).json({ error: "Search query is required" });
  }

  const spotifyApi = createSpotifyApi(req.accessToken);

  try {
    const data = await spotifyApi.searchTracks(query, { limit });
    res.json(data.body.tracks.items);
  } catch (err) {
    console.error('Error searching tracks:', err);
    res.status(500).json({ error: "Failed to search tracks" });
  }
});

// Get recently played tracks
router.get('/recently-played', requireAuth, async (req, res) => {
  const spotifyApi = createSpotifyApi(req.accessToken);
  const limit = parseInt(req.query.limit) || 50;

  try {
    const data = await spotifyApi.getMyRecentlyPlayedTracks({ limit });
    res.json(data.body.items);
  } catch (err) {
    console.error('Error fetching recently played:', err);
    res.status(500).json({ error: "Failed to fetch recently played tracks" });
  }
});

// Get listening analytics
router.get('/analytics', requireAuth, async (req, res) => {
  const spotifyApi = createSpotifyApi(req.accessToken);

  try {
    const [topTracks, topArtists, recentlyPlayed] = await Promise.all([
      spotifyApi.getMyTopTracks({ limit: 50, time_range: 'long_term' }).catch(() => ({ body: { items: [] } })),
      spotifyApi.getMyTopArtists({ limit: 50, time_range: 'long_term' }).catch(() => ({ body: { items: [] } })),
      spotifyApi.getMyRecentlyPlayedTracks({ limit: 50 }).catch(() => ({ body: { items: [] } }))
    ]);

    // Calculate total listening time (estimate based on track durations)
    const totalListeningTime = topTracks.body.items.reduce((acc, track) => acc + (track.duration_ms || 0), 0);

    // Extract genres from top artists
    const genreCounts = {};
    topArtists.body.items.forEach(artist => {
      artist.genres.forEach(genre => {
        genreCounts[genre] = (genreCounts[genre] || 0) + 1;
      });
    });

    // Sort genres by count
    const topGenres = Object.entries(genreCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([genre, count]) => ({ genre, count }));

    // Group recently played by hour
    const listeningByHour = Array(24).fill(0);
    recentlyPlayed.body.items.forEach(item => {
      const hour = new Date(item.played_at).getHours();
      listeningByHour[hour]++;
    });

    // Calculate average popularity
    const avgPopularity = topTracks.body.items.length > 0
      ? topTracks.body.items.reduce((acc, track) => acc + (track.popularity || 0), 0) / topTracks.body.items.length
      : 0;

    // Get audio features for top tracks
    let avgFeatures = {
      energy: 50,
      danceability: 50,
      valence: 50,
      acousticness: 50,
      instrumentalness: 50,
      speechiness: 50
    };

    try {
      const trackIds = topTracks.body.items.slice(0, 20).map(t => t.id).filter(id => id);
      
      if (trackIds.length > 0) {
        const audioFeatures = await spotifyApi.getAudioFeaturesForTracks(trackIds);

        // Calculate average audio features
        const features = {
          energy: 0,
          danceability: 0,
          valence: 0,
          acousticness: 0,
          instrumentalness: 0,
          speechiness: 0
        };

        let featureCount = 0;
        audioFeatures.body.audio_features.forEach(feature => {
          if (feature) {
            features.energy += feature.energy;
            features.danceability += feature.danceability;
            features.valence += feature.valence;
            features.acousticness += feature.acousticness;
            features.instrumentalness += feature.instrumentalness;
            features.speechiness += feature.speechiness;
            featureCount++;
          }
        });

        if (featureCount > 0) {
          Object.keys(features).forEach(key => {
            avgFeatures[key] = (features[key] / featureCount) * 100;
          });
        }
      }
    } catch (err) {
      console.error('Error fetching audio features:', err);
      // Use default values if audio features fail
    }

    res.json({
      totalListeningTime,
      topGenres,
      listeningByHour,
      avgPopularity: Math.round(avgPopularity),
      audioFeatures: avgFeatures,
      totalTracks: topTracks.body.items.length,
      totalArtists: topArtists.body.items.length,
      recentlyPlayedCount: recentlyPlayed.body.items.length
    });
  } catch (err) {
    console.error('Error fetching analytics:', err);
    console.error('Error details:', err.body || err.message);
    res.status(500).json({ 
      error: "Failed to fetch analytics",
      details: err.message || "Unknown error"
    });
  }
});

module.exports = router;
