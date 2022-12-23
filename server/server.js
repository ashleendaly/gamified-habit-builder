const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

// connect to db
mongoose.set("strictQuery", false);

mongoose
  .connect(process.env.MONGO_URI, {})
  .then(() => console.log("DB connected"))
  .catch((err) => console.log("DB Error => ", err));

// import routes
const authRoutes = require("./routes/auth");

// app middlewares
app.use(morgan("dev"));
app.use(bodyParser.json());
// app.use(cors()); // allows all origins
if ((process.env.NODE_ENV = "development")) {
  app.use(cors({ origin: `http://localhost:3000` }));
}

// middleware
app.use("/api", authRoutes);

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`API is running on port ${port}`);
});
