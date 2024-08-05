const jwt =require("jsonwebtoken")
const User = require("./../models/UserModel");
const catchAsync = require("./../utils/catchAsync");
const AppError =require("./../utils/appError")


const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create(req.body);

  const token = signToken({ id: newUser._id });

  res.status(201).json({
    status: "success",
    token,      
    data: {
      user: newUser,
    },
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // 1) Check if email and password exist
  if (!email || !password) {
    return next(new AppError("Please provide email and password!", 400));
  }
  // 2) Check if user exists && password is correct
  const user = await User.findOne({ email }).select("+password");
 

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("Incorrect email or password", 401));
  }

  // 3) If everything ok, send token to client
  //createSendToken(user, 200, req, res);
  const token = signToken(user._id)

  
  res.status(201).json({
    status: "success",
    token,
   
  }); 
});