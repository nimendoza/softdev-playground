import { Router } from 'express';

const router = Router();
router.get('/', (_req, res, _next) => {
  return res.status(200).end();
});
export default router;