import express from 'express';
import routes from '../api';
import config from '../config';
import { isAuth, logRequestErrors } from '../api/middlewares';

export default ({ app }) => {
    /**
     * Authenticate all routes except signin
     * */
    app.all('*', isAuth);

    /**
     * Health Check endpoints
     */
    app.get('/status', (req, res) => {
        res.status(200).end();
    });
    app.head('/status', (req, res) => {
        res.status(200).end();
    });

    // Middleware that transforms the raw string of req.body into json
    app.use(express.json());

    // load API routes
    app.use(config.api.prefix, routes());

    // catch 404 and forward to error handler
    app.use((req, res, next) => {
        const err = {
            message: 'Requested URL not found',
            status: 404
        };

        next(err);
    });

    // error handlers
    app.use((err, req, res, next) => {
        /**
         * Handle 401 thrown by express-jwt library
         */
        if (err.name === 'UnauthorizedError') {
            return res
                .status(err.status)
                .send({ message: err.message })
                .end();
        }
        return next(err);
    });

    // log all handled/unhandled errors
    app.use(logRequestErrors);
};
