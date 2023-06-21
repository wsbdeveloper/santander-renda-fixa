import Express, { Request, Response } from "express";

import UserController from "../../application/web/controller/users";

const router = Express.Router();

router.post("/", (req: Request, res: Response) => {
  UserController.create(req, res);
});

router.post("/invite", (req: Request, res: Response) => {
  UserController.createInvite(req, res);
});

router.patch("/:id", async (req: Request, res: Response) => {
  UserController.updateInfoUser(req, res);
});

router.patch("/access/:id", async (req: Request, res: Response) => {
  UserController.updateInfoLogin(req, res);
});

router.delete("/:id", async (req: Request, res: Response) => {
  UserController.delete(req, res);
});

export default router;
