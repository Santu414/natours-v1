
const Tours = require("../models/ToursModel")
//Read data from json file

//GET all tours  
const getAllTours = async (req, res) => {
  const tours = await Tours.find()
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
const updateTour = async(req, res) => {
  const updateTour = await Tours.findByIdAndUpdate(req.params.id,req.body,{ new: true })
  res.json({
    status: "Success",
    message: "The tour has been updated successfully",
    data: updateTour,
  });
};


// Delete Tour
const deleteTour = async (req, res) => {
  const deleteTour = await Tours.findByIdAndDelete(req.params.id)
  res.json({
    status: "Success",
    message: "The tour has been Deleted successfully",
  });
};

module.exports = { getAllTours, getTour, createTour, updateTour, deleteTour };
