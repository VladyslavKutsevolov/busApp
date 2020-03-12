const express = require("express");
const axios = require("axios");
const router = express.Router();

router.get("/", (req, res) => {
  return axios
    .get("https://data.calgary.ca/resource/hpnd-riq4")
    .then(data => res.send(data.data))
    .catch(err => console.log(err));
});

module.exports = router;
