import dotenv from "dotenv";
import process from "process";
import createServer from "./setup";
import logger from "./src/helpers/logger";

const app = createServer();
const port = process.env.PORT_BRAUM || 9444;

dotenv.config({ path: ".env"})

if (process.env.NODE_ENV !== "test") {
  app.listen(port, async () => {
    logger.info(`Braum is battling in port:${port}`);
  });
}

export default createServer
