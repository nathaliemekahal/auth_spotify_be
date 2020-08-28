const express = require("express");
const router = express.Router();
const userModel = require("./schema");
const { authenticate } = require("../../middlewares/authTools");
const passport = require("passport");

router.post("/", async (req, res, next) => {
  try {
    const newUser = new userModel(req.body);
    const response = await newUser.save();
    res.send(response);
  } catch (error) {
    next(error);
  }
});
router.get(
  "/facebookLogin",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);
router.get(
  "/facebookRedirect",
  passport.authenticate("google"),
  async (req, res, next) => {
    try {
      res.redirect("http://localhost:3000/home");
    } catch (error) {}
  }
);
router.post("/login", async (req, res, next) => {
  let { email, password } = req.body;
  const user = await userModel.findByCred(email, password);
  const token = await authenticate(user);
  res.send(token);
});

module.exports = router;
