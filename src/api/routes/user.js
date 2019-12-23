import { Router } from "express";
import _ from "lodash";
const route = Router();

const userData = [];

export default app => {
  app.use("/users", route);
  route.get("/:id", (req, res) => {
    let user = _.find(userData, { id: req.params.id });

    if (user === undefined) {
      return res
        .status(404)
        .json({ message: `Employee with id ${req.params.id} not found` });
    } else {
      return res.json(user);
    }
  });
};
