import express from 'express'; // main backend package for routes

// Controller imports
import { loginUser, loginScreen } from '../../controllers/auth/login.js';
// Middleware imports
import loginValid from '../../middleware/loginValidation.js';

const loginRouter = express.Router();

loginRouter.get('/', loginScreen);
loginRouter.post('/', loginValid, loginUser);

export default loginRouter