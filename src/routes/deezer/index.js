const express = require("express");
const router = express.Router();
const axios = require("axios");
const authorize = require("../../middlewares/auth");

const axiosRequest = {
  method: "GET",
  headers: {
    "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
    "x-rapidapi-key": "84d2e1bc2amsh0bcbc81dd32f547p1526bajsncbac98b453bc",
  },
};

router.get("/tracks/:searchKey", authorize, async (req, res, next) => {
  try {
    console.log(req.user);
    axiosRequest.url = `https://deezerdevs-deezer.p.rapidapi.com/search/track/artist?q=${req.params.searchKey}`;
    let data = await axios(axiosRequest);
    if (data) {
      data = data.data;
      res.send(data);
    } else res.status(404).send("not found");
  } catch (error) {}
});

router.get("/albums", authorize, async () => {
  try {
    axiosRequest.url = `https://deezerdevs-deezer.p.rapidapi.com/search/album?q=${value}`;
    const data = await axios(axiosRequest);
    if ((data.status = 200 && data.data.data.length > 0)) res.send(data.data);
    else res.status(404).send("not found");
  } catch (error) {}
});

router.get("/artist", authorize, async (req, res, next) => {
  try {
    axiosRequest.url = `https://deezerdevs-deezer.p.rapidapi.com/search/artist/?q=${value}`;
    const data = await axios(axiosRequest);
    if ((data.status = 200 && data.data.data.length > 0)) res.send(data.data);
    else res.status(404).send("not found");
  } catch (error) {}
});

router.get("artist/:id", authorize, async (req, res, next) => {
  try {
    axiosRequest.url = `https://deezerdevs-deezer.p.rapidapi.com/artist/${req.param.id}`;
    const data = await axios(axiosRequest);
    if ((data.status = 200)) res.send(data.data);
    else res.status(404).send("not found");
  } catch (error) {}
});
router.get("album/:id", authorize, async (req, res, next) => {
  try {
    axiosRequest.url = `https://deezerdevs-deezer.p.rapidapi.com/album/${req.param.id}`;
    const data = await axios(axiosRequest);
    if ((data.status = 200)) res.send(data.data);
    else res.status(404).send("not found");
  } catch (error) {}
});

module.exports = router;
