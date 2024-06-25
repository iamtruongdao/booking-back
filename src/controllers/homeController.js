import {
  createNewUser,
  getAllUser,
  getUserById,
  updateUser,
} from "../services/CRUDservice";
const getHomePage = async (req, res) => {
  const data = await getAllUser();
  res.render("homepage.ejs", { lists: data });
};
const createUser = async (req, res) => {
  const message = await createNewUser(req.body);
  console.log(message);
  res.send(message);
};
const getCrud = async (req, res) => {
  res.render("cruduser.ejs");
};
const getUpdateUser = async (req, res) => {
  const userId = req.query.id;
  const result = await getUserById(userId);
  console.log(result);
  res.render("update.ejs", { infoUser: result });
};
const postUpdateUser = async (req, res) => {
  const message = await updateUser(req.body);
  console.log(message);
  res.redirect("/");
};
module.exports = {
  getHomePage,
  createUser,
  getCrud,
  getUpdateUser,
  postUpdateUser,
};
