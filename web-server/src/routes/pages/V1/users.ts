import { Router } from 'express';

import { login, register } from 'controllers/users';
import { loginValidation, registerValidation } from 'middleware/validation/users';
import { checkJwt } from 'middleware/checkJwt';
import { ok } from 'controllers/ok';
import { show } from 'controllers/users/show';

const router = Router();
router.put('/', [loginValidation], login);
router.post('/', [registerValidation], register);
router.post('/verify', [checkJwt(true)], ok);
router.get('/:id', [checkJwt(false)], show(false));

export default router;