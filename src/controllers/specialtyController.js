import {
  postSpecialtyService,
  getSpecialtyService,
  getSpecialtyByIdService,
} from "../services/specialtyService";
const postSpecialty = async (req, res) => {
  try {
    const response = await postSpecialtyService(req.body);
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(200).json({ errCode: -1, message: "error from server" });
  }
};
const getSpecialty = async (req, res) => {
  try {
    const response = await getSpecialtyService();
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(200).json({ errCode: -1, message: "error from server" });
  }
};
const getSpecialtyById = async (req, res) => {
  try {
    const response = await getSpecialtyByIdService(
      req.query.id,
      req.query.location
    );
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(200).json({ errCode: -1, message: "error from server" });
  }
};
module.exports = { postSpecialty, getSpecialty, getSpecialtyById };
