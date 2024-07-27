const Tours = require("../models/ToursModel");
//Read data from json file
//GET all tours
const getAllTours = async (req, res) => {
  try {
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

    res.json({
      status: "Succes",
      message: "List of all tours",
      count: tours.length,
      data: tours,
    });
  } catch (error) {
    throw new Error(error);
  }
};

// Get single tour based on ID
const getTour = async (req, res) => {
  try {
    const tour = await Tours.findById(req.params.id);
    res.json({
      status: "Success",
      message: `Getting Tour by ${req.params.id}`,
      data: tour,
    });
  } catch (error) {
    throw new Error(error);
  }
};

// Create New Tour
const createTour = async (req, res) => {
  try {
    const tours = await Tours.create(req.body);
    res.json({
      status: "Success",
      message: "The tour has been created successfully",
      data: tours,
    });
  } catch (error) {
    throw new Error(error);
  }
};

// Update Exesting tours
const updateTour = async (req, res) => {
  try {
    const updateTour = await Tours.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json({
      status: "Success",
      message: "The tour has been updated successfully",
      data: updateTour,
    });
  } catch (error) {
    throw new Error(error);
  }
};

// Delete Tour
const deleteTour = async (req, res) => {
  try {
    const deleteTour = await Tours.findByIdAndDelete(req.params.id);
    res.json({
      status: "Success",
      message: "The tour has been Deleted successfully",
    });
  } catch (error) {
    throw new Error(error);
  }
};

// Top Retaed Tour
const getTop5Tours = async (req, res) => {
  try {
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
  } catch (error) {
    throw new Error(error);
  }
};

// Top Tour Stats
const getTourStats = async (req, res) => {
  try {
    const tourStats = await Tours.aggregate([
      {
        $match: { ratingsAverage: { $gte: 4.5 } },
      },
      {
        $group: {
          _id: null,
          avgRating: { $avg: "$ratingsAverage" },
          avgPrice: { $avg: "$price" },
          minPrice: { $min: "$price" },
          maxPrice: { $max: "$price" },
        },
      },
    ]);
    res.json({
      status: "Success",
      message: "Tour stats",
      count: tourStats.length,
      data: tourStats,
    });
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  getAllTours,
  getTour,
  createTour,
  updateTour,
  deleteTour,
  getTop5Tours,
  getTourStats,
};
