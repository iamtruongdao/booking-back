import {
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
} from "../services/doctorService";

const getTopDoctor = async (req, res) => {
  let { limit } = req.query;
  if (!limit) limit = 10;
  try {
    const message = await getTopDoctorService(+limit);
    return res.status(200).json(message);
  } catch (error) {
    console.log(error);
    return res.status(200).json({ errCode: -1, message: "error from Server" });
  }
};
const getAllDoctors = async (req, res) => {
  try {
    const data = await getAllDoctorsService();
    return res.status(200).json({ errCode: 0, data: data.data });
  } catch (error) {
    console.log(error);
    return res.status(200).json({ errCode: -1, message: "error from server" });
  }
};
const saveDetailDoctor = async (req, res) => {
  const { data } = req.body;
  console.log(data);
  try {
    let message = await saveDetailDoctorService(data);
    return res.status(200).json(message);
  } catch (error) {
    console.log(error);
    return res.status(200).json({ errCode: -1, message: "error from server" });
  }
};
const getDetailDoctorById = async (req, res) => {
  try {
    let data = await getDetailDoctorByIdService(req.query.id);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(200).json({ errCode: -1, message: "error from server" });
  }
};
const getAllSchedule = async (req, res) => {
  try {
    const data = await getAllScheduleDoctorsService();

    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({ errCode: -1, message: "error from server" });
  }
};
const saveAllSchedule = async (req, res) => {
  try {
    console.log(req.body);
    const { data } = req.body;
    const response = await saveAllScheduleService(data);
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(200).json({ errCode: -1, message: "error from server" });
  }
};
const getScheduleByDate = async (req, res) => {
  try {
    const { doctorId, date } = req.query;
    console.log(typeof date);
    const response = await getScheduleByDateService(doctorId, date);
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(200).json({ errCode: -1, message: "error from server" });
  }
};
const getExtraDoctorInforById = async (req, res) => {
  try {
    const { doctorId } = req.query;
    const response = await getExtraDoctorInforByIdService(doctorId);
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(200).json({ errCode: -1, message: "error from server" });
  }
};
const getProfileDoctorById = async (req, res) => {
  try {
    const { doctorId } = req.query;
    const response = await getProfileDoctorByIdService(doctorId);
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(200).json({ errCode: -1, message: "error from server" });
  }
};
const getListPatientForDoctor = async (req, res) => {
  try {
    const { doctorId, date } = req.query;
    const response = await getListPatientForDoctorService(doctorId, date);
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(200).json({ errCode: -1, message: "error from server" });
  }
};
const postRemedy = async (req, res) => {
  try {
    const response = await postRemedyService(req.body);
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(200).json({ errCode: -1, message: "error from server" });
  }
};
module.exports = {
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
};
