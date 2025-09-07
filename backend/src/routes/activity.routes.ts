import { Router } from 'express';
import {
  createActivity,
  getActivities,
  getActivity,
  updateActivity,
  deleteActivity
} from '../controllers/activity.controller';
import { protect } from '../middleware/auth';

const router = Router();

router.use(protect);

router.route('/')
  .post(createActivity)
  .get(getActivities);

router.route('/:id')
  .get(getActivity)
  .put(updateActivity)
  .delete(deleteActivity);

export default router;