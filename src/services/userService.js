import db from "../models/index";
import bcrypt from "bcryptjs";
const salt = bcrypt.genSaltSync(10);
const handleUserLogin = (email, password) => {
  return new Promise(async (resolve, reject) => {
    const userData = {};
    try {
      const isExist = await checkUserEmail(email);
      if (isExist) {
        let user = await db.User.findOne({
          attributes: [
            "email",
            "roleId",
            "password",
            "firstName",
            "lastName",
            "id",
          ],
          where: { email: email },
          raw: true,
        });
        if (user) {
          let check = await bcrypt.compareSync(password, user.password);
          if (check) {
            delete user.password;
            userData.errCode = 0;
            userData.message = "OK";
            userData.user = user;
          } else {
            userData.errCode = 3;
            userData.errMessage = "Error password";
          }
        } else {
          userData.errCode = 2;
          userData.errMessage = "User not found";
        }
      } else {
        userData.errCode = 1;
        userData.errMessage = "email khong ton tai";
      }
      resolve(userData);
    } catch (error) {
      reject(error);
    }
  });
};

const checkUserEmail = (userEmail) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { email: userEmail },
        raw: true,
      });
      if (user) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (error) {
      reject(error);
    }
  });
};
const getAllUsers = (id) => {
  return new Promise(async (resolve, reject) => {
    let users = "";
    try {
      if (id === "ALL") {
        users = await db.User.findAll({
          attributes: {
            exclude: ["password"],
          },
        });
      }
      if (id && id !== "ALL") {
        users = await db.User.findOne({
          where: { id: id },
          attributes: {
            exclude: ["password"],
          },
        });
      }
      resolve(users);
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
const createNewUser = (data) => {
  console.log(data);

  return new Promise(async (resolve, reject) => {
    try {
      let check = await checkUserEmail(data.email);
      if (check) {
        resolve({ errCode: 1, message: "Email is Existing" });
      } else {
        const hashPassword = await hashUserPassWord(data.password);
        db.User.create({
          email: data.email,
          password: hashPassword,
          firstName: data.firstName,
          lastName: data.lastName,
          address: data.address,
          phoneNumber: data.phoneNumber,
          gender: data.gender,
          roleId: data.role,
          positionId: data.position,
          image: data.avatar || "",
        });
        resolve({ errCode: 0, message: "OK" });
      }
    } catch (error) {
      reject(error);
    }
  });
};
const deleteUser = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await db.User.findOne({ where: { id: id }, raw: false });
      if (!user) {
        resolve({ errCode: 2, message: "user is exist" });
      }
      await user.destroy();
      resolve({ errCode: 0, message: "success" });
    } catch (error) {
      reject(error);
    }
  });
};
const updateUserData = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id || !data.role || !data.position || !data.gender) {
        resolve({ errCode: 2, message: "missing require parameter" });
      } else {
        const user = await db.User.findOne({
          where: { id: data.id },
          raw: false,
        });
        if (user) {
          user.firstName = data.firstName;
          user.lastName = data.lastName;
          user.address = data.address;
          user.gender = data.gender;
          user.roleId = data.role;
          user.phoneNumber = data.phoneNumber;
          user.positionId = data.position;
          await user.save();
          resolve({ errCode: 0, message: "success" });
        } else {
          resolve({ errCode: 3, message: "user is not exist" });
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};
const getAllCodeService = (typeInput) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!typeInput) {
        resolve({ errCode: 1, errMessage: "missing parameter" });
      } else {
        const res = {};
        let allcode = await db.Allcode.findAll({
          where: { type: typeInput },
        });
        res.errCode = 0;
        res.message = "Success";
        res.data = allcode;
        resolve(res);
      }
    } catch (error) {
      reject(error);
    }
  });
};
module.exports = {
  handleUserLogin,
  createNewUser,
  getAllUsers,
  deleteUser,
  updateUserData,
  getAllCodeService,
};
