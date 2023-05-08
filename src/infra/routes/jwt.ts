import Express, { Request, Response } from "express";

import JwtController from "../../application/web/controller/jwt";
import { getTokenFromHeaders } from "../../helpers/getHeaderToken";
const router = Express.Router();

router.post("/refresh", (req: Request, res: Response) => {
  JwtController.refresh(req).then(data => { 
    res.json({
      data
    })
  }).catch((err) => {
    res.status(400).json({
      error: 400,
      message: "Check your credentials and try again!",
      exception: err
    });
  })
});

router.get("/session", (req: Request, res: Response) => {
  const token = getTokenFromHeaders(req);
  
  JwtController.getSession(token)
    .then((data) => {
      res.json({
        data,
      });
    })
    .catch((err) => {
      res.status(400).json({
        error: 400,
        message: "Check your credentials and try again!",
        exception: err,
      });
    });
});

export default router;