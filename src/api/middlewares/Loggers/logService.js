import Logger from '../../../loaders/logger';

const getDurationInMilliseconds = (start) => {
    const NS_PER_SEC = 1e9;
    const NS_TO_MS = 1e6;
    const diff = process.hrtime(start);

    return (diff[0] * NS_PER_SEC + diff[1]) / NS_TO_MS;
};

const logService = (req, res, next) => {
    const start = process.hrtime();
    Logger.info(`[STARTED] ${log}`);

    const { body, params, query } = req;
    let log =  `request: ${req.method} ${req.originalUrl}`;

    if (Object.keys(params).length) log += `, with params: ${JSON.stringify(params)}`;
    if (Object.keys(body).length) log += `, with body ${JSON.stringify(body)}`;
    if (Object.keys(query).length) log += `, with query ${JSON.stringify(query)}`;

    res.on('finish', () => {
        const durationInMilliseconds = getDurationInMilliseconds(start);
        Logger.info(`[FINISHED] ${durationInMilliseconds .toLocaleString()} ms ${log}`);
    });

    res.on('close', () => {
        const durationInMilliseconds = getDurationInMilliseconds(start);
        Logger.info(`[CLOSED] ${durationInMilliseconds .toLocaleString()} ms ${log}`);
    });

    next();
};

export default logService;
