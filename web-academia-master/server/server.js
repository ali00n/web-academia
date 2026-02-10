import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import './prisma.js'; // Initialize Prisma connection
import authRoutes from './routes/auth.js';
import memberRoutes from './routes/member.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/member', memberRoutes);

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'Academia Black Fitness API is running' });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: 'Endpoint não encontrado' });
});

// Error handler
app.use((err, req, res, next) => {
    console.error('Server error:', err);
    res.status(500).json({ error: 'Erro interno do servidor' });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📊 API Health: http://localhost:${PORT}/api/health`);
});
