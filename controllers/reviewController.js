const Review = require("../models/reviewModel");

// Get All Users
const getAllReviews = async (req, res) => {
  res.json({
    status: "Succes",
    message: "List of all review",
  });
};

//Get Single User
const getReview = async (req, res) => {
  res.json({
    status: "Succes",
    message: "Single review",
  });
};

//Create new Users
const createReview = async (req, res) => {
  res.json({
    status: "Succes",
    message: "The review has been created successfully",
  });
};

//Updata User Profile
const updatReview =async(req, res) => {
  res.json({
    status: "Success",
    message: "The review has been updated successfully",
  });
};

// Delete user
const deleteReview = async(req, res) => {
  
  res.json({
    status: "Success",
    message: "The review has been Deleted successfully",
  });
};

module.exports = { getAllReviews, getReview, createReview, updatReview, deleteReview };
