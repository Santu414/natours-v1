const Tours = require("../models/ToursModel");
//Read data from json file
//GET all tours
const getAllTours = async (req, res) => {
  let query = {};
  let { page, limit } = req.query;
  page = Number(page) || 1;
  limit = Number(limit) || 10;
  const skip = (page - 1) * limit;

  // 1) Filtering data
  const queryObj = { ...req.query };
  console.log("queryObj", queryObj);
  query = queryObj;
  const excludedFields = ["page", "limit", "sort", "fields"];
  excludedFields.forEach((item) => delete query[item]);

  // 2) Constructing query
  let queryBuilder = Tours.find(query);

  // 3) Applying sorting
  if (req.query.sort) {
    const sortBy = req.query.sort.split(",").join(" ");
    queryBuilder = queryBuilder.sort(sortBy);
  }
  // 3) Applying filelds
  if (req.query.fields) {
    const fields = req.query.fields.split(",").join(" ");
    queryBuilder = queryBuilder.select(fields);
  }

  // 4) Applying pagination
  queryBuilder = queryBuilder.skip(skip).limit(limit);

  // 5) Executing the query
  let tours = await queryBuilder;

  console.log("Tours:", tours);

  res.json({
    status: "Succes",
    message: "List of all tours",
    count: tours.length,
    data: tours,
  });
};

// Get single tour based on ID
const getTour = async (req, res) => {
  const tour = await Tours.findById(req.params.id);
  res.json({
    status: "Success",
    message: `Getting Tour by ${req.params.id}`,
    data: tour,
  });
};

// Create New Tour
const createTour = async (req, res) => {
  const tours = await Tours.create(req.body);
  res.json({
    status: "Success",
    message: "The tour has been created successfully",
    data: tours,
  });
};

// Update Exesting tours
const updateTour = async (req, res) => {
  const updateTour = await Tours.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json({
    status: "Success",
    message: "The tour has been updated successfully",
    data: updateTour,
  });
};

// Delete Tour
const deleteTour = async (req, res) => {
  const deleteTour = await Tours.findByIdAndDelete(req.params.id);
  res.json({
    status: "Success",
    message: "The tour has been Deleted successfully",
  });
};
const getTop5Tours = async (req, res) => {
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
};

module.exports = {
  getAllTours,
  getTour,
  createTour,
  updateTour,
  deleteTour,
  getTop5Tours,
};
