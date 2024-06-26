const User = require("../models/user");

//REGISTER SERVICE
async function addUser(body, hashPassword) {
  const { name, email, username, url } = body;

  const user = new User({
    name,
    email,
    password: hashPassword,
  });

  return await user.save();
}

async function getByEmail(email) {
  return await User.findOne({
    email,
  });
}

module.exports = {
  addUser,getByEmail
};
