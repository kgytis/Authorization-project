// Validation related imports
import Ajv from 'ajv';
import addFormats from 'ajv-formats';

import { loginUserSchema } from './schemas/validationSchemas.js'
// Ajv setup
const ajv = new Ajv({ allErrors: true });
addFormats(ajv);

const loginValid = async (req, res, next) => {
    try {
        if (req.body) {
            const validate = ajv.compile(loginUserSchema);
            const data = {
                email: req.body.email,
                password: req.body.password,
            };
            const valid = validate(data);
            if (!valid)
                return res.status(400).send(validate.errors);
        };
    } catch (error) {
        return res.status(400).send('Incorrect email or password.');
    };
    next();
};

export default loginValid