import db from "../models/index";

const postSpecialtyService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !data.name ||
        !data.descriptionHTML ||
        !data.descriptionMarkdown ||
        !data.image
      ) {
        resolve({ errCode: 1, message: "missing required parameter " });
      } else {
        await db.Specialty.create({
          ...data,
        });
        resolve({ errCode: 0, message: "success" });
      }
    } catch (error) {
      reject(error);
    }
  });
};
const getSpecialtyService = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await db.Specialty.findAll();
      res.map((item) => {
        if (item.image) {
          item.image = new Buffer.from(item.image, "base64").toString("binary");
        }
        return item;
      });
      resolve({ errCode: 0, data: res });
    } catch (error) {
      reject(error);
    }
  });
};
const getSpecialtyByIdService = (id, location) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!id) {
        resolve({ errCode: 1, message: "missing required parameter" });
      } else {
        if (location === "ALL") {
          const res = await db.Specialty.findOne({
            where: { id },
            attributes: ["descriptionHTML", "descriptionMarkdown"],
          });
          if (res) {
            const doctorSpecialty = await db.Doctor_infor.findAll({
              where: { specialtyId: id },
              attributes: ["doctorId", "provinceId"],
            });
            res.doctorSpecialty = doctorSpecialty;
          }
          resolve({ errCode: 0, data: res });
        } else {
          const res = await db.Specialty.findOne({
            where: { id },
            attributes: ["descriptionHTML", "descriptionMarkdown"],
          });
          if (res) {
            const doctorSpecialty = await db.Doctor_infor.findAll({
              where: { specialtyId: id, provinceId: location },
              attributes: ["doctorId", "provinceId"],
            });
            res.doctorSpecialty = doctorSpecialty;
          }
          resolve({ errCode: 0, data: res });
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  postSpecialtyService,
  getSpecialtyService,
  getSpecialtyByIdService,
};
