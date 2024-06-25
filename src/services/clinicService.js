import db from "../models/index";

const postClinicService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !data.name ||
        !data.descriptionHTML ||
        !data.descriptionMarkdown ||
        !data.image ||
        !data.address
      ) {
        resolve({ errCode: 1, message: "missing required parameter " });
      } else {
        await db.Clinic.create({
          ...data,
        });
        resolve({ errCode: 0, message: "success" });
      }
    } catch (error) {
      reject(error);
    }
  });
};
const getAllClinicService = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await db.Clinic.findAll();
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
const getClinicByIdService = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!id) {
        resolve({ errCode: 1, message: "missing required parameter" });
      } else {
        const res = await db.Clinic.findOne({
          where: { id },
          attributes: [
            "name",
            "address",
            "descriptionHTML",
            "descriptionMarkdown",
          ],
        });
        if (res) {
          const doctorClinic = await db.Doctor_infor.findAll({
            where: { clinicId: id },
            attributes: ["doctorId", "provinceId"],
          });
          res.doctorClinic = doctorClinic;
        }

        resolve({ errCode: 0, data: res });
      }
    } catch (error) {
      reject(error);
    }
  });
};
module.exports = {
  postClinicService,
  getAllClinicService,
  getClinicByIdService,
};
