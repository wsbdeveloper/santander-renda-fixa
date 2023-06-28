import { sequelize } from "./../infra/database/models/index";
import Users from "./../infra/database/models/users";

import generator from "generate-password-ts";

import bcrypt from "bcrypt";

type User = {
  id?: string;
  username: string;
  name: string;
  password: string;
  email: string;
  bussines_id: string;
  phone: string;
  refresh_token: string;
  isFirstAccess: boolean;
  role: string;
};

type UserDeleteParams = {
  id: string;
};

class UsersService {
  async create(user: User) {
    try {
      const salt = await bcrypt.genSalt(10);

      //Hash generate
      const hash = await bcrypt.hash(user.password, salt);

      const verifyEmail = await Users(sequelize).findOne({
        where: { email: user.email },
      });

      const verifyUser = await Users(sequelize).findOne({
        where: { username: user.username },
      });

      const userFindByEmail = verifyEmail?.toJSON();
      const userFindByUsername = verifyUser?.toJSON();

      if (
        userFindByEmail?.email ||
        userFindByEmail?.username ||
        userFindByUsername?.email ||
        userFindByUsername?.username
      ) {
        throw Error("Email or Username already exists!");
      }

      if (userFindByEmail !== undefined || userFindByUsername !== undefined) {
        throw Error("User is up in up4tech, Try other data for your user.");
      }

      user.password = hash;

      user.isFirstAccess = true;

      return await Users(sequelize).create({ ...user });
    } catch (error) {
      throw new Error("Error creating users!" + error);
    }
  }

  async invite(user: User) {
    try {
      const salt = await bcrypt.genSalt(10);

      //Hash generate
      const password = generator.generate({
        length: 10,
        numbers: true,
      });

      const hash = await bcrypt.hash(password, salt);

      const verifyEmail = await Users(sequelize).findOne({
        where: { email: user.email },
      });

      const verifyUser = await Users(sequelize).findOne({
        where: { username: user.username },
      });

      const userFindByEmail = verifyEmail?.toJSON();
      const userFindByUsername = verifyUser?.toJSON();

      if (userFindByEmail?.email || userFindByEmail?.username) {
        throw Error("Email or Username already exists!");
      }

      if (userFindByEmail !== undefined || userFindByUsername !== undefined) {
        throw Error("User is up in up4tech, Try other data for your user.");
      }

      user.password = hash;
      user.isFirstAccess = true;
      user.username = user.email;
      // eslint-disable-next-line no-self-assign
      user.role = "consultant";

      const newUser = await Users(sequelize).create({ ...user });

      return {
        user: newUser,
        password: password,
      };
    } catch (error) {
      throw new Error("Error creating users!" + error);
    }
  }

  async userOne(user: User) {
    try {
      return await Users(sequelize).findOne({
        where: { id: user.id },
      });
    } catch (error) {
      throw new Error("Erro in find user!" + error);
    }
  }

  async updateInfosUser(id: string, user: User) {
    try {
      return await Users(sequelize).update(
        {
          name: user.name,
          email: user.email,
          username: user.username,
          phone: user.phone,
        },
        {
          where: { id },
        }
      );
    } catch (error) {
      throw new Error("Erro in find user!" + error);
    }
  }

  async updatePassword(id: string, user: User) {
    try {
      const salt = await bcrypt.genSalt(10);

      return await Users(sequelize).update(
        {
          name: user.name,
          email: user.email,
          username: user.username,
          phone: user.phone,
          password: await bcrypt.hash(user.password, salt),
          isFirstAccess: user.isFirstAccess,
        },
        {
          where: { id },
        }
      );
    } catch (error) {
      throw new Error("Erro in find user!" + error);
    }
  }

  async delete(user: UserDeleteParams) {
    try {
      return await Users(sequelize).destroy({ where: { id: user.id } });
    } catch (error) {
      throw new Error("Erro in find user!" + error);
    }
  }
}

export default new UsersService();
