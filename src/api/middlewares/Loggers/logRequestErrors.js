import Logger from '../../../loaders/logger';

const logRequestErrors = (error, req, res, next) => {
    const {
        message = 'HTTP code 500 (Internal Server Error)',
        status = 500
    } = error;
    const { method, originalUrl } = req;

    Logger.error(`Request: ${method} ${originalUrl} failed with status: ${status} and message: ${message}`);

    res.status(status);
    res.json({ error, message });
};

export default logRequestErrors;
