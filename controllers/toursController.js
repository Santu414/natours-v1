const Tours = require("../models/ToursModel");
const APIFeatures = require("./../utils//apiFeaturs");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");


//Read data from json file

//GET all tours
const getAllTours = catchAsync(async (req, res, next) => {
  //let { page, limit } = req.query;
  //page = Number(page) || 1;
  //limit = Number(limit) || 10;
  //const skip = (page - 1) * limit;

  // 1) Filtering data
  // const queryObj = { ...req.query };
  //console.log("queryObj", queryObj);
  //query = queryObj;
  //const excludedFields = ["page", "limit", "sort", "fields"];
  //excludedFields.forEach((item) => delete query[item]);

  // 2) Constructing query
  // let queryBuilder = Tours.find(query);

  // 3) Applying sorting
  // if (req.query.sort) {
  // const sortBy = req.query.sort.split(",").join(" ");
  //queryBuilder = queryBuilder.sort(sortBy);
  // }
  // 3) Applying filelds
  //if (req.query.fields) {
  // const fields = req.query.fields.split(",").join(" ");
  // queryBuilder = queryBuilder.select(fields);
  // }

  // 4) Applying pagination
  // queryBuilder = queryBuilder.skip(skip).limit(limit);

  // 5) Executing the query

  const features = new APIFeatures(Tours.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  let tours = await features.query;

  res.status(200).json({
    status: "Succes",
    message: "List of all tours",
    count: tours.length,
    data: tours,
  });
});

// Get single tour based on ID
const getTour = catchAsync(async (req, res,next) => {
  const tour = await Tours.findById(req.params.id);

  if(!tour){
    return next(new AppError('No tour found with that ID',404))
  }

  res.json({
    status: "Success",
    message: `Getting Tour by ${req.params.id}`,
    data: tour,
  });
});

// Create New Tour
const createTour = catchAsync(async (req, res, next) => {
  const tours = await Tours.create(req.body);
  res.json({
    status: "Success",
    message: "The tour has been created successfully",
    data: tours,
  });
});

// Update Exesting tours
const updateTour = catchAsync(async (req, res,next) => {
  const updateTour = await Tours.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: false,
  });

  if (!updateTour) {
    return next(new AppError("No tour found with that ID", 404));
  }

  res.json({
    status: "Success",
    message: "The tour has been updated successfully",
    data: updateTour,
  });
});

// Delete Tour
const deleteTour = catchAsync(async (req, res,next) => {
  const deleteTour = await Tours.findByIdAndDelete(req.params.id);

    if (!deleteTour) { 
      return next(new AppError("No tour found with that ID", 404));
    }
  res.json({
    status: "Success",
    message: "The tour has been Deleted successfully",
  });
});

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
