import { Router } from 'express';

import { login, register } from 'controllers/users';
import { loginValidation, registerValidation } from 'middleware/validation/users';
import { checkJwt } from 'middleware/checkJwt';
import { ok } from 'controllers/ok';

const router = Router();
router.put('/', [loginValidation], login);
router.post('/', [registerValidation], register);
router.post('/verify', [checkJwt(true)], ok);

export default router;