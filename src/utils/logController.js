import Logger from '../loaders/logger';

export default (method, arg, error) => {
    Logger.error(
        `Method: ${method}, called with ${JSON.stringify(arg)},\n 🔥 error: ${JSON.stringify(error)}`);
};
