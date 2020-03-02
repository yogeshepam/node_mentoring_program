import jwt from 'jsonwebtoken';
import config from '../../config';

/**
 * JWT in a header/query parameter ?apiKey=${JWT}
 * Authorization: Bearer ${JWT}
 */
const getTokenFromHeader = req => {
    const {
        headers: { authorization }
    } = req;
    if (
        (authorization && authorization.split(' ')[0] === 'Token') ||
        (authorization && authorization.split(' ')[0] === 'Bearer')
    ) {
        return authorization.split(' ')[1];
    }
    return null;
};

const isAuth = async (req, res, next) => {
    /**
     * Authenticate all routes except signin
     * */
    if (['/api/auth/signin', '/api/auth/signin/'].includes(req.path)) return next();

    const token = await getTokenFromHeader(req);
    if (token) {
        jwt.verify(token, config.jwtSecret, (err, user) => {
            if (err) return res.sendStatus(403);
            req.user = user;
            next();
        });
    } else {
        return res.sendStatus(401).json({
            message: 'Unauthorized error'
        });
    }
};

export default isAuth;
