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

const setTourUserIds=(req,res,next)=>{
  // Allow nested routes
  if (!req.body.tour) req.body.tour = req.params.tourId;
  if (!req.body.user) req.body.user = req.user.id;
  next()
}

const createReviews = factory.createOne(Review);

const upDateReview = factory.upDateOne(Review);
const deleteReview = factory.deleteOne(Review); 

module.exports = {
  getAllReviews,
  createReviews,
  deleteReview,
  upDateReview,
  setTourUserIds,
};
