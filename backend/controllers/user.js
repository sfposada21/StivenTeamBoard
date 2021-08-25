const bcrypt = require("bcrypt");
const User = require("../models/user");
const Role = require("../models/role");
const mongoose = require("mongoose");

const registerUser = async (req, res) => {
  if (!req.body.name || !req.body.email || !req.body.password)
    return res.status(400).send("Informacion incompleta");

  let existingUser = await User.findOne({ email: req.body.email });
  if (existingUser)
    return res.status(400).send("El usuario ya esta registrado");

  let hash = await bcrypt.hash(req.body.password, 10);

  let role = await Role.findOne({ name: "user" });
  if (!role) return res.status(400).send("No role was assigned");

  let user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hash,
    roleId: role._id,
    dbStatus: true,
  });

  let result = await user.save();
  if (!result) return res.status(400).send("Error registrando rol");
  try {
    let jwtToken = user.generateJWT();
    res.status(200).send({ jwtToken });
  } catch (e) {
    return res.status(400).send("Token fallido");
  }
};

const login = async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("El email o contraseña con incorrectos");

  if (!user.dbStatus) return res.status(400).send("El email o contraseña con incorrectos");

  let hash = await bcrypt.compare(req.body.password, user.password);
  if (!hash) return res.status(400).send("El email o contraseña con incorrectos");

  try {
    let jwtToken = user.generateJWT();
    return res.status(200).send({ jwtToken });
  } catch (e) {
    return res.status(400).send("Login error");
  }
};

const listUser = async (req, res) => {
  let users = await User.find({ name: new RegExp(req.params["name"], "i") })
    .populate("roleId")
    .exec();
  if (!users || users.length === 0)
    return res.status(400).send("No se encontraron resultados");
  return res.status(200).send({ users });
};

const updateUser = async (req, res) => {
  if (!req.body._id || !req.body.name || !req.body.email || !req.body.roleId)
    return res.status(400).send("Informacion incompleta");

  let pass = "";

  if (req.body.password) {
    pass = await bcrypt.hash(req.body.password, 10);
  } else {
    let userFind = await User.findOne({ email: req.body.email });
    pass = userFind.password;
  }

  let user = await User.findByIdAndUpdate(req.body._id, {
    name: req.body.name,
    email: req.body.email,
    password: pass,
    roleId: req.body.roleId,
  });

  if (!user) return res.status(400).send("Error editando user");
  return res.status(200).send({ user });
};

const deleteUser = async (req, res) => {
  if (!req.body._id) return res.status(400).send("Informacion incompleta");

  let user = await User.findByIdAndUpdate(req.body._id, {
    dbStatus: false,
  });
  if (!user) return res.status(400).send("Error eliminando user");
  return res.status(200).send({ user });
};

const registerAdmin = async (req, res) => {
  if (
    !req.body.name ||
    !req.body.email ||
    !req.body.password ||
    !req.body.roleId
  )
    return res.status(400).send("Error: Informacion incompleta");

  let validId = await mongoose.Types.ObjectId.isValid(req.body.roleId);
  if (!validId) return res.status(400).send("Invalid role ID");

  let existingUser = await User.findOne({ email: req.body.email });
  if (existingUser)
    return res.status(400).send("The userya es registrado");

  let hash = await bcrypt.hash(req.body.password, 10);

  let user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hash,
    roleId: req.body.roleId,
    dbStatus: true,
  });

  let result = await user.save();
  if (!result) return res.status(400).send("Error registrando usuario");
  try {
    let jwtToken = user.generateJWT();
    res.status(200).send({ jwtToken });
  } catch (e) {
    return res.status(400).send("Token generado fallido");
  }
};

module.exports = {
  registerUser,
  login,
  listUser,
  updateUser,
  deleteUser,
  registerAdmin,
};
