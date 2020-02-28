import express from 'express';
import routes from '../api';
import config from '../config';
import { logRequestErrors } from '../api/middlewares';

export default ({ app }) => {
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
