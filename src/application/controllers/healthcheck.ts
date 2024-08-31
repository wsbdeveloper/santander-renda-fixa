import { Request, Response } from "express";

class HealthCheck {
    async health(req: Request, res: Response) {
        res.status(200).send({ "isOk": "uptime"})
    }
}

export default HealthCheck;