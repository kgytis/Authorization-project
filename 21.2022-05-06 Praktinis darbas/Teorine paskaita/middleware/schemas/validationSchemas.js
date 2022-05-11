// Validation related imports
import Ajv from 'ajv';
import addFormats from 'ajv-formats';

// Ajv setup
const ajv = new Ajv({ allErrors: true, $data: true });
addFormats(ajv);

const registerUserSchema = {
    type: 'object',
    properties: {
        email: { type: 'string', format: 'email' },
        password: { type: 'string', minLength: 6 }, // pasiziureti, ar veikia tas pattern. Toks neveikia - regexp: { pattern: "/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/i" }
        passwordRepeat: { const: { $data: "1/password" } } // Referencing password as const in this case. Repeated password has to match password
    },
    required: ['email', 'password', 'passwordRepeat']
};

const loginUserSchema = {
    type: 'object',
    properties: {
        email: { type: 'string', format: 'email' },
        password: { type: 'string', minLength: 6 }, // pasiziureti, ar veikia tas pattern
    },
    required: ['email', 'password']
};

export { registerUserSchema, loginUserSchema }