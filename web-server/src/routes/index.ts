import { Router } from 'express';

import fs from 'fs';
import notFound from 'routes/pages/404';
import root from 'routes/pages/root';
import V1 from 'routes/pages/V1';
import swaggerUi, { JsonObject } from 'swagger-ui-express';
import jsyaml from 'js-yaml';

const router = Router();
router.use('/V1', V1);

router.use('/docs', swaggerUi.serve);
router.get('/docs', swaggerUi.setup(jsyaml.load(fs.readFileSync('src/types/openapi.yaml', 'utf8')) as JsonObject));

router.use(notFound);
router.use(root);
export default router;