const Review = require("./../models/reviewModel");
const catchAsync = require("./../utils/catchAsync");

// Get All Users
const getAllReviews = catchAsync(async (req, res) => {
    const reviews = await Review.find();

  res.status(200).json({
    status: "Succes",
    results: reviews,
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

module.exports = { getAllReviews, createReviews };
