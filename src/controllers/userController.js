import {
  handleUserLogin,
  getAllUsers,
  createNewUser,
  deleteUser,
  updateUserData,
  getAllCodeService,
} from "../services/userService";
const handleLogin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(500).json({
      errCode: 1,
      message: "missing param",
    });
  }
  let userData = await handleUserLogin(email, password);
  return res.status(200).json({
    errCode: userData.errCode,
    user: userData.user || {},
    message: userData.errMessage,
  });
};
const handleGetAllUsers = async (req, res) => {
  const { id } = req.query;
  if (!id) {
    return res.status(500).json({
      errCode: 1,
      message: "missing param",
    });
  }
  let user = await getAllUsers(id);
  return res.status(200).json({
    message: "success",
    errCode: 0,
    user,
  });
};
const handleCreateNewUser = async (req, res) => {
  const message = await createNewUser(req.body);
  return res.status(200).json(message);
};
const handleDeleteUser = async (req, res) => {
  if (!req.body.id) {
    return res
      .status(200)
      .json({ errCode: 1, message: "missing required parameter" });
  }
  const message = await deleteUser(req.body.id);
  return res.status(200).json(message);
};
const handleEditUser = async (req, res) => {
  let data = req.body;
  if (!data) {
    return res
      .status(200)
      .json({ errCode: 1, message: "missing required parameter" });
  }
  const message = await updateUserData(data);
  return res.status(200).json(message);
};
const getAllCode = async (req, res) => {
  try {
    let data = await getAllCodeService(req.query.type);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(200).json({
      errCode: -1,
      errMessage: error,
    });
  }
};
module.exports = {
  handleLogin,
  handleGetAllUsers,
  handleCreateNewUser,
  handleDeleteUser,
  handleEditUser,
  getAllCode,
};
