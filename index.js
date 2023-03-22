const express = require("express");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const AppError = require("./utilities/appError");
const globalErrorHandler = require("./controllers/errorController");

const users = require("./routes/usersRoutes");
const plants = require("./routes/plantsRoutes");
const forumPublications = require("./routes/forumPublicationsRoutes");
const recommendations = require("./routes/recommendationsRoutes");

const trefle = require("./routes/apiTrefleRoutes");

const app = express();

//Set security HTTP headers
app.use(helmet());

//Development logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//Limit requests from same API
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many request from this IP, please try again in an hour!",
});
app.use("/api", limiter);

//reading data from body into req.body
app.use(bodyParser.json({ limit: "10kb" }));

//Data sanitization against NoSQL query injection
app.use(mongoSanitize());
//Data sanitization against XSS
app.use(xss());
//Prevent parameter pollution
app.use(
  hpp({
    //la whitelist es para agregar los parametros que se pueden repetir en las busquedas
    whitelist: ["type", "location", "climate"],
  })
);

app.use(cookieParser());
app.use(cors());

app.use("/api/v1/users", users);
app.use("/api/v1/plants", plants);
app.use("/api/v1/forum", forumPublications);
app.use("/api/v1/recommendations", recommendations);

app.use("/api/v1/trefle", trefle);

app.all("*", (req, res, next) => {
  next(new AppError(`No se encontro ${req.originalUrl} en este servidor`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
