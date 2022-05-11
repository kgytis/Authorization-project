// Validation related imports
import Ajv from 'ajv';
import addFormats from 'ajv-formats';

import { registerUserSchema } from './schemas/validationSchemas.js'
// Ajv setup
const ajv = new Ajv({ allErrors: true, $data: true });
addFormats(ajv);

const registerValidation = async (req, res, next) => {
    try {
        if (req.body) {
            const validate = ajv.compile(registerUserSchema);
            const data = {
                email: req.body.email,
                password: req.body.password,
                passwordRepeat: req.body.passwordRepeat
            };
            const valid = validate(data);
            if (!valid)
                return res.status(400).send({ msg: validate.errors }); // Sitoje vietoje dar galima tobulinti siunciant skirtingus error skirtingiems atvejams
        };
    } catch (err) {
        return res.status(400).send({ msg: err });
    };
    next();
};

export default registerValidation