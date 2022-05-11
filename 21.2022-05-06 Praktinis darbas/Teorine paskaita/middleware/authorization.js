import jwt from 'jsonwebtoken';

const authorization = async (req, res, next) => {
    const token = req.cookies.accessToken;
    if (!token) {
        return next();
    } try {
        jwt.verify(token, process.env.JWTSECRET, (err, result) => {
            if (err) return res.status(400).send({ err: 'Access denied' });
            req.userID = result.id;
            req.email = result.email;
            next();
        });
    } catch {
        res.status(403).send({ msg: 'Access denied' });
    };
};

export default authorization