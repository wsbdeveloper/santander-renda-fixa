"use strict";
// eslint-disable-next-line no-undef
const { Model, DataTypes } = require("sequelize");

// eslint-disable-next-line no-undef
const crypt = require("crypto");

// eslint-disable-next-line no-undef
module.exports = (sequelize) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {
      // define association here
    }

    getRefreshToken() {
      return this.refresh_token;
    }

    getId() {
      return this.id;
    }

    getUsername() {
      return this.username;
    }

    getName() {
      return this.name;
    }

    getEmail() {
      return this.email;
    }

    getPhone() {
      return this.phone;
    }

    getIsFirstAccess() {
      return this.isFirstAccess;
    }

    getRole() {
      return this.role;
    }

    getBussinesId() {
      return this.bussines_id;
    }
  }
  Users.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUIDV4,
        defaultValue: crypt.randomUUID(),
      },
      username: DataTypes.STRING,
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      refresh_token: DataTypes.STRING,
      phone: DataTypes.STRING,
      company: DataTypes.STRING,
      bussines_id: DataTypes.STRING,
      isFirstAccess: DataTypes.BOOLEAN,
      role: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Users",
    }
  );
  return Users;
};
