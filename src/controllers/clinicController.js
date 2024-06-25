import {
  postClinicService,
  getAllClinicService,
  getClinicByIdService,
} from "../services/clinicService";
const postClinic = async (req, res) => {
  try {
    const response = await postClinicService(req.body);
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(200).json({ errCode: -1, message: "error from server" });
  }
};
const getAllClinic = async (req, res) => {
  try {
    const response = await getAllClinicService();
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(200).json({ errCode: -1, message: "error from server" });
  }
};
const getClinicById = async (req, res) => {
  try {
    const response = await getClinicByIdService(req.query.id);
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(200).json({ errCode: -1, message: "error from server" });
  }
};
module.exports = { postClinic, getAllClinic, getClinicById };
