const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const globalErrorHandler = require("./controllers/errorController");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize=require("express-mongo-sanitize")
const XSS = require("xss-clean");
 
const AppError = require("./utils/appError");
//Loading env variables
dotenv.config({ path: "./config/config.env" });

const app = express();

//connect to DB
connectDB();
//Load Routes
const tourRoutes = require("./routes/tourRoute");
const userRoutes = require("./routes/userRoute");
const revewRoute = require("./routes/revewRoute");
const { mongo } = require("mongoose");
// Middleware for parsing JSON and URL-encoded request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
if (process.env.NODE_ENV == "Development") {
  app.use(morgan("dev"));
}

app.use(helmet());

// Data sanitization against senitize
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(XSS());

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many requists from this IP, Please try again in an hour!",
});

app.use("/api", limiter); 

app.use(express.json({limit:'10kb'}))



app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  console.log(req.headers);
  next();
});

// 3) Mounting routes
app.use("/api/v1/tours", tourRoutes);
app.use("/api/v1/users", userRoutes);
//app.use("/api/v1/reviews", revewRoute);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`));
});

app.use(globalErrorHandler);

// 4) START SERVER
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App is running on port ${port}....`);
});
