import * as dotenv from 'dotenv';
dotenv.config({ path: '.env' });

export const JWT_SECRET = process.env.JWT_SECRET ?? 'JwtSecretNestJsGraphQL';
export const ACCESS_TOKEN_EXPIRED = process.env.ACCESS_TOKEN_EXPIRED ? +process.env.ACCESS_TOKEN_EXPIRED : 60 * 60 * 2;
export const REFRESH_TOKEN_EXPIRED = process.env.REFRESH_TOKEN_EXPIRED ? +process.env.REFRESH_TOKEN_EXPIRED : 60 * 60 * 24 * 3;