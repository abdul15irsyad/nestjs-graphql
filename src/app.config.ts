import * as dotenv from 'dotenv';
dotenv.config({ path: '.env' });

type NodeEnvironment = 'development' | 'staging' | 'production';
export const NODE_ENV = process.env.NODE_ENV as NodeEnvironment ?? 'development';
export const PORT = process.env.PORT ? +process.env.PORT : 4004;
export const ORIGINS = process.env.ORIGINS ? process.env.ORIGINS.split(',') : '*';