const fs = require("fs");
//Read data from json file
const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

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

module.exports = { getAllTours, getTour, createTour, updateTour, deleteTour };
