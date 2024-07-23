const fs =  require("fs");
const dotenv = require("dotenv");
const Tour = require("./../../models/ToursModel");

dotenv.config({ path: "./../../config/config.env" });
const connectDB = require("./../../config/db");
//connect to DB
connectDB();


// READ JSON FILE
const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours.json`, "utf-8"));

// IMPORT DATA INTO DB
const importData = async () => {
    try {
      await Tour.create(tours);
      console.log("Data successfully loaded!");
    } catch (err) {
      console.log(err);
    }
    process.exit();
  };
  
  // DELETE ALL DATA FROM DB
  const deleteData = async () => {
    try {
      await Tour.deleteMany();
      console.log("Data successfully deleted!");
    } catch (err) {
      console.log(err);
    }
    process.exit();
  };

  if (process.argv[2] === "--import") {
    importData();
  } else if (process.argv[2] === "--delete") {
    deleteData();
  }
  
  console.log(process.argv);
  
  // deleteData();
  // importData()