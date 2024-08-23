const Tours = require("../models/ToursModel");
const catchAsync = require("./../utils/catchAsync");
const factory = require("./handlerFactory")


//Read data from json file

//GET all tours
const getAllTours = factory.getAll(Tours)

// Get single tour based on ID
const getTour = factory.getOne(Tours,{path:"reviews"})

// Create New Tour
const createTour = factory.createOne(Tours)

// Update Exesting tours
const updateTour = factory.upDateOne(Tours);


const  deleteTour = factory.deleteOne(Tours)

// Delete Tour
//const deleteTour = catchAsync(async (req, res,next) => {
 // const deleteTour = await Tours.findByIdAndDelete(req.params.id);

 //   if (!deleteTour) { 
   //   return next(new AppError("No tour found with that ID", 404));
    //}
  //res.json({
  //  status: "Success",
  //  message: "The tour has been Deleted successfully",
  //});
//});

// Top Retaed Tour
const getTop5Tours = catchAsync(async (req, res,next) => {
  let limit = 5;
  let fields = "name price difficulty ratingsAverage duration";
  let sort = "-price average";

  const getTop5tour = await Tours.find()
    .sort(sort)
    .limit(limit)
    .select(fields)
    .lean();
  res.json({
    status: "Succes",
    message: "List of to 5  tours",
    data: getTop5tour,
  });
});

// Top Tour Stats
const getTourStats = catchAsync(async (req, res, next) => {
  const tourStats = await Tours.aggregate([
    {
      $match: { ratingsAverage: { $gte: 4.5 } },
    },
    {
      $group: {
        _id: { $toUpper: "$difficulty" },
        numTours: { $sum: 1 },
        numRatings: { $sum: "$ratingsQuantity" },
        avgRating: { $avg: "$ratingsAverage" },
        avgPrice: { $avg: "$price" },
        minPrice: { $min: "$price" },
        maxPrice: { $max: "$price" },
      },
    },
    {
      $sort: { avgPrice: 1 },
    },
    // {
    //   $match: { _id: { $ne: "EASY" } },
    // },
  ]);
  res.json({
    status: "Success",
    message: "Tour stats",
    count: tourStats.length,
    data: tourStats,
  });
});

//Tour Monthly Planing
const getMonthlyPlan = catchAsync(async (req, res, next) => {
  const year = req.params.year * 1;
  const plan = await Tours.aggregate([
    {
      $unwind: "$startDates",
    },
    {
      $match: {
        startDates: {
          $gte: new Date(`${year}-01-01`),
          $lte: new Date(`${year}-12-31`),
        },
      },
    },

    {
      $group: {
        _id: { $month: `$startDates` },
        numTourStarts: { $sum: 1 },
        tours: { $push: "$name" },
      },
    },
    {
      $addFields: { month: "$_id" },
    },
    {
      $project: {
        _id: 0,
      },
    },
    {
      $sort: { numTourStarts: -1 },
    },
    {
      $limit: 12,
    },
  ]);
  res.json({
    status: "Success",
    message: "Tour stats",
    data: plan,
  });
});

module.exports = {
  getAllTours,
  getTour,
  createTour,
  updateTour,
  deleteTour,
  getTop5Tours,
  getTourStats,
  getMonthlyPlan,
  catchAsync,
};

