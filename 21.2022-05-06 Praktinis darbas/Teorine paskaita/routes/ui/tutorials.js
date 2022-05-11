import express from 'express'; // main backend package for routes

// Controller imports
import { getTutorials, newTutorial } from '../../controllers/tutorialsUI/tutorials.js';
// Middleware imports
import authorization from '../../middleware/authorization.js';
import checkToken from '../../middleware/checkToken.js';

const tutorialsRouter = express.Router();

tutorialsRouter.get('/', authorization, getTutorials);

tutorialsRouter.post('/', checkToken, newTutorial);


export default tutorialsRouter