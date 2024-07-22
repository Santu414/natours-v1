const express = require("express");
const morgan = require("morgan");
const app = express();
const fs = require("fs");

//Read data from json file
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);
// 1) MIDDLEWARE
// Middleware for parsing JSON and URL-encoded request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// 2) ROUTE HANDLERs

// Initiol Server Requst


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
const createUser = (req,res)=>{
  
  res.json({
    status: "Succes",
    message: "The user has been created successfully",
  });
}


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



//GET all tours
const getAllTours = (req, res) => {
  if (tours.length === 0) {
    res.status(404).json({
      status: "Not Found",
      Message: `There is no data found for given ${id}`,
    });
  }
  res.json({
    status: "Succes",
    message: "List of all tours",
    count: tours.length,
    data: tours,
  });
};

// Get single tour based on ID
const getTour = (req, res) => {
  const id = Number(req.params.id);
  const results = tours.filter((item) => item.id == id);
  if (results.length === 0) {
    res.status(404).json({
      status: "Not Found",
      Message: `There is no data found for given ${id}`,
    });
  }
  res.json({
    status: "Succes",
    message: "Single tours",
    count: results.length,
    data: results,
  });
};

// Create New Tour
const createTour = (req, res) => {
  let reqBody = req.body;
  const isTourExist = tours.filter((item) => item.id == reqBody.id);
  if (isTourExist.length > 0) {
    return res.status(400).json({ message: "The Tour already exists" });
  } else {
    const newId = tours.length;
    const newTour = { id: newId, ...reqBody };
    tours.push(newTour);
    fs.writeFileSync(
      `${__dirname}/dev-data/data/tours-simple.json`,
      JSON.stringify(tours, null, 2),
      "utf-8"
    );
    res.json({
      status: "Success",
      message: "The tour has been created successfully",
      data: newTour,
    });
  }
};

// Update Exesting tours
const updateTour = (req, res) => {
  const id = req.params.id;
  const reqBody = req.body;
  const isTourExist = tours.filter((item) => item.id == id);

  if (isTourExist.length == 0) {
    res.json({ message: "There is no tour to update" });
  } else {
    const isUpdateTour = tours.filter((item) => item.id !== reqBody.id);
    const tourId = isTourExist[0].id;
    const updateTour = { id: tourId, ...reqBody };

    isUpdateTour.push(updateTour);
    fs.writeFileSync(
      `${__dirname}/dev-data/data/tours-simple.json`,
      JSON.stringify(isUpdateTour, null, 2),
      "utf-8"
    );
    res.json({
      status: "Success",
      message: "The tour has been updated successfully",
      data: updateTour,
    });
  }
};

// Delete Tour
const deleteTour = (req, res) => {
  const id = Number(req.params.id);
  const newTour = tours.filter((item) => item.id !== id);
  fs.writeFileSync(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(newTour, null, 2),
    "utf-8"
  );
  res.json({
    status: "Success",
    message: "The tour has been Deleted successfully",
  });
};



// 3) ROUTES
app.route("/api/v1/tours/").get(getAllTours).post(createTour);
app.route("/api/v1/tours/:id").get(getTour).put(updateTour).delete(deleteTour);
app.route("/api/v1/users/").get(getAllUsers).post(createUser);
app.route("/api/v1/users/:id").get(getUser).put(updatUser).delete(deleteUser);


// 4) START SERVER
const port = 3000;
app.listen(port, () => {
  console.log(`App is running on port ${port}....`);
});
