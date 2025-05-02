// Module-18-The-Solarium/server/src/routes/api/index.ts

import express from 'express';
const router = express.Router();
import userRoutes from './user-routes.js';

router.use('/users', userRoutes);

export default router;
