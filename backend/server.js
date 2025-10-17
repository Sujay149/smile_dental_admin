import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import doctorsRouter from './routes/doctors.js';
import usersRouter from './routes/users.js';
import clinicsRouter from './routes/clinics.js';
import pool from './config/database.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3002;

// CORS configuration: support comma-separated list of allowed origins or ALLOW_ALL_ORIGINS for dev
const rawOrigins = process.env.CORS_ORIGIN || 'http://localhost:5174';
const allowAll = process.env.ALLOW_ALL_ORIGINS === 'true';
const allowedOrigins = rawOrigins.split(',').map(o => o.trim()).filter(Boolean);

console.log('🔒 CORS configuration: allowAll=', allowAll, 'allowedOrigins=', allowedOrigins);

const corsOptions = {
  origin: function (origin, callback) {
    // If no origin (e.g., same-origin requests, curl, server-to-server), allow it
    if (!origin) return callback(null, true);
    if (allowAll) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    // not allowed: log and deny without throwing to avoid 500 response
    console.warn('⚠️ CORS blocked origin:', origin);
    return callback(null, false);
  },
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/doctors', doctorsRouter);
app.use('/api/users', usersRouter);
app.use('/api/clinics', clinicsRouter);

app.get('/api/health', async (req, res) => {
  try {
    await pool.query('SELECT 1');
    res.json({
      status: 'ok',
      message: 'Server and database are running',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Database connection failed',
      error: error.message
    });
  }
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    error: 'Something went wrong!'
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Backend server running on http://localhost:${PORT}`);
  console.log(`📊 Health check available at http://localhost:${PORT}/api/health`);
  console.log(`🌐 CORS enabled for: ${process.env.CORS_ORIGIN || 'http://65.2.172.252:5174'}`);
  console.log(`📦 Database: ${process.env.DB_HOST || 'Not configured'}`);
});
