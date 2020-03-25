import winston from 'winston';
import path from 'path';
import config from '../config';

const transports = [];
const { format, config: config1, createLogger, transports: transports1 } = winston;
const envio = process.env.NODE_ENV;

if (envio !== 'development') {
    transports.push(
        new transports1.Console()
    );
} else {
    transports.push(
        new transports1.Console({
            format: format.combine(
                format.cli(),
                format.splat(),
                format.colorize(),
                format.printf(info => `${info.timestamp} ${info.level} [${info.label}]: ${info.message}`)
            )
        })
    );
}

const LoggerInstance = createLogger({
    level: config.logs.level,
    levels: config1.npm.levels,
    format: format.combine(
        format.label({ label: path.basename(envio === 'test' ? 'test' : process.mainModule.filename) }),
        format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        format.errors({ stack: true }),
        format.splat(),
        format.json()
    ),
    transports
});

export default LoggerInstance;
