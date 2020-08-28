const express = require("express");
const cors = require("cors");
const listEndpoints = require("express-list-endpoints");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/users");

dotenv.config();

const server = express();
const port = process.env.PORT;
server.use(express.json());
server.use("/user", userRoute);

mongoose
  .connect("mongodb://localhost:27017/spotify-auth", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(
    server.listen(port, () => {
      console.log("Running on port", port);
    })
  )
  .catch((err) => console.log(err));
