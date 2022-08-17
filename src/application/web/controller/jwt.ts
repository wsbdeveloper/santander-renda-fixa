import console from "console";
import { Request } from "express";
import { sequelize } from "../../../infra/database/models";
import users from "../../../infra/database/models/users";

import JwtService from "../../../services/jwt";

class LoginController {
  async validateTokenUser(req: Request) {
    try {
      return await JwtService.validateAccessToken(
        req.headers?.authorization || ""
      );
    } catch (error) {
      throw new Error("Jwt error validate Token");
    }
  }

  async veirfyTokenUser(req: Request) {
    try {
      return await JwtService.isAuthenticated(req);
    } catch (error) {
      throw new Error("Jwt error validate Token");
    }
  }

  async refresh(req: Request) {
    const { refresh_token } = req.body;

    await JwtService.generateRefreshToken("wsbltx");
    
    try {
      const { sub } = await JwtService.validateRefreshToken(refresh_token);

      const findUser = await users(sequelize).findOne({
        where: { username: sub, refresh_token },
      });

      if (!findUser) {
        throw new Error(
          "User not valid! verify yout credentials or contact administrator"
        );
      }

      const tokens = {
        access_token: await JwtService.generateAccessToken(sub as string),
        refresh_token: await JwtService.generateRefreshToken(sub as string),
      };

      findUser.set({ refresh_token });
      findUser.save();

      return tokens;
    } catch (erro) {
      throw new Error(erro as string);
    }
  }

  async session(token: string) {
    if (!token) {
      throw new Error("Token is not valid!");
    }

    try {
      await JwtService.validateAccessToken(token);
      const decodedToken = await JwtService.decodeToken(token);
      const { roles } = decodedToken as any
      const user = await users(sequelize).findOne({
        where: { username: decodedToken?.sub },
      }); 
      
      console.log(user)

      if (!user) {
        throw new Error("Error session, user not valid!");
      }

      return {
        user: {
          username: user.getUsername(),
          email: user.getEmail(),
        },
        id: decodedToken?.sub,
        roles
      };
    } catch (error) {
      throw new Error(`ERRO: ${error}`);
    }
  }
}

export default new LoginController();
