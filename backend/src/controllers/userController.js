const User = require("../models/user");
const { all } = require("../routes/userRoutes");
const { addUser } = require("../services/UserService");
const bcrypt = require(`bcryptjs`);
const { validationResult } = require("express-validator/check");

//Get All Users Contoller
async function getUsers(req, res) {
  try {
    const user = await User.find(all);
    if (!user) {
      return res.status(405).send();
    }
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send(error.message);
  }
}

//UPDATE USER CONTROLLER
async function updateUser(req, res) {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send();
    }
    Object.assign(user, req.body);
    user.save();
    return res.send(user);
  } catch (error) {
    res.status(400).send(error.message);
  }
}

//UPDATE USER CONTROLLER
async function getUserById(req, res) {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send();
    }
    res.send({ data: user });
  } catch (error) {
    res.status(400).send(error.message);
  }
}

//DELETE User CONTROLLER
async function deleteUser(req, res) {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send();
    }
    await user.remove();
    res.status(200).send({ data: true });
  } catch (error) {
    res.status(400).send(error.message);
  }
}

//Create User CONTROLLER
async function createUser(req, res) {
  try {
    
    //ENCRYPT THE PASSWORD
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    //STORE THE NEW USER
    const addUserResult = await addUser(req.body, hashPassword);
    return res.send({ userId: addUserResult._id });

    //CATCHING ERRORS
  } catch (error) {
    res.status(400).send(error);
  }
}

module.exports = { deleteUser, getUserById, getUsers, updateUser, createUser };
