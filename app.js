const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const connectDB = require("./config/db")

//Loading env variables
dotenv.config({path:"./config/config.env"});

const app = express();

//connect to DB
connectDB();
//Load Routes
const tourRoutes = require("./routes/tourRoute");
const userRoutes = require("./routes/userRoute");
// Middleware for parsing JSON and URL-encoded request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
if(process.env.NODE_ENV =="Development"){
  app.use(morgan("dev"));
}

// 3) Mounting routes
app.use("/api/v1/tours", tourRoutes);
app.use("/api/v1/users", userRoutes);

// 4) START SERVER
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App is running on port ${port}....`);
});
