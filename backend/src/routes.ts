import { Router } from 'express';
import multer from 'multer';

import uploadConfig from './config/upload';
import GreenAreasController from './controllers/GreenAreasController';

const routes = Router();
const upload = multer(uploadConfig);

routes.get('/greenAreas', GreenAreasController.index);
routes.get('/greenAreas/:id', GreenAreasController.show);
routes.post('/greenAreas', upload.array('images'), GreenAreasController.create);

export default routes;
