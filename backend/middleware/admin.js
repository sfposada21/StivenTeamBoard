const Role = require("../models/role");

const admin = async (req, res, next) => {
  let role = await Role.findById(req.user.roleId);
  if (!role) return res.status(400).send("El rol admi no existe en db");

  if (role.name === "admin") next();
  else return res.status(400).send("usuario no autorizado");
};

module.exports = admin;
