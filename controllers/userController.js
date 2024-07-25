const User = require("../models/UserModel");

// Get All Users
const getAllUsers = async (req, res) => {
  const allUser = await User.find();
  res.json({
    status: "Succes",
    message: "List of all users",
    data: allUser,
  });
};

//Get Single User
const getUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  res.json({
    status: "Succes",
    message: "Single users",
    data: user,
  });
};

//Create new Users
const createUser = async (req, res) => {
  const createUser = await User.create(req.body);
  res.json({
    status: "Succes",
    message: "The user has been created successfully",
    data: createUser,
  });
};

//Updata User Profile
const updatUser =async(req, res) => {
  const updataUser = await User.findByIdAndUpdate(req.params.id,req.body,{ new: true })
  res.json({
    status: "Success",
    message: "The user has been updated successfully",
    data: updataUser,
  });
};

// Delete user
const deleteUser = async(req, res) => {
  
  const deleteUser = await User.findByIdAndDelete(req.params.id);
  res.json({
    status: "Success",
    message: "The tour has been Deleted successfully",
    data: deleteUser,
  });
};

module.exports = { getAllUsers, getUser, createUser, updatUser, deleteUser };
