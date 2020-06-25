import { Router } from 'express';

import OngController from './controllers/OngController'
import IncidentController from './controllers/IncidentController'
import ProfileController from './controllers/ProfileController'
import SessionController from './controllers/SessionController';

const ongController = new OngController();
const incidentController = new IncidentController();
const profileController  = new ProfileController();
const sessionController = new SessionController();
const routes = Router();

routes.get('/ongs', ongController.index)
routes.post('/ongs', ongController.create)

routes.get('/incidents', incidentController.index)
routes.post('/incidents', incidentController.create)
routes.delete('/incidents/:id', incidentController.delete)

routes.get('/profile', profileController.index)

routes.post('/sessions', sessionController.create)

export default routes;