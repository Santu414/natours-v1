const User = require("../models/UserModel");
const catchAsync = require("./../utils/catchAsync");

// Get All Users
const getAllUsers = catchAsync(async (req, res, next) => {
  const allUser = await User.find();
  res.status(200).json({
    status: "Succes",
    results: allUser.length,
    data: {
      allUser,
    },
  });
});

//Get Single User
const getUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  res.json({
    status: "Succes",
    message: "Single users",
    data: user,
  });
});

//Create new Users
const createUser = catchAsync(async (req, res, next) => {
  const createUser = await User.create(req.body);
  res.json({
    status: "Succes",
    message: "The user has been created successfully",
    data: createUser,
  });
});

//Updata User Profile
const updatUser = catchAsync(async (req, res, next) => {
  const updataUser = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json({
    status: "Success",
    message: "The user has been updated successfully",
    data: updataUser,
  });
});

// Delete user
const deleteUser = catchAsync(async(req, res,next) => {
  
  const deleteUser = await User.findByIdAndDelete(req.params.id);
  res.json({
    status: "Success",
    message: "The tour has been Deleted successfully",
    data: deleteUser,
  });
});

module.exports = { getAllUsers, getUser, createUser, updatUser, deleteUser };
