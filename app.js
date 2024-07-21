const express = require("express");
const app = express();
const fs = require("fs")

//Read data from json file
const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`))

// Middleware for parsing JSON and URL-encoded request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Initial server request
app.get("/",(req,res)=>{
    res.status(200).json({Message:"Hello from server side 123456789 "})
})

app.post("/",(req,res)=>{
    res.status(200).json({Message:"You can post the data"})
})

//GET all tours
app.get("/api/v1/tours/", (req, res) => {
  res.json({
    status: "Succes",
    message: "List of all tours",
    count: tours.length,
    data: tours,
  });
});

// Get single tour based on ID
app.get("/api/v1/tours/:id", (req, res) => {
  const ID = Number(req.params.id);
  const results = tours.filter((item) => item.id == ID);
  res.json({
    status: "Succes",
    message: "Single tours",
    count: results.length,
    data: results,
  });
});

// Create new tour
app.post("/api/v1/tours/", (req, res) => {
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
      data:newTour
    });
  }
});

// Update Exesting tours
app.put("/api/v1/tours/", (req, res) => {
  const reqBody = req.body;
  const isTourExist = tours.filter((item) => item.id == reqBody.id);

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
});

// Delete Tour
app.delete("/api/v1/tours/:id",(req,res)=>{
    const id = Number(req.params.id)
    const newTour = tours.filter(item=>item.id!==id)
    fs.writeFileSync(
      `${__dirname}/dev-data/data/tours-simple.json`,
      JSON.stringify(newTour, null, 2),
      "utf-8"
    );
    res.json({
      status: "Success",
      message: "The tour has been Deleted successfully",
    });
})

const port = 3000;
app.listen(port,()=>{
    console.log(`App is running on port ${port}....`)
})