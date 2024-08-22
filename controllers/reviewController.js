const Review = require("./../models/reviewModel");
const catchAsync = require("./../utils/catchAsync");
const factory = require("./handlerFactory");

// Get All Users
const getAllReviews = catchAsync(async (req, res) => {

  let filter = {}
  if(req.params.tourId) filter ={tour:req.params.tourId}
    const reviews = await Review.find(filter);

  res.status(200).json({
    status: "Succes",
    results: reviews,
     count: reviews.length,
    data: {
      reviews,
    },
  });
});

const createReviews = catchAsync(async (req, res, next) => {
  // Allow nested routes
  if (!req.body.tour) req.body.tour = req.params.tourId;
  if (!req.body.user) req.body.user = req.user.id;
  const newReview = await Review.create(req.body);
  console.log("newReviewnewReview",);

  res.status(200).json({
    status: "Succes",
    data: {
      review: newReview,
    },
  });
});

const deleteReview = factory.deleteOne(Review);

module.exports = { getAllReviews, createReviews, deleteReview };
