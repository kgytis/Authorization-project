import express from 'express'; // main backend package for routes

// Controller imports
import logoutUser from '../../controllers/auth/logout.js';
// Middleware imports
import checkToken from '../../middleware/checkToken.js';

const logoutRouter = express.Router();
logoutRouter.get('/', checkToken, logoutUser);

export default logoutRouter