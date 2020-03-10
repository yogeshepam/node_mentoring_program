import Joi from 'joi';
import _ from 'lodash';
import Schemas from '../schemas';

const isValidSchema = () => (req, res, next) => {
    // enabled HTTP methods for request data validation
    const _supportedMethods = ['patch', 'post', 'put'];

    // Joi validation options
    const _validationOptions = {
        abortEarly: false, // abort after the last validation error
        allowUnknown: true, // allow unknown keys that will be ignored
        stripUnknown: true // remove unknown keys from the validated data
    };

    const {
        baseUrl,
        body,
        method,
        route: { path }
    } = req;

    const matchPath = `${baseUrl}${path}`;

    if (_.includes(_supportedMethods, method.toLowerCase()) && _.has(Schemas, matchPath)) {
        // get schema for the current route path
        const _schema = _.get(Schemas, matchPath);
        if (_schema) {
            // Validate req.body using the schema and validation options
            const { error } = Joi.validate(body, _schema, _validationOptions);

            if (error) {
                // Joi Error
                const JoiError = {
                    message: 'Schema is not valid',
                    status: 422,
                    error: {
                        original: error._object,

                        // fetch only message and type from each error
                        details: _.map(error.details, ({ message, type }) => ({
                            message: message.replace(/['"]/g, ''),
                            type
                        }))
                    }
                };

                return next(JoiError);
            }
            return next();
        }
    }
};

export default isValidSchema;
