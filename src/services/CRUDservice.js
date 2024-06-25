import bcrypt from "bcryptjs";
const salt = bcrypt.genSaltSync(10);
import db from "../models/index";
const getAllUser = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await db.User.findAll({ raw: true });
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
};
const getUserById = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (userId) {
        const result = await db.User.findOne({
          where: { id: userId },
          raw: true,
        });
        resolve(result);
      } else {
        resolve({});
      }
    } catch (error) {
      reject(error);
    }
  });
};
const updateUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log(data);

      await db.User.update(
        {
          email: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
        },
        { where: { id: data.id } }
      );
      resolve("success");
    } catch (error) {
      reject(error);
    }
  });
};
const createNewUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const hashPassword = await hashUserPassWord(data.password);
      const result = await db.User.create({
        email: data.email,
        password: hashPassword,
        firstName: data.firstName,
        lastName: data.lastName,
        address: data.address,
        phoneNumber: data.phoneNumber,
        gender: data.gender === "1" ? true : false,
        roleId: data.roleId,
      });
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};

const hashUserPassWord = (password) => {
  return new Promise((resolve, reject) => {
    try {
      const hashPassword = bcrypt.hashSync(password, salt);
      resolve(hashPassword);
    } catch (error) {
      reject(error);
    }
  });
};
module.exports = { createNewUser, getAllUser, getUserById, updateUser };
