import express from 'express'; // main backend package for routes
// Controller imports
import { newUser, registrationScreen } from '../../controllers/auth/register.js';
// Middleware imports
import registerValidation from '../../middleware/registerValidation.js'

const registerRouter = express.Router();

registerRouter.get('/', registrationScreen);
registerRouter.post('/', registerValidation, newUser);

export default registerRouter