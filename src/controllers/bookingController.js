import {
  postBookingAppointmentService,
  postVerifyEmailBookingService,
} from "../services/bookingService";
const postBookingAppointment = async (req, res) => {
  try {
    const response = await postBookingAppointmentService(req.body);
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(200).json({ errCode: -1, message: "error from server" });
  }
};
const postVerifyEmailBooking = async (req, res) => {
  try {
    const response = await postVerifyEmailBookingService(req.body);
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(200).json({ errCode: -1, message: "error from server" });
  }
};
module.exports = { postBookingAppointment, postVerifyEmailBooking };
