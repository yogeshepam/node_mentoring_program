import { Router } from "express";
import _ from "lodash";
import { isValidSchema } from "../middlewares/";

const route = Router();

const userData = [];

export default app => {
  app.use("/users", route);

  /* ==
  get user by id;
  == * */
  route.get("/:id", (req, res) => {
    let user = _.find(userData, { id: req.params.id });

    if (user === undefined) {
      return res
        .status(404)
        .json({ message: `User with id ${req.params.id} not found` });
    } else {
      return res.json(user);
    }
  });

  /* ==
  create user;
  == * */
  route.post("/", isValidSchema(), (req, res) => {
    const user = req.body;
    console.log("user hit: ", user);

    const newUsers = [...userData, user];

    return res.json(newUsers).status(200);
  });

  /* ==
  update user;
  == * */
  route.patch("/patch", isValidSchema(), (req, res) => {
    const user = req.body;

    const newUsers = [...userData, user];

    return res.json(newUsers).status(200);
  });
};
