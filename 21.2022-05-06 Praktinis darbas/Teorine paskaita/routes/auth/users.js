import express from 'express'; // main backend package for routes

// Controller imports
import getAllUsers from '../../controllers/auth/users.js'
// Middleware imports
import checkToken from '../../middleware/checkToken.js';

const usersRouter = express.Router();

usersRouter.get('/', checkToken, getAllUsers);


export default usersRouter