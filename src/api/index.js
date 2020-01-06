import { Router } from "express";
import user from "./routes/user";

export default () => {
  const app = Router();

  app.get("/", (req, res) => {
    res.json({ ok: true });
  });

  user(app);

  return app;
};
