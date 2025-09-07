import { PrismaClient } from '@prisma/client';

declare global {
  var prisma: PrismaClient | undefined;
}

const getDatabaseUrl = (): string => {
  if (process.env.NODE_ENV === 'production') {
    // Production: Direct connection via Unix socket
    const projectId = process.env.GCP_PROJECT_ID;
    const region = process.env.GCP_REGION;
    const instance = process.env.GCP_SQL_INSTANCE;
    const dbName = 'diabetes_care_db';
    const password = process.env.DB_PASSWORD;
    
    return `postgresql://postgres:${password}@/${dbName}?host=/cloudsql/${projectId}:${region}:${instance}`;
  }
  
  // Development: Connect via Cloud SQL Proxy
  return process.env.DATABASE_URL || 'postgresql://postgres:password@localhost:5432/diabetes_care_db';
};

export const prisma = global.prisma || new PrismaClient({
  datasources: {
    db: {
      url: getDatabaseUrl()
    }
  },
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error']
});

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}

export const connectDatabase = async () => {
  try {
    await prisma.$connect();
    console.log('✅ Database connected successfully');
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    process.exit(1);
  }
};

export const disconnectDatabase = async () => {
  await prisma.$disconnect();
};