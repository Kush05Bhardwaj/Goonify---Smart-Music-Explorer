// API Configuration
export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

// API Endpoints
export const API_ENDPOINTS = {
  health: `${API_URL}/api/health`,
  auth: {
    login: `${API_URL}/api/auth/login`,
    logout: `${API_URL}/api/auth/logout`,
    status: `${API_URL}/api/auth/status`,
  },
  spotify: {
    me: `${API_URL}/api/me`,
    topTracks: `${API_URL}/api/top-tracks`,
    topArtists: `${API_URL}/api/top-artists`,
    recommendations: `${API_URL}/api/recommendations`,
    playlists: `${API_URL}/api/playlists`,
    playlist: `${API_URL}/api/playlist`,
    search: `${API_URL}/api/search`,
    recentlyPlayed: `${API_URL}/api/recently-played`,
    analytics: `${API_URL}/api/analytics`,
  },
  music: {
    artist: `${API_URL}/api/music/artist`,
    similarTracks: `${API_URL}/api/music/similar-tracks`,
    lyrics: `${API_URL}/api/music/lyrics`,
  },
  playback: {
    current: `${API_URL}/api/playback/current`,
    play: `${API_URL}/api/playback/play`,
    pause: `${API_URL}/api/playback/pause`,
    next: `${API_URL}/api/playback/next`,
    previous: `${API_URL}/api/playback/previous`,
    seek: `${API_URL}/api/playback/seek`,
    volume: `${API_URL}/api/playback/volume`,
    devices: `${API_URL}/api/playback/devices`,
    transfer: `${API_URL}/api/playback/transfer`,
  }
};

// Fetch helper with credentials
export async function apiFetch(url: string, options: RequestInit = {}) {
  const response = await fetch(url, {
    ...options,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Network error' }));
    throw new Error(error.error || `HTTP ${response.status}`);
  }

  return response.json();
}
