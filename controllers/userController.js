const User = require("../models/UserModel");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
const factory = require("./handlerFactory");

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });

  return newObj;
};



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


const getMe=(req,res,next)=>{
 req.params.id=req.user.id
  next() 
}

const deleteMe=catchAsync(async(req,res)=>{
    await User.findByIdAndUpdate(req.user.id,{active:false})

    res.status(204).json({
      status: "success",
      data:null
    });
})



//Create new Users
const createUser = catchAsync(async (req, res, next) => {
  const createUser = await User.create(req.body);
  res.json({
    status: "Succes",
    message: "This route is not defined! please use signup instead",
    data: createUser,
  });
});

// Get All Users
const getAllUsers =factory.getAll(User)
//Get Single User
const getUser = factory.getOne(User)
//Updata User Profile
const updatUser =factory.upDateOne(User)

// Delete user
const deleteUser = factory.deleteOne(User)

module.exports = {
  getAllUsers,
  getUser,
  getMe,
  createUser,
  updatUser,
  deleteUser,
  updateMe,
  deleteMe,
};
