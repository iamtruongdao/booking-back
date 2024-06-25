import express from "express";
import {
  getHomePage,
  createUser,
  getCrud,
  getUpdateUser,
  postUpdateUser,
} from "../controllers/homeController";
import {
  handleLogin,
  handleGetAllUsers,
  handleCreateNewUser,
  handleEditUser,
  handleDeleteUser,
  getAllCode,
} from "../controllers/userController";
import {
  getTopDoctor,
  getAllDoctors,
  saveDetailDoctor,
  getDetailDoctorById,
  getAllSchedule,
  saveAllSchedule,
  getScheduleByDate,
  getExtraDoctorInforById,
  getProfileDoctorById,
  getListPatientForDoctor,
  postRemedy,
} from "../controllers/doctorController";
import {
  postBookingAppointment,
  postVerifyEmailBooking,
} from "../controllers/bookingController";
import {
  postSpecialty,
  getSpecialty,
  getSpecialtyById,
} from "../controllers/specialtyController";
import {
  postClinic,
  getAllClinic,
  getClinicById,
} from "../controllers/clinicController";
const router = express.Router();
const initRoute = (app) => {
  router.get("/", getHomePage);
  router.get("/crud", getCrud);
  router.post("/post-crud", createUser);
  router.get("/update", getUpdateUser);
  router.post("/update-crud", postUpdateUser);
  router.post("/api/login", handleLogin);
  router.get("/api/get-all-user", handleGetAllUsers);
  router.post("/api/create-new-user", handleCreateNewUser);
  router.put("/api/edit-user", handleEditUser);
  router.delete("/api/delete-user", handleDeleteUser);
  router.get("/api/allcode", getAllCode);
  router.get("/api/get-top-doctor", getTopDoctor);
  router.get("/api/get-all-doctors", getAllDoctors);
  router.post("/api/save-detail-doctor", saveDetailDoctor);
  router.get("/api/get-detail-doctor-by-id", getDetailDoctorById);
  router.get("/api/get-all-schedule-doctor", getAllSchedule);
  router.post("/api/save-all-schedule-doctor", saveAllSchedule);
  router.get("/api/get-schedule-doctor-by-date", getScheduleByDate);
  router.get("/api/get-extra-infor-doctor-by-id", getExtraDoctorInforById);
  router.get("/api/get-profile-doctor-by-id", getProfileDoctorById);
  router.get("/api/get-list-patient-for-doctor", getListPatientForDoctor);
  router.post("/api/post-remedy", postRemedy);
  router.post("/api/post-booking-appointment", postBookingAppointment);
  router.post("/api/verify-email", postVerifyEmailBooking);
  router.post("/api/create-new-specialty", postSpecialty);
  router.get("/api/get-all-specialty", getSpecialty);
  router.get("/api/get-specialty-by-id", getSpecialtyById);
  router.post("/api/create-new-clinic", postClinic);
  router.get("/api/get-all-clinic", getAllClinic);
  router.get("/api/get-clinic-by-id", getClinicById);

  return app.use("/", router);
};
module.exports = initRoute;
