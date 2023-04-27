import * as dotenv from 'dotenv';
dotenv.config({ path: '.env' });

export const UPLOAD_PATH = process.env.UPLOAD_PATH ?? 'public/uploads';