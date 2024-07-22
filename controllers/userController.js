// Get All Users
const getAllUsers = (req, res) => {
  res.json({
    status: "Succes",
    message: "List of all users",
  });
};

//Get Single User
const getUser = (req, res) => {
  res.json({
    status: "Succes",
    message: "Single users",
  });
};

//Create new Users
const createUser = (req, res) => {
  res.json({
    status: "Succes",
    message: "The user has been created successfully",
  });
};

//Updata User Profile
const updatUser = (req, res) => {
  res.json({
    status: "Success",
    message: "The user has been updated successfully",
    data: updateTour,
  });
};

// Delete user
const deleteUser = (req, res) => {
  res.json({
    status: "Success",
    message: "The tour has been Deleted successfully",
  });
};

module.exports = { getAllUsers, getUser, createUser, updatUser, deleteUser };