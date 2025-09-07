import { Response, NextFunction } from 'express';
import { prisma } from '../utils/db';
import { AppError } from '../middleware/errorHandler';
import { AuthRequest } from '../middleware/auth';

export const createActivity = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const activity = await prisma.activity.create({
      data: {
        ...req.body,
        userId: req.userId!
      }
    });

    res.status(201).json({
      status: 'success',
      data: activity
    });
  } catch (error) {
    next(error);
  }
};

export const getActivities = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { startDate, endDate, type, limit = 50 } = req.query;

    const where: any = { userId: req.userId };

    if (startDate || endDate) {
      where.startTime = {};
      if (startDate) where.startTime.gte = new Date(startDate as string);
      if (endDate) where.startTime.lte = new Date(endDate as string);
    }

    if (type) where.type = type;

    const activities = await prisma.activity.findMany({
      where,
      orderBy: { startTime: 'desc' },
      take: Number(limit)
    });

    res.json({
      status: 'success',
      data: activities
    });
  } catch (error) {
    next(error);
  }
};

export const getActivity = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const activity = await prisma.activity.findFirst({
      where: {
        id: req.params.id,
        userId: req.userId
      }
    });

    if (!activity) {
      return next(new AppError('Activity not found', 404));
    }

    res.json({
      status: 'success',
      data: activity
    });
  } catch (error) {
    next(error);
  }
};

export const updateActivity = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const activity = await prisma.activity.findFirst({
      where: {
        id: req.params.id,
        userId: req.userId
      }
    });

    if (!activity) {
      return next(new AppError('Activity not found', 404));
    }

    const updated = await prisma.activity.update({
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

export const deleteActivity = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const activity = await prisma.activity.findFirst({
      where: {
        id: req.params.id,
        userId: req.userId
      }
    });

    if (!activity) {
      return next(new AppError('Activity not found', 404));
    }

    await prisma.activity.delete({
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