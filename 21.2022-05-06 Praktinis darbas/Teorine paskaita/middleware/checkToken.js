import jwt from 'jsonwebtoken';

const checkToken = async (req, res, next) => {
    const token = req.cookies.accessToken;
    if (!token) {
        return res.status(403).redirect('/login');
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

export default checkToken

