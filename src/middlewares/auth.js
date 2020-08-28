const jwt = require("jsonwebtoken");
const userModel = require("../routes/users/schema");
const { verifyJWT } = require("./authTools");
const basicAuth = require("basic-auth");
const auth = require("basic-auth");

const authorize = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = await verifyJWT(token);
    const user = await userModel.findOne({
      _id: decoded._id,
    });

    if (!user) {
      throw new Error();
    }
    req.token = token;
    req.user = user;
    next();
  } catch (e) {
    const err = new Error("Please authenticate");
    err.httpStatusCode = 401;
    next(e);
  }
};

module.exports=authorize