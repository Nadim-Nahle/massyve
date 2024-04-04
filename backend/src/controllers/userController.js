const User = require("../models/user");
const { all } = require("../routes/userRoutes");
const { addUser, getByEmail } = require("../services/UserService");
const bcrypt = require(`bcryptjs`);
const jwt = require('jsonwebtoken');
const TOKEN_SECRET = process.env.TOKEN_SECRET;

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
      return res.status(404).send({ error: "User not found" });
    }
    await user.deleteOne(); 
    res.status(200).send({ data: true });
  } catch (error) {
    res.status(400).send({ error: error.message });
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

async function login(req, res) {
  try {

    const user = await getByEmail(req.body.email);
    if (!user) return res.status(401).send('invalid email');

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send('invalid password');

    //CRETAE USER AND JWT TOKEN
    const token = jwt.sign(
      { _id: user._id, name: user.name, email: user.email },
      TOKEN_SECRET

    );

    return res.send({
      user: {
        name: user.name,
        email: user.email, _id: user._id,
        roles: user.roles,
        username: user.username,
        followings: user.followings
      },
      secret_token: token,
      url: user.url
    },
    );

    //CATCHING ERRORS
  } catch (error) {

    //console.log(error);
    res.status(500).send(error);

  }
}

module.exports = { deleteUser, getUserById, getUsers, updateUser, createUser, login };
