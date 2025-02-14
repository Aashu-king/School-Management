import * as dotenv from 'dotenv';
import path from 'path';

// Load .env file
dotenv.config({ path: path.resolve(__dirname, '../../.env') });
// Validate required environment variables
const requiredEnvVars = ['PORT', 'DATABASE_URL', 'API_KEY', 'NODE_ENV','IMAGE_URL','ORIGIN','SESSION_SECRET'] as const;

// Validate and throw error if any required variables are missing
for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    throw new Error(`Missing required environment variable: ${envVar}`);
  }
}

// Type assertion function to ensure variables exist
const getRequiredEnvVar = (name: string): string => {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
};

// Export configured environment variables
export const config = {
  port: parseInt(getRequiredEnvVar('PORT'), 10),
  databaseUrl: getRequiredEnvVar('DATABASE_URL'),
  apiKey: getRequiredEnvVar('API_KEY'),
  nodeEnv: getRequiredEnvVar('NODE_ENV') as 'development' | 'production' | 'test',
  origin: getRequiredEnvVar('ORIGIN'),
  session_secert : getRequiredEnvVar('SESSION_SECRET')
} as const;