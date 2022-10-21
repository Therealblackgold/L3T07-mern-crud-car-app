// imports
const express = require("express");
const cors = require("cors");
const connectDB = require("./db");
const errorHandler = require("./middleware/errorhandler");

// init app
const app = express();
connectDB();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// route config
app.use("/api/cars", require("./routes/carRoutes"));

// Error Handler
app.use(errorHandler);

// Set port number for server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
