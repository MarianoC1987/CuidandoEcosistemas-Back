require("dotenv").config();
const users = require("./routes/usersRoutes");
const plants = require("./routes/plantsRoutes");
const forumPublications = require("./routes/forumPublicationsRoutes");
const recommendations = require("./routes/recommendationsRoutes");

const trefle = require("./routes/apiTrefleRoutes");
const app = require("./index");
const mongoose = require("mongoose");
app.use(cors({ origin: `${process.env.CLIENT_URL}` }));
const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

//UNCAUGHT EXCEPTION
process.on("uncaughtException", (err) => {
  console.log(err.name, err.message);
  console.log("UNCAUGHT EXCEPTION! Shutting down...");
  process.exit(1);
});

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then((con) => console.log("DB connection successful!"));

const port = process.env.PORT || 3001;
app.use("/api/v1/users", users);
app.use("/api/v1/plants", plants);
app.use("/api/v1/forum", forumPublications);
app.use("/api/v1/recommendations", recommendations);
app.use("/api/v1/trefle", trefle);
const server = app.listen(port, () => {
  console.log(`server ${port}`);
});

//UNHANDLED REJECTION
process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  console.log("UNHANDLED REJECTION! Shutting down...");
  server.close(() => {
    process.exit(1);
  });
});

module.exports = server;
