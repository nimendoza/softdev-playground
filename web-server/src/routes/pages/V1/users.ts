import { Router } from 'express';

import { login, register } from 'controllers/users';
import { loginValidation, registerValidation } from 'middleware/validation/users';

const router = Router();
router.put('/', [loginValidation], login);
router.post('/', [registerValidation], register);

export default router;