import dotenv from 'dotenv';

dotenv.config();

export const PORT = process.env.PORT;
export const url_MongoDB = process.env.url_MongoDB;

export const jwtSecret = process.env.jwtSecret;

export const ORIGIN1 = process.env.ORIGIN1;
export const ORIGIN2 = process.env.ORIGIN2;