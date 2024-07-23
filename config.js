import 'dotenv/config';

export const port = process.env.PORT || 3000;
export const dbUri = process.env.DB_URI || "mongodb://localhost:27017/mydatabase";
export const jwtSecret = process.env.JWT_SECRET || "secretKey";