import { Response, NextFunction } from 'express';
import { prisma } from '../utils/db';
import { AppError } from '../middleware/errorHandler';
import { AuthRequest } from '../middleware/auth';

export const createMeal = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const meal = await prisma.meal.create({
      data: {
        ...req.body,
        userId: req.userId!
      }
    });

    res.status(201).json({
      status: 'success',
      data: meal
    });
  } catch (error) {
    next(error);
  }
};

export const getMeals = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { startDate, endDate, mealType, limit = 50 } = req.query;

    const where: any = { userId: req.userId };

    if (startDate || endDate) {
      where.timestamp = {};
      if (startDate) where.timestamp.gte = new Date(startDate as string);
      if (endDate) where.timestamp.lte = new Date(endDate as string);
    }

    if (mealType) where.mealType = mealType;

    const meals = await prisma.meal.findMany({
      where,
      orderBy: { timestamp: 'desc' },
      take: Number(limit)
    });

    res.json({
      status: 'success',
      data: meals
    });
  } catch (error) {
    next(error);
  }
};

export const getMeal = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const meal = await prisma.meal.findFirst({
      where: {
        id: req.params.id,
        userId: req.userId
      }
    });

    if (!meal) {
      return next(new AppError('Meal not found', 404));
    }

    res.json({
      status: 'success',
      data: meal
    });
  } catch (error) {
    next(error);
  }
};

export const updateMeal = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const meal = await prisma.meal.findFirst({
      where: {
        id: req.params.id,
        userId: req.userId
      }
    });

    if (!meal) {
      return next(new AppError('Meal not found', 404));
    }

    const updated = await prisma.meal.update({
      where: { id: req.params.id },
      data: req.body
    });

    res.json({
      status: 'success',
      data: updated
    });
  } catch (error) {
    next(error);
  }
};

export const deleteMeal = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const meal = await prisma.meal.findFirst({
      where: {
        id: req.params.id,
        userId: req.userId
      }
    });

    if (!meal) {
      return next(new AppError('Meal not found', 404));
    }

    await prisma.meal.delete({
      where: { id: req.params.id }
    });

    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (error) {
    next(error);
  }
};