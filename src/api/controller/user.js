import * as userService from "../service/user";

/**
 * Function to create the user.
 */
export const create = (req, res, next) => {
  const { body } = req;

  userService.createUser(body, function({ error, users }) {
    return res.json(users).status(200);
  });
};

/**
 * Function to find the user.
 */
export const find = (req, res, next) => {
  const {
    params: { id }
  } = req;

  id
    ? userService.findUser(id, function({ error, user }) {
        if (user === undefined) {
          return res
            .status(404)
            .json({ message: `User with id ${req.params.id} not found` });
        } else {
          return res.json(user);
        }
      })
    : userService.findUsers(function({ error, users }) {
        return res.json(users);
      });
};

/**
 * Function to update the user data  by their ID.
 */
export const update = (req, res) => {
  const { body } = req;

  userService.updateUserById(body.id, body, (err, response) => {
    return res.status(200).send(response);
  });
};

/**
 * Function to delete the user from collection.
 */
export const remove = (req, res) => {
  const {
    params: { id }
  } = req;

  userService.deleteUserById(id, (error, response) => {});
};

/**
 * Function to get auto-suggest list from limitusers.
 */
export const autoSuggest = (req, res) => {
  const { body } = req;
  const limit = 1;
  userService.getAutoSuggestUsers(body.login, limit, (error, users) => {
    return res.status(200).send(users);
  });
};
