import { Router } from 'express';
import ontologies from './databaseRoutes';

const router = Router();

router.use('/ontologies', ontologies);

export default router;
