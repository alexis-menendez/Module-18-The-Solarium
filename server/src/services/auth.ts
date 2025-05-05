// Module-18-The-Solarium/server/src/services/auth.ts

import type { Request, Response, NextFunction } from 'express';
import type { ContextFunction } from '@apollo/server';
import type { ExpressContextFunctionArgument } from '@apollo/server/express4';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export interface JwtPayload {
  _id: unknown;
  username: string;
  email: string;
}

// Express middleware version — fine as-is
export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];
    const secretKey = process.env.JWT_SECRET_KEY || '';

    jwt.verify(token, secretKey, (err, user) => {
      if (err) {
        res.sendStatus(403); 
        return;
      }

      req.user = user as JwtPayload;
      return next(); 
    });
    return; 
  } else {
    res.sendStatus(401); 
    return; 
  }
};


// Token generator — fine as-is
export const signToken = (username: string, email: string, _id: unknown) => {
  const payload = { username, email, _id };
  const secretKey = process.env.JWT_SECRET_KEY || '';
  return jwt.sign(payload, secretKey, { expiresIn: '1h' });
};

// Apollo Server context version — FIXED
export const authMiddleware: ContextFunction<
  [ExpressContextFunctionArgument],
  { user: JwtPayload | null }
> = async ({ req }) => {
  const authHeader = req.headers.authorization || '';
  const secretKey = process.env.JWT_SECRET_KEY || '';

  let token = '';
  if (authHeader.startsWith('Bearer ')) {
    token = authHeader.split(' ')[1];
  }

  if (!token) {
    return { user: null };
  }

  try {
    const decoded = jwt.verify(token, secretKey) as JwtPayload;
    return { user: decoded };
  } catch (err) {
    console.error('Token verification failed:', err);
    return { user: null };
  }
};
