const nodemailer = require("nodemailer");
require("dotenv").config();
const sendMailSimple = async (dataSend, language) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: process.env.APP_EMAIL,
      pass: process.env.APP_PASSWORD,
    },
  });
  const info = await transporter.sendMail({
    from: "BookingCare.vn", // sender address
    to: dataSend.emailSend, // list of receivers
    subject: "Thông tin đặt lịch khám bệnh", // Subject line
    html: renderText(language, dataSend), // html body
  });
};
const renderText = (language, dataSend) => {
  return "vi" === language
    ? `
    <h3>Xin chào ${dataSend.patientName}</h3>
    <p>Bạn nhận được email này vì đã đặt lịch khám bệnh online trên Booking care</p>
    <p>Thông tin đặt lịch</p>
    <div><b>Thời gian ${dataSend.time}</b></div>
    <div><b>Bác sĩ: ${dataSend.doctorName}</b></div>
    <p>Nếu thông tin trên là đúng vui lòng click vào đường dẫn để xác nhận hoàn tất thủ tục</p>
    <div><a href="${dataSend.redirectLink}">Click on</a></div>
    `
    : `<h3>Hello ${dataSend.patientName}</h3>
 <p>You received this email because you booked an online medical appointment on Booking care</p>
 <p>Schedule information</p>
 <div><b>Time ${dataSend.time}</b></div>
 <div><b>Doctor's name: ${dataSend.doctorName}</b></div>
 <p>If the above information is correct, please click on the link to confirm completion of the procedure</p>
 <div><a href="${dataSend.redirectLink}">Click on</a></div>`;
};

const renderTextRemedy = (language, dataSend) => {
  return "vi" === language
    ? `
    <h3>Xin chào ${dataSend.patientName}</h3>
    <p>Bạn nhận được email này vì đã đặt lịch khám bệnh online trên Booking care</p>
   <p>Thông tin hóa đơn được gửi trong file đính kèm</p>
    `
    : `<h3>Hello ${dataSend.patientName}</h3>
 <p>You received this email because you booked an online medical appointment on Booking care</p>
 <p>Schedule information</p>
 `;
};
const sendRemedy = async (dataSend, language) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: process.env.APP_EMAIL,
      pass: process.env.APP_PASSWORD,
    },
  });
  const info = await transporter.sendMail({
    from: "BookingCare.vn", // sender address
    to: dataSend.email, // list of receivers
    subject: "Thông tin đặt lịch khám bệnh", // Subject line
    html: renderTextRemedy(language, dataSend), // html body
    attachments: [
      {
        // encoded string as an attachment
        filename: "text1.png",
        content: dataSend.image.split("base64")[1],
        encoding: "base64",
      },
    ],
  });
};

module.exports = { sendMailSimple, sendRemedy };
