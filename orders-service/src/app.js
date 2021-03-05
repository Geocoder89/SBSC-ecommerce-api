const express = require("express");
const app = express();
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const errorHandler = require("./middleware/errorHandler");

dotenv.config({
  path: "src/config/.env",
});
app.use(express.json());

connectDB();

// import route file

const orderRoute = require("./api/routes/orders");

// mount route

app.use("/api/v1/orders", orderRoute);

// error handling function/middleware

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(
    `Magic happens in ${process.env.NODE_ENV} on port ${process.env.PORT}`
  );
});

// handle unhandled promise rejections

process.on("unhandledRejection", (err, promise) => {
  console.log(`Error:${err.message}`.red);

  // close server and exit process

  // server.close(() => process.exit(1));
});
