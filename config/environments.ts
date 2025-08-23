interface EnvironmentConfig {
  NODE_ENV: string;
  API_BASE_URL: string;
  API_VERSION: string;
  API_TIMEOUT: number;
  DB_HOST: string;
  DB_PORT: number;
  DB_NAME: string;
  DB_USER: string;
  DB_PASSWORD: string;
  JWT_SECRET: string;
  JWT_EXPIRATION: string;
  GOOGLE_MAPS_API_KEY: string;
  PUSH_NOTIFICATION_KEY: string;
  LOG_LEVEL: string;
  LOG_FILE_PATH: string;
  ENABLE_ANALYTICS: boolean;
  ENABLE_PUSH_NOTIFICATIONS: boolean;
  ENABLE_OFFLINE_MODE: boolean;
  ENABLE_DEBUG_MODE?: boolean;
}

const developmentConfig: EnvironmentConfig = {
  NODE_ENV: 'development',
  API_BASE_URL: 'https://dev-api.diabetescare.com',
  API_VERSION: 'v1',
  API_TIMEOUT: 15000,
  DB_HOST: 'localhost',
  DB_PORT: 5432,
  DB_NAME: 'diabetes_care_dev',
  DB_USER: 'dev_user',
  DB_PASSWORD: 'dev_password',
  JWT_SECRET: 'dev_jwt_secret_key_change_in_production',
  JWT_EXPIRATION: '24h',
  GOOGLE_MAPS_API_KEY: 'your_dev_google_maps_api_key',
  PUSH_NOTIFICATION_KEY: 'your_dev_push_notification_key',
  LOG_LEVEL: 'debug',
  LOG_FILE_PATH: './logs/dev.log',
  ENABLE_ANALYTICS: true,
  ENABLE_PUSH_NOTIFICATIONS: true,
  ENABLE_OFFLINE_MODE: true,
  ENABLE_DEBUG_MODE: true,
};

const productionConfig: EnvironmentConfig = {
  NODE_ENV: 'production',
  API_BASE_URL: 'https://api.diabetescare.com',
  API_VERSION: 'v1',
  API_TIMEOUT: 10000,
  DB_HOST: 'prod-db-server.com',
  DB_PORT: 5432,
  DB_NAME: 'diabetes_care_prod',
  DB_USER: 'prod_user',
  DB_PASSWORD: 'secure_production_password',
  JWT_SECRET: 'secure_production_jwt_secret_key',
  JWT_EXPIRATION: '1h',
  GOOGLE_MAPS_API_KEY: 'your_production_google_maps_api_key',
  PUSH_NOTIFICATION_KEY: 'your_production_push_notification_key',
  LOG_LEVEL: 'error',
  LOG_FILE_PATH: './logs/prod.log',
  ENABLE_ANALYTICS: true,
  ENABLE_PUSH_NOTIFICATIONS: true,
  ENABLE_OFFLINE_MODE: true,
  ENABLE_DEBUG_MODE: false,
};

const getEnvironmentConfig = (): EnvironmentConfig => {
  const env = process.env.NODE_ENV || 'development';
  
  switch (env) {
    case 'production':
      return productionConfig;
    case 'development':
    default:
      return developmentConfig;
  }
};

export const config = getEnvironmentConfig();
export type { EnvironmentConfig };