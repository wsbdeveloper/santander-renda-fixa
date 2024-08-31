import cors from "cors";
import dotenv from "dotenv";
import express, { Request, Response } from "express";
import { customerRoutes, productRoutes } from "./src/application/routes/index";
import logger from "./src/application/utils/logger";

function createServer() { 
  const app = express();
  dotenv.config();
  
  app.use(function (req: Request, res: Response, next) {
    logger.info("Time:", Date.now());
    next();
  });

  app.use(express.json());
  app.setMaxListeners(1)
  app.use(cors())

  app.use('/api/customer', customerRoutes);
  app.use('/api/product', productRoutes);

  return app
}


export default createServer;