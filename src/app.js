import express from "express";
import Loaders from "./loaders";
import Logger from "./loaders/logger";
import config from "./config";

const startServer = async () => {
  const app = express();

  await Loaders({ expressApp: app });

  app.listen(config.port, err => {
    if (err) {
      Logger.error(err);
      process.exit(1);
      return;
    }
    Logger.info(`
      ################################################
      🛡️  Server listening on port: ${config.port} 🛡️ 
      ################################################
    `);
  });
};

startServer();

