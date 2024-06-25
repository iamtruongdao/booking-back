import db from "../models/index";
import * as _ from "lodash";
import { sendRemedy } from "./sendmail";
require("dotenv").config();
const getTopDoctorService = (limitInput) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.User.findAll({
        limit: limitInput,
        where: { roleId: "R2" },
        order: [["createdAt", "DESC"]],
        attributes: { exclude: ["password"] },
        include: [
          {
            model: db.Allcode,
            as: "positionData",
            attributes: ["valueEN", "valueVI"],
          },
          {
            model: db.Allcode,
            as: "genderData",
            attributes: ["valueEN", "valueVI"],
          },
        ],
        raw: true,
        nest: true,
      });
      resolve({ errCode: 0, data: data });
    } catch (error) {
      reject(error);
    }
  });
};
const getAllDoctorsService = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.User.findAll({
        where: { roleId: "R2" },
        attributes: { exclude: ["password", "image"] },
      });
      if (data) {
        resolve({ errCode: 0, data });
      }
    } catch (error) {
      reject(error);
    }
  });
};
const saveDetailDoctorService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !data.id ||
        !data.contentMarkdown ||
        !data.contentHTML ||
        !data.action ||
        !data.priceId ||
        !data.paymentId ||
        !data.provinceId ||
        !data.note ||
        !data.nameClinic ||
        !data.addressClinic ||
        !data.clinicId ||
        !data.specialtyId
      ) {
        resolve({ errCode: 1, message: "missing parameter" });
      } else {
        console.log(data.action);
        if (data.action === "ADD") {
          await db.Markdown.create({
            contentMarkdown: data.contentMarkdown,
            contentHTML: data.contentHTML,
            description: data.description,
            doctorId: data.id,
          });
        } else {
          console.log("hehe");

          let res = await db.Markdown.findOne({
            where: { doctorId: data.id },
            raw: false,
          });
          console.log(res);
          if (res) {
            res.contentMarkdown = data.contentMarkdown;
            res.contentHTML = data.contentHTML;
            res.description = data.description;
            res.updatedAt = new Date();
            await res.save();
          }
        }
        const doctorInfor = await db.Doctor_infor.findOne({
          where: { doctorId: data.id },
          raw: false,
        });
        if (doctorInfor) {
          doctorInfor.doctorId = data.id;
          doctorInfor.paymentId = data.paymentId;
          doctorInfor.provinceId = data.provinceId;
          doctorInfor.priceId = data.priceId;
          doctorInfor.note = data.note;
          doctorInfor.addressClinic = data.addressClinic;
          doctorInfor.nameClinic = data.nameClinic;
          doctorInfor.clinicId = data.clinicId;
          doctorInfor.specialtyId = data.specialtyId;
          await doctorInfor.save();
        } else {
          await db.Doctor_infor.create({
            doctorId: data.id,
            paymentId: data.paymentId,
            provinceId: data.provinceId,
            priceId: data.priceId,
            note: data.note,
            addressClinic: data.addressClinic,
            nameClinic: data.nameClinic,
            clinicId: data.clinicId,
            specialtyId: data.specialtyId,
          });
        }
        resolve({ errCode: 0, message: "success" });
      }
    } catch (error) {
      reject(error);
    }
  });
};
const getDetailDoctorByIdService = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.User.findOne({
        where: { id: id },
        attributes: { exclude: ["password"] },
        include: [
          {
            model: db.Markdown,
            attributes: ["contentHTML", "contentMarkdown", "description"],
          },
          {
            model: db.Allcode,
            as: "positionData",
            attributes: ["valueVI", "valueEN"],
          },
          {
            model: db.Doctor_infor,
            attributes: {
              exclude: ["id", "doctorId"],
            },
            include: [
              {
                model: db.Allcode,
                as: "priceTypeData",
                attributes: ["valueEN", "valueVI"],
              },
              {
                model: db.Allcode,
                as: "provinceTypeData",
                attributes: ["valueEN", "valueVI"],
              },
              {
                model: db.Allcode,
                as: "paymentTypeData",
                attributes: ["valueEN", "valueVI"],
              },
            ],
          },
        ],
        raw: true,
        nest: true,
      });
      if (data.image) {
        data.image = new Buffer.from(data.image, "base64").toString("binary");
      }
      resolve({ errCode: 0, data: data });
    } catch (error) {
      reject(error);
    }
  });
};
const getAllScheduleDoctorsService = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Allcode.findAll({
        where: { type: "TIME" },
      });
      if (data) {
        resolve({ errCode: 0, data });
      }
    } catch (error) {
      reject(error);
    }
  });
};
const saveAllScheduleService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.arrSchedule || !data.doctorId || !data.formattedDate) {
        resolve({ errCode: -1, message: "missing parammater" });
      } else {
        let schedule = data.arrSchedule;
        schedule = schedule.map((item) => {
          item.maxNumber = process.env.MAX_NUMBER_SCHEDULE;
          return item;
        });
        let existing = await db.Schedule.findAll({
          where: { doctorId: data.doctorId, date: data.formattedDate },
          attributes: ["timeType", "doctorId", "date", "maxNumber"],
        });
        if (existing) {
          existing = existing.map((item) => {
            item.date = Number(item.date);
            return item;
          });
          console.log(existing, "/n", schedule);
          const toCreate = _.differenceWith(schedule, existing, (a, b) => {
            return a.timeType === b.timeType && a.date === b.date;
          });
          await db.Schedule.bulkCreate(toCreate);
          resolve({ errCode: 0, message: "success" });
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};
const getScheduleByDateService = (doctorId, date) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!doctorId || !date) {
        resolve({ errCode: 1, message: "missing required parameter" });
      } else {
        const res = await db.Schedule.findAll({
          where: {
            doctorId,
            date,
          },
          include: [
            {
              model: db.Allcode,
              as: "timeTypeData",
              attributes: ["valueEN", "valueVI"],
            },
            {
              model: db.User,
              as: "doctorData",
              attributes: ["firstName", "lastName"],
            },
          ],
          nest: true,
          raw: false,
        });
        resolve({ errCode: 0, data: res });
      }
    } catch (error) {
      reject(error);
    }
  });
};
const getExtraDoctorInforByIdService = (doctorId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!doctorId) {
        resolve({ errCode: 1, message: "missing required parameter" });
      } else {
        const res = await db.Doctor_infor.findOne({
          where: {
            doctorId,
          },
          include: [
            {
              model: db.Allcode,
              as: "priceTypeData",
              attributes: ["valueEN", "valueVI"],
            },
            {
              model: db.Allcode,
              as: "paymentTypeData",
              attributes: ["valueEN", "valueVI"],
            },
          ],
          nest: true,
          raw: false,
        });
        resolve({ errCode: 0, data: res });
      }
    } catch (error) {
      reject(error);
    }
  });
};
const getProfileDoctorByIdService = (doctorId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.User.findOne({
        where: { id: doctorId },
        attributes: { exclude: ["password"] },
        include: [
          {
            model: db.Markdown,
            attributes: ["contentHTML", "contentMarkdown", "description"],
          },
          {
            model: db.Allcode,
            as: "positionData",
            attributes: ["valueVI", "valueEN"],
          },
          {
            model: db.Doctor_infor,
            attributes: {
              exclude: ["id", "doctorId"],
            },
            include: [
              {
                model: db.Allcode,
                as: "priceTypeData",
                attributes: ["valueEN", "valueVI"],
              },
              {
                model: db.Allcode,
                as: "provinceTypeData",
                attributes: ["valueEN", "valueVI"],
              },
              {
                model: db.Allcode,
                as: "paymentTypeData",
                attributes: ["valueEN", "valueVI"],
              },
            ],
          },
        ],
        raw: true,
        nest: true,
      });
      if (data.image) {
        data.image = new Buffer.from(data.image, "base64").toString("binary");
      }
      resolve({ errCode: 0, data: data });
    } catch (error) {
      reject(error);
    }
  });
};
const getListPatientForDoctorService = (id, date) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!id || !date) {
        resolve({ errCode: 1, message: "missing required parameter" });
      } else {
        let data = await db.Booking.findAll({
          where: { doctorId: id, statusId: "S2", date },
          include: [
            {
              model: db.User,
              as: "patientData",
              attributes: ["firstName", "address", "gender", "email"],
              include: [
                {
                  model: db.Allcode,
                  as: "genderData",
                  attributes: ["valueVI", "valueEN"],
                },
              ],
            },
            {
              model: db.Allcode,
              as: "patientDoctorData",
              attributes: ["valueVI", "valueEN"],
            },
          ],
          raw: false,
          nest: true,
        });
        resolve({ errCode: 0, data });
      }
    } catch (error) {
      reject(error);
    }
  });
};
const postRemedyService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data) {
        resolve({ errCode: 1, message: "missing required parameter" });
      } else {
        let res = await db.Booking.findOne({
          where: {
            doctorId: data.doctorId,
            statusId: "S2",
            timeType: data.timeType,
            patientId: data.patientId,
          },
          raw: false,
        });
        if (res) {
          res.statusId = "S3";
          await res.save();
        }
        await sendRemedy(data, data.language);

        resolve({ errCode: 0, message: "ok" });
      }
    } catch (error) {
      reject(error);
    }
  });
};
module.exports = {
  getTopDoctorService,
  getAllDoctorsService,
  saveDetailDoctorService,
  getDetailDoctorByIdService,
  getAllScheduleDoctorsService,
  saveAllScheduleService,
  getScheduleByDateService,
  getExtraDoctorInforByIdService,
  getProfileDoctorByIdService,
  getListPatientForDoctorService,
  postRemedyService,
};
