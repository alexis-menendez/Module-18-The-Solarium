// Module-18-The-Solarium/server/src/types/express/index.d.ts

declare namespace Express {
  interface Request {
    user: {
      _id: unknown;
      username: string;
    };
  }
}
