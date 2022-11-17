import { Router } from 'express';

const router = Router();
router.get('*', (_req, res, _next) => {
  return res.status(404).end();
});
export default router;