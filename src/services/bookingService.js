import db from "../models/index";
import { sendMailSimple, sendRemedy } from "./sendmail";
import { v4 as uuidv4 } from "uuid";
require("dotenv").config();
const postBookingAppointmentService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !data.email ||
        !data.doctorId ||
        !data.timeType ||
        !data.date ||
        !data.fullname ||
        !data.address
      ) {
        resolve({ errCode: 1, message: "missing required parameter" });
      } else {
        const token = uuidv4();
        await sendMailSimple({
          emailSend: data.email,
          patientName: data.fullname,
          doctorName: data.doctorName,
          redirectLink: `${process.env.URL_REACT}/verify-email?token=${token}&doctorId=${data.doctorId}`,
          time: data.timeString,
          language: data.language,
        });
        const [user, created] = await db.User.findOrCreate({
          where: { email: data.email },
          defaults: {
            email: data.email,
            roleId: "R3",
            firstName: data.fullname,
            gender: data.gender,
            address: data.address,
          },
        });
        await db.Booking.findOrCreate({
          where: {
            patientId: user.id,
          },
          defaults: {
            statusId: "S1",
            doctorId: data.doctorId,
            date: data.date,
            patientId: user.id,
            timeType: data.timeType,
            token,
          },
        });
        resolve({ errCode: 0, message: "success" });
      }
    } catch (error) {
      reject(error);
    }
  });
};
const postVerifyEmailBookingService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.doctorId || !data.token) {
        resolve({ errCode: 1, message: "missing required parameter" });
      } else {
        const res = await db.Booking.findOne({
          where: { doctorId: data.doctorId, token: data.token, statusId: "S1" },
          raw: false,
        });
        if (res) {
          res.statusId = "S2";
          await res.save();
          resolve({ errCode: 0, message: "confirm booking success" });
        } else {
          resolve({ errCode: 2, message: "oops booking is no book" });
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};
module.exports = {
  postBookingAppointmentService,
  postVerifyEmailBookingService,
};
