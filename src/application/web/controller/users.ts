import console from "console";
import { Request, Response } from "express";
import { omit } from "lodash";

import UserService from "../../../services/users";

class UserController {
  async create(req: Request, res: Response) {
    try {
      const userCreated = await UserService.create(req?.body);
      res.json(omit(userCreated.toJSON(), ["password", "refresh_token"]));
    } catch (erro) {
      res.status(400).json({
        message:
          "Data values is bad! Users already exist or username is up in up4tech, Try other username!",
        error: erro,
      });
    }
  }

  async createInvite(req: Request, res: Response) {
    try {
      const userCreated = await UserService.invite(req?.body);
      res.json({
        user: omit(userCreated.user.toJSON(), ["password", "refresh_token"]),
        password_raw: userCreated.password,
      });
    } catch (erro) {
      res.status(400).json({
        message:
          "Data values is bad! Users already exist or username is up in up4tech, Try other username!",
        error: erro,
      });
    }
  }

  async updateInfoUser(req: Request, res: Response) {
    try {
      res.json(await UserService.updateInfosUser(req.params?.id, req?.body));
    } catch (error) {
      console.log(error);
      res.status(400).json(error);
    }
  }

  async updateInfoLogin(req: Request, res: Response) {
    try {
      res.json(await UserService.updatePassword(req.params?.id, req?.body));
    } catch (error) {
      console.log(error);
      res.status(400).json(error);
    }
  }

  async delete(req: Request, res: Response) {
    const id = req.params.id;
    res.json(
      await UserService.delete({
        id,
      })
    );
  }
}

export default new UserController();
