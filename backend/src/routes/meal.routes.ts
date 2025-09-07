import { Router } from 'express';
import {
  createMeal,
  getMeals,
  getMeal,
  updateMeal,
  deleteMeal
} from '../controllers/meal.controller';
import { protect } from '../middleware/auth';

const router = Router();

router.use(protect);

router.route('/')
  .post(createMeal)
  .get(getMeals);

router.route('/:id')
  .get(getMeal)
  .put(updateMeal)
  .delete(deleteMeal);

export default router;