import jwt from 'jsonwebtoken';
import config from '../config';
import DB from '../models';
import Logger from '../loaders/logger';

const { User } = DB;

const generateToken = (user) => {
    const today = new Date();
    const exp = new Date(today);
    exp.setDate(today.getDate() + 60);

    Logger.silly(`Sign JWT for userId: ${user.id}`);

    return jwt.sign(
        {
            _id: user._id,
            username: user.login,
            exp: exp.getTime()
        },
        config.jwtSecret,
    );
};

const SignIn = async ({ username, password }) => {
    const user  = await User.findOne({
        raw: true,
        nest: true,
        where: { login: username }
    });

    if (!user) throw new Error(`User with id ${username} not found`);

    Logger.silly('Checking password');

    /**
     * use some lib to prevent 'timing based' attacks
     */
    if (user.password === password) {
        Logger.silly('Password is valid!');
        Logger.silly('Generating JWT');
        const token = generateToken(user);

        Reflect.deleteProperty(user, 'password');

        return { user, token };
    }
    throw new Error('Invalid Password');
};


/**
 * Function to authenticate and signIn the user.
 * @param {*} signInData signIn data received in request.
 * @param {*} callback callback function.
 */
export const signIn = async (signInData) => {
    try {
        const { user, token } = await SignIn(signInData);

        return { user, token };
    } catch (e) {
        throw e;
    }
};
