import { Response, NextFunction } from 'express';
import { prisma } from '../utils/db';
import { AppError } from '../middleware/errorHandler';
import { AuthRequest } from '../middleware/auth';

export const createReading = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { value, unit, notes, mealType, timing } = req.body;

    const reading = await prisma.glucoseReading.create({
      data: {
        userId: req.userId!,
        value,
        unit: unit || 'mg/dL',
        notes,
        mealType,
        timing
      }
    });

    res.status(201).json({
      status: 'success',
      data: reading
    });
  } catch (error) {
    next(error);
  }
};

export const getReadings = async (
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

    const readings = await prisma.glucoseReading.findMany({
      where,
      orderBy: { timestamp: 'desc' },
      take: Number(limit)
    });

    res.json({
      status: 'success',
      data: readings
    });
  } catch (error) {
    next(error);
  }
};

export const getReading = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const reading = await prisma.glucoseReading.findFirst({
      where: {
        id: req.params.id,
        userId: req.userId
      }
    });

    if (!reading) {
      return next(new AppError('Reading not found', 404));
    }

    res.json({
      status: 'success',
      data: reading
    });
  } catch (error) {
    next(error);
  }
};

export const updateReading = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const reading = await prisma.glucoseReading.findFirst({
      where: {
        id: req.params.id,
        userId: req.userId
      }
    });

    if (!reading) {
      return next(new AppError('Reading not found', 404));
    }

    const updated = await prisma.glucoseReading.update({
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

export const deleteReading = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const reading = await prisma.glucoseReading.findFirst({
      where: {
        id: req.params.id,
        userId: req.userId
      }
    });

    if (!reading) {
      return next(new AppError('Reading not found', 404));
    }

    await prisma.glucoseReading.delete({
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

export const getStatistics = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { period = '7d' } = req.query;

    const days = period === '30d' ? 30 : period === '14d' ? 14 : 7;
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const readings = await prisma.glucoseReading.findMany({
      where: {
        userId: req.userId,
        timestamp: { gte: startDate }
      }
    });

    const values = readings.map(r => r.value);
    const average = values.reduce((a, b) => a + b, 0) / values.length || 0;
    const min = Math.min(...values) || 0;
    const max = Math.max(...values) || 0;

    const inRange = readings.filter(r => r.value >= 70 && r.value <= 180).length;
    const belowRange = readings.filter(r => r.value < 70).length;
    const aboveRange = readings.filter(r => r.value > 180).length;

    res.json({
      status: 'success',
      data: {
        average: Math.round(average),
        min,
        max,
        totalReadings: readings.length,
        inRange,
        belowRange,
        aboveRange,
        percentInRange: readings.length ? Math.round((inRange / readings.length) * 100) : 0
      }
    });
  } catch (error) {
    next(error);
  }
};