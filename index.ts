import dotenv from "dotenv";
import process from "process";
import createServer from "./setup";

import logger from "./src/application/utils/logger";

const app = createServer();
const port = process.env.PORT_BRAUM || 9443;

dotenv.config({ path: ".env" }) 

if (process.env.NODE_ENV !== "test") {
  app.listen(port, async () => {
    logger.info(`renda fixa running in port:${port}`);
  });
}

export default createServer
