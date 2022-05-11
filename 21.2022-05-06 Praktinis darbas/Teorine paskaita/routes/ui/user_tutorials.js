import express from 'express'; // main backend package for routes

// Controller imports
import { getUserTutorials } from '../../controllers/tutorialsUI/user_tutorials.js';
// Middleware imports
import checkToken from '../../middleware/checkToken.js'

const userTutorialsRouter = express.Router();

userTutorialsRouter.get('/', checkToken, getUserTutorials)

export default userTutorialsRouter