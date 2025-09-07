import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { errorHandler } from './middleware/errorHandler';
import { connectDatabase } from './config/database';
import authRoutes from './routes/auth.routes';
import glucoseRoutes from './routes/glucose.routes';
import mealRoutes from './routes/meal.routes';
import activityRoutes from './routes/activity.routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:8081',
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Diabetes Care API is running' });
});

app.use('/api/auth', authRoutes);
app.use('/api/glucose', glucoseRoutes);
app.use('/api/meals', mealRoutes);
app.use('/api/activities', activityRoutes);

app.use(errorHandler);

const startServer = async () => {
  try {
    await connectDatabase();
    
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
      console.log(`Environment: ${process.env.NODE_ENV}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();