const axios = require("axios");

const LASTFM_KEY = process.env.LASTFM_API_KEY;

async function getArtistInfo(artistName) {
  const url = `http://ws.audioscrobbler.com/2.0/`;

  const res = await axios.get(url, {
    params: {
      method: "artist.getinfo",
      artist: artistName,
      api_key: LASTFM_KEY,
      format: "json",
    },
  });

  return res.data;
}

async function getSimilarTracks(artistName, trackName) {
  const url = `http://ws.audioscrobbler.com/2.0/`;

  const res = await axios.get(url, {
    params: {
      method: "track.getsimilar",
      artist: artistName,
      track: trackName,
      api_key: LASTFM_KEY,
      format: "json",
      limit: 6,
    },
  });

  return res.data;
}

module.exports = { getArtistInfo, getSimilarTracks };
