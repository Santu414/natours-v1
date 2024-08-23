const Review = require("./../models/reviewModel");
//const catchAsync = require("./../utils/catchAsync");
const factory = require("./handlerFactory");

// Get All Users


const setTourUserIds=(req,res,next)=>{
  // Allow nested routes
  if (!req.body.tour) req.body.tour = req.params.tourId;
  if (!req.body.user) req.body.user = req.user.id;
  next()
}

const getAllReviews = factory.getAll(Review);
const getReviews = factory.getOne(Review);
const createReviews = factory.createOne(Review);
const upDateReview = factory.upDateOne(Review);
const deleteReview = factory.deleteOne(Review); 

module.exports = {
  getAllReviews,
  createReviews,
  deleteReview,
  upDateReview,
  getReviews,
  setTourUserIds,
};
