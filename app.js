const express = require("express");
const app = express();
const fs = require("fs")

//Read data from json file
const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`))

//Initial server request
app.get("/",(req,res)=>{
    res.status(200).json({Message:"Hello from server side 123456789 "})
})

app.post("/",(req,res)=>{
    res.status(200).json({Message:"You can post the data"})
})

//GET all tours
app.get("/api/v1/tours/",(req,res)=>{
res.json({

    "status":"Succes",
    "message":"List of all tours",
    "count":tours.length,
    "data":tours
})
})

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

const port = 3000;
app.listen(port,()=>{
    console.log(`App is running on port ${port}....`)
})