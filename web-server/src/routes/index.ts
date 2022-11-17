import { Router } from 'express';

import notFound from 'routes/pages/404';
import root from 'routes/pages/root';
import V1 from 'routes/pages/V1';

const router = Router();
router.use('/V1', V1);
router.use(notFound);
router.use(root);
export default router;