import * as authService from '../../services/auth.postgres';
import logController from '../../utils/logController';

const fileName = 'controller/auth.js';

/**
 * Function to authenticate and signIn the user.
 */
export const signIn = async (req, res, next) => {
    const { username, password } = req.body;

    try {
        const signInUser = await authService.signIn({ username, password });
        res.status(200).json(signInUser);
    } catch (error) {
        logController(`signIn in ${fileName}`, req.body, error);
        return next(error);
    }
};
