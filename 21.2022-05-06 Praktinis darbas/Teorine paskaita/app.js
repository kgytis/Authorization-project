import 'dotenv/config';
import express from 'express'; // main backend package
import cors from 'cors'; // security package
import cookieParser from 'cookie-parser'; // For token transferring


import { engine } from 'express-handlebars';
import path from 'path';

// Routes imports
// Routes related to auth.
import loginRouter from './routes/auth/login.js';
import registerRouter from './routes/auth/register.js';
import logoutRouter from './routes/auth/logout.js';
import usersRouter from './routes/auth/users.js'

// Routes related to UI
import userTutorialsRouter from './routes/ui/user_tutorials.js';
import tutorialsRouter from './routes/ui/tutorials.js'


const app = express();
const port = process.env.PORT || 8000;

const corsOptions = {
    origin: `http://localhost:${port}`,
    optionSucessStatus: 200
};

app.use(express.static(path.resolve('public')));
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// HandleBar connection

app.engine('hbs', engine({
    defaultLayout: 'main',
    extname: '.hbs'
}));

app.set('view engine', 'hbs');
app.set('views', './views');

// Routes usage
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);
app.use('/register', registerRouter);
app.use('/tutorials', tutorialsRouter);
app.use('/user-tutorials', userTutorialsRouter);
app.use('/users', usersRouter);

app.listen(port, () => {
    console.log(`Server is running on PORT http://localhost:${port}`)
});