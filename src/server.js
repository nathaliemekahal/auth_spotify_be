const express = require("express");
const cors = require("cors");
const listEndpoints = require("express-list-endpoints");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/users");
const passport = require("passport");
const oauth = require("../src/routes/users/oauth");
const deezerRoute = require("./routes/deezer");

dotenv.config();

const server = express();
const port = process.env.PORT;
server.use(express.json());
server.use(cors());

server.use(passport.initialize());
server.use("/user", userRoute);
server.use("/deezer", deezerRoute);

mongoose
  .connect("mongodb://localhost:27017/spotify-auth", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(
    server.listen(port, () => {
      console.log("Running on port", port);
      console.log(listEndpoints(server));
    })
  )
  .catch((err) => console.log(err));
