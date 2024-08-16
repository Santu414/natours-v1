const User = require("../models/UserModel");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");


const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });

  return newObj;
};

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

const updateMe = catchAsync(async (req, res, next) => {
  // 1) Create error if user POSTs password data
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        "This route is not for password updates. Please use /updateMyPassword.",
        400
      )
    );
  }

  // 2) Filtered out unwanted fields names that are not allowed to be updated

  const filteredBody = filterObj(req, res, "name", "email");

  // 3) Update user document
  const updatedUser = await User.findByIdAndUpdate(
    req.user.id,
    
    filteredBody,
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({
    status: "success",
    data: {
      user: updatedUser,
    },
  });
});

const deleteMe=catchAsync(async(req,res)=>{
    await User.findByIdAndUpdate(req.user.id,{active:false})

    res.status(204).json({
      status: "success",
      data:null
    });
})

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
const deleteUser = catchAsync(async (req, res, next) => {
  const deleteUser = await User.findByIdAndDelete(req.params.id);
  res.json({
    status: "Success",
    message: "The tour has been Deleted successfully",
    data: deleteUser,
  });
});

module.exports = {
  getAllUsers,
  getUser,
  createUser,
  updatUser,
  deleteUser,
  updateMe,
  deleteMe,
};
