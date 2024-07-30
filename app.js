const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

//Loading env variables
dotenv.config({ path: "./config/config.env" });

const app = express();

//connect to DB
connectDB();
//Load Routes
const tourRoutes = require("./routes/tourRoute");
const userRoutes = require("./routes/userRoute");
const revewRoute = require("./routes/revewRoute");
// Middleware for parsing JSON and URL-encoded request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
if (process.env.NODE_ENV == "Development") {
  app.use(morgan("dev"));
}

// 3) Mounting routes
app.use("/api/v1/tours", tourRoutes);
app.use("/api/v1/users", userRoutes);
//app.use("/api/v1/reviews", revewRoute);

app.all("*", (req, res, next) => {
  //res.status(404).json({
  // status: "fail",
  // message: `Can't find ${req.originalUrl} on this server!`,
  // });

  const err = new Error(`Can't find ${req.originalUrl}on this server!`);
  err.status = "fail";
  err.statusCode = 404;
  next(err);
});

app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});

// 4) START SERVER
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App is running on port ${port}....`);
});
