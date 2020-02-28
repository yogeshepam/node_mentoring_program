import Logger from '../../../loaders/logger';

const getDurationInMilliseconds = (start) => {
    const NS_PER_SEC = 1e9;
    const NS_TO_MS = 1e6;
    const diff = process.hrtime(start);

    return (diff[0] * NS_PER_SEC + diff[1]) / NS_TO_MS;
};

const logExecutionTime = (req, res, next) => {
    const start = process.hrtime();
    const log =  `request: ${req.method} ${req.originalUrl}`;

    res.on('finish', () => {
        const durationInMilliseconds = getDurationInMilliseconds(start);
        Logger.info(`[FINISHED] ${log} ${durationInMilliseconds.toLocaleString()} ms`);
    });

    res.on('close', () => {
        const durationInMilliseconds = getDurationInMilliseconds(start);
        Logger.info(`[CLOSED] ${log} ${durationInMilliseconds.toLocaleString()} ms`);
    });

    next();
};

export default logExecutionTime;
