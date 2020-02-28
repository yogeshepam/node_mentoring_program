import Logger from '../../../loaders/logger';

const logService = (req, res, next) => {
    const { body, params, query } = req;
    let log =  `invoked: ${req.method} ${req.originalUrl}`;

    Logger.info(`[STARTED] ${log}`);
    if (Object.keys(params).length) log += `, with params: ${JSON.stringify(params)}`;
    if (Object.keys(body).length) log += `, with body ${JSON.stringify(body)}`;
    if (Object.keys(query).length) log += `, with query ${JSON.stringify(query)}`;

    next();
};

export default logService;
