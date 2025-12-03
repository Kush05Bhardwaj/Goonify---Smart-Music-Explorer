const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const { validateEnv, PORT, CORS_ORIGINS } = require('./config');
const { errorHandler, requestLogger } = require('./middleware');

// Import routes
const authRoutes = require('./routes/auth');
const spotifyRoutes = require('./routes/spotify');
const musicRoutes = require('./routes/music');
const playbackRoutes = require('./routes/playback');
const tokenRoutes = require('./routes/token');

// Validate environment variables on startup
validateEnv();

const app = express();

// Security & middleware
app.use(helmet()); // Security headers
app.use(cors({
  origin: CORS_ORIGINS,
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());
app.use(requestLogger);

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'Smart Music Explorer backend is running 🎵',
    timestamp: new Date().toISOString()
  });
});

// Root route
app.get('/', (req, res) => {
  res.json({
    name: 'Smart Music Explorer API',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      auth: '/api/auth/*',
      spotify: '/api/spotify/*',
      music: '/api/music/*'
    }
  });
});

// Mount route handlers
app.use('/api/auth', authRoutes);
app.use('/api/auth', tokenRoutes);
app.use('/api', spotifyRoutes); // Legacy compatibility
app.use('/api/music', musicRoutes);
app.use('/api/playback', playbackRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Error handler (must be last)
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`✨ Backend server running on http://localhost:${PORT}`);
  console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
});