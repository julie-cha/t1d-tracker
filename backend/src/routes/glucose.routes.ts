import { Router } from 'express';
import {
  createReading,
  getReadings,
  getReading,
  updateReading,
  deleteReading,
  getStatistics
} from '../controllers/glucose.controller';
import { protect } from '../middleware/auth';

const router = Router();

router.use(protect);

router.route('/')
  .post(createReading)
  .get(getReadings);

router.route('/statistics')
  .get(getStatistics);

router.route('/:id')
  .get(getReading)
  .put(updateReading)
  .delete(deleteReading);

export default router;