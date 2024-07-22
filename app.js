const express = require("express");
const morgan = require("morgan");
const app = express();
const tourRoutes = require("./routes/tourRoute");
const userRoutes = require("./routes/userRoute");

// 1) MIDDLEWARE
// Middleware for parsing JSON and URL-encoded request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// 3) Mounting routes
app.use("/api/v1/tours", tourRoutes);
app.use("/api/v1/users", userRoutes);

// 4) START SERVER
const port = 3000;
app.listen(port, () => {
  console.log(`App is running on port ${port}....`);
});
